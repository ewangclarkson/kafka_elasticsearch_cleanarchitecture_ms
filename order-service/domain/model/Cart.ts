import {Expose} from "class-transformer";
import {BaseEntity, Column, Entity, Generated, PrimaryColumn} from "typeorm";


@Entity()
export class Cart extends BaseEntity {
    @Expose()
    @PrimaryColumn('uuid', {default: () => 'uuid_generate_v4()'})
    @Generated('uuid')
    id!: string;

    @Expose()
    @Column()
    customerId!: number;

    @Expose()
    @Column()
    productId!: string;

    @Expose()
    @Column()
    public quantity!: number;

    @Expose()
    @Column()
    date!: string
}