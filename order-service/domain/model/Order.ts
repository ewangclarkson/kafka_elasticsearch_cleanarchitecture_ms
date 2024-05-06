import {Expose} from "class-transformer"
import {PaymentStatus} from "../../config/constants/payment.status";
import {BaseEntity, Column, Entity,PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Order extends BaseEntity {
    @Expose()
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Expose()
    @Column()
    customerId!: string;

    @Expose()
    @Column()
    orderDate!: string;
    @Expose()
    @Column()
    amount!: number;

    @Expose()
    @Column()
    shippingAddress!: string;
    @Expose()
    @Column()
    billingAddress!: string;
    @Expose()
    @Column()
    orderStatus!: PaymentStatus;
}