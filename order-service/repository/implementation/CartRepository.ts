import ICartRepository from "../ICartRepository";
import {Cart} from "../../domain/model/Cart";
import {injectable} from "inversify";
import {elasticClient} from "../../elasticsearch/elasticsearch";
import {ElasticIndices} from "../../config/constants/ElasticIndices";
import {plainToClass} from "class-transformer";

@injectable()
export default class CartRepository implements ICartRepository {


    async create(cart: Cart): Promise<Cart> {
        cart = await Cart.save(cart);

        // add the data to elastic search
        await elasticClient
            .index({
                index: ElasticIndices.CARTS,
                id: cart.id!,
                document: cart
            });

        return Promise.resolve(cart);
    }

    async delete(id: string): Promise<Cart> {

        const cart = await Cart.findOneById(id);

        await Cart.delete(id);
        await elasticClient
            .delete({
                id: id,
                index: ElasticIndices.CARTS,
            });

        return Promise.resolve(cart!);
    }

    async findOne(id: string): Promise<Cart | null> {
        try {
            const cart = await elasticClient
                .get<Cart>({
                    id: id,
                    index: ElasticIndices.CARTS,
                });
            return Promise.resolve(cart._source!);
        } catch (e) {
            return Promise.resolve(null);
        }


    }

    async find(): Promise<Cart[]> {

        try {
            const body = await elasticClient
                .search({
                    index: ElasticIndices.CARTS,
                    query: {match_all: {}}
                });

            const carts = body.hits.hits.map((document) => {
                return plainToClass(Cart, document._source);
            });
            return Promise.resolve(carts);
        }catch (e) {
            return Promise.resolve([]);
        }
    }

    async update(id: string, cart: Cart): Promise<Cart | null> {
        cart = await Cart.save(cart);
        await elasticClient
            .update({
                index: ElasticIndices.CARTS,
                id: id,
                doc: cart
            });
        return Promise.resolve(cart);
    }

}