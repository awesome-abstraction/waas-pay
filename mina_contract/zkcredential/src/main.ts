import { ZKCredential } from './ZKCredential.js';
import {
  isReady,
  shutdown,
  Field,
  Mina,
  PrivateKey,
  AccountUpdate,
} from 'snarkyjs';

await isReady;

console.log('SnarkyJS loaded');

const useProof = false;

const Local = Mina.LocalBlockchain({ proofsEnabled: useProof });
Mina.setActiveInstance(Local);


// provides pre-funded accounts
const { privateKey: deployerKey, publicKey: deployerAccount } =
  Local.testAccounts[0];
const { privateKey: senderKey, publicKey: senderAccount } =
  Local.testAccounts[1];

console.log('Shutting down');

await shutdown();
// ----------------------------------------------------

// create a destination we will deploy the smart contract to
const zkAppPrivateKey = PrivateKey.random();
const zkAppAddress = zkAppPrivateKey.toPublicKey();

const zkAppInstance = new ZKCredential(zkAppAddress);

const deployTxn = await Mina.transaction(deployerAccount, () => {
  AccountUpdate.fundNewAccount(deployerAccount);
  zkAppInstance.deploy();
  zkAppInstance.initState(Field("hfhjdhss"), Field(False));
});
await deployTxn.prove();
await deployTxn.sign([deployerKey, zkAppPrivateKey]).send();

// get the initial state of ZKCredential after deployment
const credential = zkAppInstance.credential.get();
const hasClaimed = zkAppInstance.hasClaimed.get();

console.log('state after init: ', credential.toString(), " ", hasClaimed.toString());
// ----------------------------------------------------

// User enters their creditial 
const testCredential = "xxxxxxx";
const txn1 = await Mina.transaction(senderAccount, () => {
  zkAppInstance.update(Field(testCredential), Field(Bool(True)));
});
await txn1.prove();
await txn1.sign([senderKey]).send();

const num1 = zkAppInstance.x.get();
console.log('state after txn1:', num1.toString());

// ----------------------------------------------------

console.log('Shutting down');

await shutdown();