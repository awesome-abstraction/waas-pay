var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, SmartContract, MerkleMap, state, State, method, Character, Provable } from 'snarkyjs';
export class ValidAccounts extends SmartContract {
    constructor() {
        super(...arguments);
        this.mapRoot = State();
        this.employerHash = State();
        this.mapOfEmployees = new MerkleMap();
    }
    init() {
        super.init();
        this.employerHash.set(Field(1));
        this.mapRoot.set(this.mapOfEmployees.getRoot()); // initial state
    }
    // Trust on First Use Model
    updateEmployerHash(inputEmployerHash) {
        // precondition
        const employerHash = this.employerHash.get();
        this.employerHash.assertEquals(employerHash);
        // hasn't been used yet, set it
        this.employerHash.set(inputEmployerHash);
    }
    addToMapOfEmployees(inputEmployerHash, inputEmployeeHash) {
        // precondition
        const mapRoot = this.mapRoot.get();
        this.mapRoot.assertEquals(mapRoot);
        Provable.log("map of employees", this.mapOfEmployees);
        const employerHash = this.employerHash.get();
        this.employerHash.assertEquals(employerHash);
        Provable.log("map of employees root", this.mapOfEmployees.getRoot());
        Provable.log("this map of employees root", this.mapRoot);
        // ensure state of merkleMap and mapRoot align
        this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());
        Provable.log("employer hash", employerHash);
        Provable.log("input employable hash", inputEmployerHash);
        // ensure only employer can do this
        employerHash.assertEquals(inputEmployerHash);
        // update states
        this.mapOfEmployees.set(inputEmployeeHash, Field(1));
        this.mapRoot.set(this.mapOfEmployees.getRoot());
    }
    verifyEmployee(inputEmployeeId) {
        // precondition
        const mapRoot = this.mapRoot.get();
        this.mapRoot.assertEquals(mapRoot);
        // ensure state of merkleMap and mapRoot align
        this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());
        const employeeStatus = this.mapOfEmployees.get(inputEmployeeId);
        // doesnt exist in map return False
        if (employeeStatus.equals(0)) {
            return false;
        }
        // exist in map, hasn't been claimed
        if (employeeStatus.equals(1)) {
            return true;
        }
        // this hash was already used to create
        else {
            return false;
        }
    }
    claimEmployeeHash(inputEmployeeHash, walletAddress) {
        // precondition
        const mapRoot = this.mapRoot.get();
        this.mapRoot.assertEquals(mapRoot);
        // ensure state of merkleMap and mapRoot align
        this.mapRoot.assertEquals(this.mapOfEmployees.getRoot());
        const employeeStatus = this.mapOfEmployees.get(inputEmployeeHash);
        // doesnt exist in map return False
        if (employeeStatus.equals(0)) {
            return false;
        }
        // update states
        this.mapOfEmployees.set(inputEmployeeHash, Field(2));
        this.mapRoot.set(this.mapOfEmployees.getRoot());
    }
}
__decorate([
    state(Field),
    __metadata("design:type", Object)
], ValidAccounts.prototype, "mapRoot", void 0);
__decorate([
    state(Field),
    __metadata("design:type", Object)
], ValidAccounts.prototype, "employerHash", void 0);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], ValidAccounts.prototype, "updateEmployerHash", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field, Field]),
    __metadata("design:returntype", void 0)
], ValidAccounts.prototype, "addToMapOfEmployees", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field]),
    __metadata("design:returntype", void 0)
], ValidAccounts.prototype, "verifyEmployee", null);
__decorate([
    method,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Field, Character]),
    __metadata("design:returntype", void 0)
], ValidAccounts.prototype, "claimEmployeeHash", null);
//# sourceMappingURL=ValidAccounts.js.map