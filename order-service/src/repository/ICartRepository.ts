import {Cart} from "../domain/model/Cart";

export default interface ICartRepository {

    create(cart: Cart): Promise<Cart>;

    findOne(id: number): Promise<Cart | null>;

    find(): Promise<Cart[]>;

    update(id: number,cart: Cart): Promise<Cart | null>;

    delete(id: number): Promise<Cart>;


}