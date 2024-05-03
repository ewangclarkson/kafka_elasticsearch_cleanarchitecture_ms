import {Cart} from "../domain/model/Cart";

export default interface ICartRepository {

    create(cart: Cart): Promise<Cart>;

    findOne(id: string): Promise<Cart | null>;

    find(): Promise<Cart[]>;

    update(id: string, cart: Cart): Promise<Cart | null>;

    delete(id: string): Promise<Cart>;


}