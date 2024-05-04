import IPaymentRepository from "../IPaymentRepository";
import {Payment} from "../../domain/model/Payment";
import {injectable} from "inversify";
import {PaymentStatus} from "../../config/constants/payment.status";
import {v4 as uuidv4} from 'uuid';

@injectable()
export default class PaymentRepository implements IPaymentRepository {

    async create(payment: Payment): Promise<Payment> {
        payment.paymentStatus = PaymentStatus.PENDING;
        payment.processingNumber = uuidv4();
        payment = await Payment.save(payment);

        return Promise.resolve(payment);
    }


    async findOne(processingNumber: string): Promise<Payment | null> {
        const payment = await Payment.findOneBy({
            processingNumber: processingNumber
        });

        return Promise.resolve(payment!);
    }

    async update(id: string, payment: Payment): Promise<Payment | null> {
        payment = await Payment.save(payment);
        return Promise.resolve(payment);
    }

}