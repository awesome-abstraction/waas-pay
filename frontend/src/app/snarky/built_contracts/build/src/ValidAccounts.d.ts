import { Field, SmartContract, MerkleMap, State, Character } from 'snarkyjs';
export declare class ValidAccounts extends SmartContract {
    mapRoot: State<import("snarkyjs/dist/node/lib/field").Field>;
    employerHash: State<import("snarkyjs/dist/node/lib/field").Field>;
    mapOfEmployees: MerkleMap;
    init(): void;
    updateEmployerHash(inputEmployerHash: Field): void;
    addToMapOfEmployees(inputEmployerHash: Field, inputEmployeeHash: Field): void;
    verifyEmployee(inputEmployeeId: Field): boolean;
    claimEmployeeHash(inputEmployeeHash: Field, walletAddress: Character): false | undefined;
}
