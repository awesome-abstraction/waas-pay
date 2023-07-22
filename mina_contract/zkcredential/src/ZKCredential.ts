import { Field, SmartContract, state, State, method, Poseidon } from 'snarkyjs';

export class ZKCredential extends SmartContract {
  @state(Field) credential = State<Field>();
  @state(Field) hasClaimed = State<Bool>();

  @method initState(_credential: Field, _hasClaimed: Field) {
    this.credential.set(Poseidon.hash([_credential]));
    this.hasClaimed.set(Field(False));
  }

  @method update(_credential: Field, _hasClaimed: Field) {
    const currentStateCredential = this.credential.get();
    const currentStateHasClaimed = this.hasClaimed.get();
    // The user input is being hashed and see if it matches with the record
    currentStateCredential.assertEquals(Poseidon.hash([_credential]));
    // This user has not claimed the wallet before
    currentStateHasClaimed.assertEquals(False);

    this.hasClaimed.set(Field(False));
  }

}