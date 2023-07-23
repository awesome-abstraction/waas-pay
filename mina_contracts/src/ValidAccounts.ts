import { 
  Field, 
  SmartContract, 
  MerkleMap,
  state, 
  State, 
  method,
  Group,
  Keypair,
  Character,
  Permissions,
  DeployArgs,
  Provable,
  Poseidon
} from 'snarkyjs';
import { preconditions } from 'snarkyjs/dist/node/lib/precondition';

export class ValidAccounts extends SmartContract {
  @state(Field) mapRoot = State<Field>();
  @state(Field) employerHash = State<Field>();
  mapOfEmployees = new MerkleMap();

  init() {
    super.init();
    this.employerHash.set(Field(1))
    this.mapRoot.set(this.mapOfEmployees.getRoot()); // initial state
  }

  // Trust on First Use Model
  @method updateEmployerHash(inputEmployerHash: Field){
    // precondition
    const employerHash = this.employerHash.get();
    this.employerHash.assertEquals(employerHash);

    // hasn't been used yet, set it
    this.employerHash.set(Poseidon.hash([inputEmployerHash]));
  }

  @method addToMapOfEmployees(inputEmployerHash: Field, inputEmployeeHash: Field) {
    // precondition
    const mapRoot = this.mapRoot.get();
    this.mapRoot.assertEquals(mapRoot);

    // ensure state of merkleMap and mapRoot align
    this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());

    // ensure only employer can do this
    if (this.employerHash.getAndAssertEquals().equals(inputEmployerHash)){
      return false
    }

    // update states
    this.mapOfEmployees.set(inputEmployeeHash, Field(1))
    this.mapRoot.set(this.mapOfEmployees.getRoot())
  }

  // @method verifyEmployee(inputEmployeeId: Field){
  //   // precondition
  //   const mapRoot = this.mapRoot.get();
  //   this.mapRoot.assertEquals(mapRoot);

  //   // ensure state of merkleMap and mapRoot align
  //   this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());

  //   const employeeStatus = this.mapOfEmployees.get(inputEmployeeId)

  //   // doesnt exist in map return False
  //   if (employeeStatus.equals(0)){
  //     return false
  //   }

  //   // exist in map, hasn't been claimed
  //   if (employeeStatus.equals(1)){
  //     return true
  //   }
    
  //   // this hash was already used to create
  //   else {
  //     return false
  //   }
  // }

  @method claimEmployeeHash(inputEmployeeHash: Field){
    // precondition
    const mapRoot = this.mapRoot.get();
    this.mapRoot.assertEquals(mapRoot);

    // ensure state of merkleMap and mapRoot align
    this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());

    // update states
    // this.mapOfEmployees.set(inputEmployeeHash, Field(2))
    this.mapRoot.set(this.mapOfEmployees.getRoot())
  }
}