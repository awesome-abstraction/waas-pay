'use client'

import { gql, useQuery, useMutation } from "@apollo/client";
import Waiting from "../assets/Waiting"
import "../employer/styles.css"
import { GET_META_DATA_QUERY } from "../forDan/page"
import { useState, useEffect } from "react";
import Loader from "../assets/Loader";
import { cyrb53 } from "../utils/hash"
import { getLocal } from "../utils/localMinaChain"
import { useRouter } from 'next/navigation'

export default ({ pageNum, zkAppAddress, id }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    async function requests () {
      setLoading(true)
      const res = await deployMina()
      setLoading(false)
      router.push(`/wallet/${id}`)
    }
    if (pageNum == 2){
      requests()
    }
  }, [pageNum])

  const deployMina = async () => {
    const { Mina, PublicKey, PrivateKey, AccountUpdate, Field, Poseidon, Provable, fetchAccount } = await import('snarkyjs');
    const { ValidAccounts } = await import("../snarky/built_contracts/build/src/ValidAccounts.js")

    const local = await getLocal();
    Mina.setActiveInstance(local);

    // TEST NET KEY
    // const deployerKey = PrivateKey.fromBase58("EKE1fW5V7KNvBmCK1y24wtw6TNLNc2UWmQ34hqu4M7UFbwRnvWVG");
    // const deployerAccount = PublicKey.fromPrivateKey(deployerKey);

    // Create a public/private key pair. The public key is your address and where you deploy the zkApp to
    // const zkAppPrivateKey = PrivateKey.random();
    // const zkAppAddress = zkAppPrivateKey.toPublicKey();

    const { privateKey: senderKey, publicKey: senderAccount } = local.testAccounts[1];
    await fetchAccount(zkAppAddress);
    const zkAppInstance = new ValidAccounts(zkAppAddress);
    try {
      const txn1 = await Mina.transaction(senderAccount, () => {
        const hashedValue = cyrb53(id)
        zkAppInstance.claimEmployeeHash(Field(hashedValue));
      });
      await txn1.prove();
      await txn1.sign([senderKey]).send();
      console.log("txn1 success")
    } catch(e) {
      console.log(e.message);
    }

  }

  return (
    <div className="slide-padding signup-container slide-scrollable">
      <Waiting className={"options-fixed-background"}/>
      <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          Sit back while we verify your credentials
        </h1>
        <h3>
          Don't worry, none of your data leaves your phone! We're generating a proof which gets sent instead
        </h3>

        <div style={{ "marginTop": "32px"}}>
          {loading && <Loader className={"loader-final"} fill={"#e84393"}/>}
        </div>
        
      </div>
    </div>
  )
}
