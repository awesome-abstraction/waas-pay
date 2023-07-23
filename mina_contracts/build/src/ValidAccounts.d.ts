import { Field, SmartContract, MerkleMap, State } from 'snarkyjs';
export declare class ValidAccounts extends SmartContract {
    mapRoot: State<import("snarkyjs/dist/node/lib/field").Field>;
    employerHash: State<import("snarkyjs/dist/node/lib/field").Field>;
    mapOfEmployees: MerkleMap;
    init(): void;
    updateEmployerHash(inputEmployerHash: Field): void;
    addToMapOfEmployees(inputEmployerHash: Field, inputEmployeeHash: Field): false | undefined;
    claimEmployeeHash(inputEmployeeHash: Field): void;
}
