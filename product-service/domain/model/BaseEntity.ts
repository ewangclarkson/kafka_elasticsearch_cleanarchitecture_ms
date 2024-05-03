import {Expose} from "class-transformer";

export class BaseEntity {
   @Expose() public createdAt!: Date;
   @Expose() public updatedAt!: Date;
}