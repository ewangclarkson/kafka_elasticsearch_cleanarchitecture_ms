import {Expose} from "class-transformer";
import {BaseEntity, Column, Entity, ObjectId, ObjectIdColumn, PrimaryGeneratedColumn} from "typeorm";
import {PaymentStatus} from "../../config/constants/payment.status";
import {PaymentChannel} from "../../config/constants/payment.method";


@Entity()
export class Payment extends BaseEntity {
    @ObjectIdColumn()
    _id!: ObjectId;
    @Expose()
    @PrimaryGeneratedColumn("uuid")
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