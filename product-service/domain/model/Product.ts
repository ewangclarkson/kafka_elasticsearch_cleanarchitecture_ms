import {BaseEntity} from "./BaseEntity";
import {Expose} from "class-transformer"

export class Product extends BaseEntity {
    @Expose() public id!: string;
    @Expose() public name!: string;
    @Expose() public description!: string;
    @Expose() public stock!: number;
}
