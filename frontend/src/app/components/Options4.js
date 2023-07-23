import { useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client";
import { cyrb53 } from "../utils/hash"
import Review from "../assets/Review"
import Loader from "../assets/Loader"
import { SAVE_META_DATA_MUTATION } from "../forDan/page"

let smartAddy;

export default ({ formValues, name, selectedWallet, fill, setRenderButton, pageNum }) => {
  const [loadingState, setLoadingState] = useState();
  const [saveMetaData, { loading: saveLoading, error: saveError }] = useMutation(SAVE_META_DATA_MUTATION);
  
  useEffect(() => {
    async function requests () {
      const minaAddy = await deployMina()
      await callGql(minaAddy)
    }

    if (pageNum == 4){
      setRenderButton(false)
      requests()
    }
  }, [pageNum])

  const callGql = async (minaAddy) => {
    const result = await saveMetaData({
      variables: { input: {
        walletType: selectedWallet.id.toUpperCase(),
        companyName: name,
        minaSmartContractAddress: minaAddy
      }},
    });
    console.log('called')
  }

  const deployMina = async () => {
    setLoadingState("MINA_STARTUP")

    const { Mina, PublicKey, PrivateKey, AccountUpdate, Field, Poseidon, Provable } = await import('snarkyjs');
    const EMPLOYER_HASH = Field(10);
    const { ValidAccounts } = await import("../snarky/built_contracts/build/src/ValidAccounts.js")

    const Local = Mina.LocalBlockchain({ proofsEnabled: false });
    Mina.setActiveInstance(Local);

    const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
    const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

    // Create a public/private key pair. The public key is your address and where you deploy the zkApp to
    const zkAppPrivateKey = PrivateKey.random();
    const zkAppAddress = zkAppPrivateKey.toPublicKey();

    setLoadingState("MINA_CONTRACT_DEPLOY")
    // create an instance of ValidAccounts - and deploy it to zkAppAddress
    const zkAppInstance = new ValidAccounts(zkAppAddress);
    const deployTxn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkAppInstance.deploy();
    });

    await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

    // Claim employer hash for this contract
    setLoadingState("MINA_TRANSACT")
    try {
      const txn1 = await Mina.transaction(senderAccount, () => {
        zkAppInstance.updateEmployerHash(EMPLOYER_HASH);
      });
      await txn1.prove();
      await txn1.sign([senderKey]).send();
      console.log("txn1 success")
    } catch(e) {
      console.log(e.message);
    }
    

    // Update the merklemap with the hashed SSNs
    try {
      const txn2 = await Mina.transaction(senderAccount, () => {
        formValues?.forEach((employee) => {
          const hashedValue = cyrb53(employee.value);
          zkAppInstance.addToMapOfEmployees(EMPLOYER_HASH, Field(hashedValue));
        })
      });
      await txn2.prove();
      await txn2.sign([senderKey]).send();
      console.log("txn2 success")
    } catch(e) {
      console.log(e);
    }

    setLoadingState("GRAPHQL")
    return zkAppAddress;
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Review className={"options-fixed-background"} fill={fill}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
      <h1>
        Sit tight, we'll take it from here.
      </h1>
      <h3>
        Generating you a simple link to give to your users to redeem & deploy their new wallets!
      </h3>
      </div>
      <div className="loader-container">
        <Loader className={"loader-final"} fill={"#e84393"}/>
      </div>
    </div>
  )
}