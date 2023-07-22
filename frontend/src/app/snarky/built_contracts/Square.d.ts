import { Field, SmartContract, State } from 'snarkyjs';
export declare class Square extends SmartContract {
    num: State<import("snarkyjs/dist/node/lib/field").Field>;
    init(): void;
    update(square: Field): void;
}
