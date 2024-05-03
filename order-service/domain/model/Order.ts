import {Expose} from "class-transformer"
import {PaymentChannel} from "../../config/constants/payment.method";
import {PaymentStatus} from "../../config/constants/payment.status";
import {BaseEntity, Column, Entity, Generated, PrimaryColumn} from "typeorm";

@Entity()
export class Order extends BaseEntity {
    @Expose()
    @PrimaryColumn('uuid', {default: () => 'uuid_generate_v4()'})
    @Generated('uuid')
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
    paymentChannel!: PaymentChannel;
    @Expose()
    @Column()
    paymentStatus!: PaymentStatus;
}