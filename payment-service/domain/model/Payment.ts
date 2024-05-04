import {Expose} from "class-transformer";
import {BaseEntity, Column, Entity, Generated, PrimaryColumn} from "typeorm";
import {PaymentStatus} from "../../config/constants/payment.status";
import {PaymentChannel} from "../../config/constants/payment.method";


@Entity()
export class Payment extends BaseEntity {
    @Expose()
    @PrimaryColumn('uuid', {default: () => 'uuid_generate_v4()'})
    @Generated('uuid')
    id!: string;

    @Expose()
    @Column()
    processingNumber!: string;

    @Expose()
    @Column()
    paymentStatus!: PaymentStatus;

    @Expose()
    @Column()
    paymentChannel!: PaymentChannel;

    @Expose()
    @Column()
    transactionId!: string;

    @Expose()
    @Column()
    date!: string;

    @Expose()
    @Column()
    firstName!: string;

    @Expose()
    @Column()
    lastName!: string;

    @Expose()
    @Column()
    cardNumber!: string;

    @Expose()
    @Column()
    expiryDate!: string;

    @Expose()
    @Column()
    cardPin!: number;

    @Expose()
    @Column()
    phoneNumber!: string;

    @Expose()
    @Column()
    amount!: number;

    @Expose()
    @Column()
    orderId!: string;
}