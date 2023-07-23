import { useEffect, useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client";
import { cyrb53 } from "../utils/hash"
import Waiting from "../assets/Waiting"
import Loader from "../assets/Loader"
import { SAVE_META_DATA_MUTATION } from "../forDan/page"
import { getLocal, init } from "../utils/localMinaChain";

export default ({ formValues, name, selectedWallet, fill, setRenderButton, pageNum, nextButtonClicked, setCid }) => {
  const [loadingState, setLoadingState] = useState("MINA_STARTUP");
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
    setLoadingState(false)
    setCid(result.data.saveUserWalletsMeta.cid)
    nextButtonClicked()
  }

  const deployMina = async () => {
    const { Mina, PublicKey, PrivateKey, AccountUpdate, Field, Poseidon, Provable, fetchAccount } = await import('snarkyjs');
    const EMPLOYER_HASH = Field(10);
    const { ValidAccounts } = await import("../snarky/built_contracts/build/src/ValidAccounts.js")
    await ValidAccounts.compile()

    
    const Network =Mina.Network("https://proxy.berkeley.minaexplorer.com/graphql")
    Mina.setActiveInstance(Network)
    // const local = await getLocal();
    // Mina.setActiveInstance(local);

    // const { privateKey: deployerKey, publicKey: deployerAccount } = local.testAccounts[0];
    // const { privateKey: senderKey, publicKey: senderAccount } = local.testAccounts[1];

    const deployerKey = PrivateKey.fromBase58("EKELS6TNcSNM5f1bJ51ZwjELXgNq5YptyGQXPucsNHtKzmFYHZpY");
    const deployerAccount = PublicKey.fromBase58("B62qp2YkCH7E9NvoQx2ttd2D1aPDPY6ToJhZTcCh1bvW9fcKsAYT8kk");

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
    console.log("sc deployed")
    // Claim employer hash for this contract
    setLoadingState("MINA_TRANSACT")
    try {
      const txn1 = await Mina.transaction(deployerAccount, () => {
        zkAppInstance.updateEmployerHash(EMPLOYER_HASH);
      });
      await txn1.prove();
      await txn1.sign([deployerKey]).send();
      console.log("txn1 success")
    } catch(e) {
      console.log(e.message);
    }
    

    // Update the merklemap with the hashed SSNs
    try {
      const txn2 = await Mina.transaction(deployerAccount, () => {
        formValues?.forEach((employee) => {
          const hashedValue = cyrb53(employee.value);
          zkAppInstance.addToMapOfEmployees(EMPLOYER_HASH, Field(hashedValue));
        })
      });
      await txn2.prove();
      await txn2.sign([deployerKey]).send();
    } catch(e) {
      console.log(e);
    }

    setLoadingState("GRAPHQL")
    return zkAppAddress;
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Waiting className={"options-fixed-background"} fill={fill}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
      <h1>
        Sit tight, we'll take it from here.
      </h1>
      <h3>
        Generating you a simple link to give to your users to redeem & deploy their new wallets!
      </h3>
      </div>
      <div className="loader-container">
        {loadingState && <Loader className={"loader-final"} fill={"#e84393"}/>}
      </div>
    </div>
  )
}