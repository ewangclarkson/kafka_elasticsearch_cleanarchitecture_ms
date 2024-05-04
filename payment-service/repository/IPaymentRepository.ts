import {Payment} from "../domain/model/Payment";

export default interface IPaymentRepository {
    create(payment: Payment): Promise<Payment>;
    findOne(processingNumber:string): Promise<Payment | null>;
    update(id: string, payment: Payment): Promise<Payment | null>;

}