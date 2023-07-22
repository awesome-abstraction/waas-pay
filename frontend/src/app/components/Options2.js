import { useState, useEffect } from "react"
import Form from "../assets/Form"
import Input from "./Input"
import Add from "../assets/Add"
import "./Options1.css"
import { useSwiper } from "swiper/react"

let Mina;
let Poseidon;

export default ({ fill, formValues, setFormValues }) => {
  const [loading, setLoading] = useState(false)
  const swiper = useSwiper();

  useEffect(() => {
    if (swiper.activeIndex == 2){
      async function startMina(){
        setLoading(true)
        const MinaRes = await instantiateMina()
        Mina = MinaRes.Mina
        Poseidon = MinaRes.Poseidon
        setLoading(false)
      }
      startMina()
    }
  }, [swiper.activeIndex])
  
  const instantiateMina = async () => {
    console.log("dsfd")
    const { Mina, PublicKey, PrivateKey, AccountUpdate, Field, Poseidon, Provable } = await import('snarkyjs');
    const { ValidAccounts } = await import("../snarky/built_contracts/build/src/ValidAccounts.js")

    const Local = Mina.LocalBlockchain({ proofsEnabled: false });
    Mina.setActiveInstance(Local);

    console.log("dsfdsf")

    const { privateKey: deployerKey, publicKey: deployerAccount } = Local.testAccounts[0];
    const { privateKey: senderKey, publicKey: senderAccount } = Local.testAccounts[1];

    // Create a public/private key pair. The public key is your address and where you deploy the zkApp to
    const zkAppPrivateKey = PrivateKey.random();
    const zkAppAddress = zkAppPrivateKey.toPublicKey();

    // create an instance of Square - and deploy it to zkAppAddress
    const zkAppInstance = new ValidAccounts(zkAppAddress);
    const deployTxn = await Mina.transaction(deployerAccount, () => {
      AccountUpdate.fundNewAccount(deployerAccount);
      zkAppInstance.deploy();
    });

    await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

    try {
      const txn1 = await Mina.transaction(senderAccount, () => {
        zkAppInstance.updateEmployerHash(Field(9));
      });
      await txn1.prove();
      await txn1.sign([senderKey]).send();
    } catch(e) {
      console.log(ex.message);
    }

    const num2 = zkAppInstance.employerHash.get();
    console.log('state after txn2:', num2.toString());



    // // get the initial state of ValidAccounts after deployment
    // try {
    //   const res = zkAppInstance.updateEmployerHash(Field(2));
    //   // const res2 = zkAppInstance.addToMapOfEmployees(Field(2), Field(1))
    //   console.log("updated", res)
    // } catch (e){
    //   console.log("failed to verify")
    // }

    // // // ----------------------------------------------------

    // const txn1 = await Mina.transaction(senderAccount, () => {
    //   zkAppInstance.update(Field(9));
    // });
    // await txn1.prove();
    // await txn1.sign([senderKey]).send();

    // const num1 = zkAppInstance.num.get();
    // console.log('state after txn1:', num1.toString());

    // // ----------------------------------------------------

    // try {
    //   const txn2 = await Mina.transaction(senderAccount, () => {
    //     zkAppInstance.update(Field(75));
    //   });
    //   await txn2.prove();
    //   await txn2.sign([senderKey]).send();
    // } catch (ex) {
    //   console.log(ex.message);
    // }
    // const num2 = zkAppInstance.num.get();
    // console.log('state after txn2:', num2.toString());

    // // ----------------------------------------------------

    // const txn3 = await Mina.transaction(senderAccount, () => {
    //   zkAppInstance.update(Field(81));
    // });
    // await txn3.prove();
    // await txn3.sign([senderKey]).send();

    // const num3 = zkAppInstance.num.get();
    // console.log('state after txn3:', num3.toString());
  }

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = async (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      label: "Name",
      type: "text",
      value: "",
      placeholder: "Enter an identifier for this user"
    });
    setFormValues(values);
  };
  
  const handleRemoveField = (index) => {
    let copyFormValues = [...formValues]
    // console.log("pre", formValues.length, formValues)
    // console.log("removeing", index)
    copyFormValues.splice(index, 1)
    // console.log("post", formValues)
    setFormValues(copyFormValues)
  }

  return (<div className="slide-padding signup-container slide-scrollable">
    <Form className={"options-fixed-background"} fill={fill}/>
    <div className="slide-text-container slide-text-container-scrollable" style={{"marginTop": "40px"}}>
        <h1>
          {`Lets get some information about your users`}
        </h1>
        <h3>
          We'll need a way to verify users identity when they create these <b>{formValues.length}</b> wallets
        </h3>

      <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
        {formValues.map((obj, index) => (
          <Input
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            onRemove={handleRemoveField}
          />
        ))}
        <div onClick={handleAddField} className={"add-input-button"}>
          <Add className={"add-svg"}/> 
        </div>
      </div>
    </div>
  </div>)
}
