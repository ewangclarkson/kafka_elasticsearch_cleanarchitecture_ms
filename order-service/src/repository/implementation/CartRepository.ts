import ICartRepository from "../ICartRepository";
import {Cart} from "../../domain/model/Cart";
import {inject, injectable} from "inversify";
import _ from "lodash"
import {elasticClient} from "../../elasticsearch/elasticsearch.client";


@injectable()
export default class CartRepository implements ICartRepository {


    async create(cart: Cart): Promise<Cart> {

        return Promise.resolve(new Cart());
    }

    async delete(id: number): Promise<Cart> {

        return Promise.resolve(new Cart());
    }

    async findOne(id: number): Promise<Cart | null> {

        return Promise.resolve(new Cart());

    }

    async find(): Promise<Cart[]> {
        return Promise.resolve([new Cart()]);
    }

    update(id: number, cart: Cart): Promise<Cart | null> {
        return Promise.resolve(new Cart());
    }

}