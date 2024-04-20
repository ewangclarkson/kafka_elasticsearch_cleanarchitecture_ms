import {BaseEntity} from "./BaseEntity";

export class Product extends BaseEntity {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public readonly description: string,
        public readonly stock: number,
    ) {
        super();
    }
}
