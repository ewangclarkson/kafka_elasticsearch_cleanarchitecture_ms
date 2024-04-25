import {BaseEntity} from "./BaseEntity";
import {Expose} from "class-transformer"

export class Order extends BaseEntity {
    @Expose() public id!: number;
    @Expose() public name!: string;
    @Expose() public description!: string;
    @Expose() public stock!: number;
}
