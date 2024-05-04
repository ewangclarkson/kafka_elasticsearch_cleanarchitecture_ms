import IProductRepository from "../IProductRepository";
import {Product} from "../../domain/model/Product";
import Pool from "../../startup/database";
import {inject, injectable} from "inversify";
import {plainToClass} from "class-transformer";
import {RowDataPacket, ResultSetHeader} from "mysql2";
import _ from "lodash"
import ProductService from "../../service/ProductService";
import {IOC} from "../../inversify/inversify.ioc.types";
import {PrismaClient} from "@prisma/client";


@injectable()
export default class ProductRepository implements IProductRepository {

    private _prismaClient: PrismaClient;

    constructor() {
        this._prismaClient = new PrismaClient();
    }

    async create(product: Product): Promise<Product> {

        return this._prismaClient.product.create({
            data: (_.omit(product, ['id', 'createdAt', 'updatedAt']))
        });
    }

    async delete(id: string): Promise<Product> {

        return this._prismaClient.product.delete({
            where: {id: id}
        });
    }

    async findOne(id: string): Promise<Product | null> {

         return  this._prismaClient.product.findFirst({
            where: {id: id}
        });

    }

    async find(): Promise<Product[]> {
        return this._prismaClient.product.findMany();
    }

    async update(id: string, product: Product): Promise<Product> {

        return this._prismaClient.product.update({
            where: {id: id},
            data: (_.omit(product, ['id', 'createdAt', 'updatedAt']))
        });
    }


}