import {Order} from "../domain/model/Order";

export default interface IOrderRepository {

    create(product: Order): Promise<Order>;

    findOne(id: number): Promise<Order | null>;

    find(): Promise<Order[]>;

    delete(id: number): Promise<Order>;


}