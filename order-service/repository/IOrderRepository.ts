import {Order} from "../domain/model/Order";

export default interface IOrderRepository {

    create(order: Order): Promise<Order>;

    findOne(id: string): Promise<Order | null>;

    find(): Promise<Order[]>;

    delete(id: string): Promise<Order>;

    update(id:string,order: Order): Promise<Order>;

}