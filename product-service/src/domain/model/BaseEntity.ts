import {Expose} from "class-transformer";

export class BaseEntity {
   @Expose({name:'created_at'}) public createdAt!: string;
   @Expose({name:'updated_at'}) public updatedAt!: string;
}