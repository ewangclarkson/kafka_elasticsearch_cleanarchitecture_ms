import IProductRepository from "../IProductRepository";
import {Product} from "../../domain/model/Product";
import _ from "lodash"
import {PrismaClient} from "@prisma/client";
import {injectable} from "inversify";
import {elasticClient} from "../../elasticsearch/elasticsearch";
import {ElasticIndices} from "../../config/constants/ElasticIndices";
import {plainToClass} from "class-transformer";


@injectable()
export default class ProductRepository implements IProductRepository {

    private _prismaClient!: PrismaClient;

    constructor() {
        this._prismaClient = new PrismaClient();
    }

    async create(product: Product): Promise<Product> {

        product = await this._prismaClient.product.create({
            data: (_.omit(product, ['id', 'createdAt', 'updatedAt']))
        });
        await elasticClient
            .index({
                index: ElasticIndices.PRODUCTS,
                id: product.id,
                document: product
            });

        return Promise.resolve(product);
    }

    async delete(id: string): Promise<Product> {

        const product = await this._prismaClient.product.findFirst({where: {id: id}});

        await this._prismaClient.product.delete({where: {id: id}});

        await elasticClient
            .delete({
                id: id,
                index: ElasticIndices.PRODUCTS,
            });

        return Promise.resolve(product!);

    }

    async findOne(id: string): Promise<Product | null> {

        try {
            const product = await elasticClient
                .get<Product>({
                    id: id,
                    index: ElasticIndices.PRODUCTS,
                });

            return Promise.resolve(product._source!);
        } catch (e) {
            return Promise.resolve(null);
        }

    }

    async find(): Promise<Product[]> {
        try {
            const body = await elasticClient
                .search({
                    index: ElasticIndices.PRODUCTS,
                    query: {match_all: {}}
                });

            const products = body.hits.hits.map((document) => {
                return plainToClass(Product, document._source);
            });

            return Promise.resolve(products);
        } catch (e) {
            return Promise.resolve([]);
        }
    }

    async update(id: string, product: Product): Promise<Product> {

        product = await this._prismaClient.product.update({
            where: {id: id},
            data: (_.omit(product, ['id', 'createdAt', 'updatedAt']))
        });
        await elasticClient
            .update({
                index: ElasticIndices.PRODUCTS,
                id: id,
                doc: product
            });
        return Promise.resolve(product);

    }


}