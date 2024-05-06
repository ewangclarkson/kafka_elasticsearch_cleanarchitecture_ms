import {Expose} from "class-transformer";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity()
export class Cart extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Expose()
    @Column()
    customerId!: string;

    @Expose()
    @Column()
    productId!: string;

    @Expose()
    @Column()
    public quantity!: number;

    @Expose()
    @Column()
    date!: string;
}