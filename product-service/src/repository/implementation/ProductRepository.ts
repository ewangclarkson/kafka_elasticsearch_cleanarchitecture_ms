import IProductRepository from "../IProductRepository";
import {Product} from "../../domain/model/Product";
import Pool from "../../startup/database";
import {injectable} from "inversify";
import {plainToClass} from "class-transformer";
import {RowDataPacket, ResultSetHeader} from "mysql2";
import _ from "lodash"


@injectable()
export default class ProductRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {

        const sql = `INSERT INTO products SET ?`;

        const [rows] = await Pool.query<ResultSetHeader>(sql, [(_.omit(product, ['id', 'createdAt', 'updatedAt']))]);

        const prod: Product = await this.findOne(rows.insertId);

        return Promise.resolve(prod);
    }

    async delete(id: number): Promise<Product> {

        const sql = `DELETE FROM products WHERE id = ?`;

        const prod: Product = await this.findOne(id);

        await Pool.query<ResultSetHeader>(sql, [id]);

        return Promise.resolve(prod);
    }

    async findOne(id: number): Promise<Product> {

        const sql = `SELECT * FROM products WHERE id = ?;`;

        const [rows] = await Pool.query<RowDataPacket[]>(sql, [id]);

        const product: Product[] = plainToClass(Product, rows,
            {excludeExtraneousValues: true}
        );

        return Promise.resolve(product[0]);
    }

    async find(): Promise<Product[]> {

        const sql = `SELECT * FROM products`;

        const [rows] = await Pool.query<RowDataPacket[]>(sql);

        const products: Product[] = plainToClass(Product, rows,
            {excludeExtraneousValues: true}
        );

        return Promise.resolve(products);
    }

    async update(id: number, product: Product): Promise<Product> {

        const sql = `UPDATE products SET ? WHERE id = ?`;

         await Pool.query<ResultSetHeader>(sql, [(_.omit(product, ['id', 'createdAt', 'updatedAt'])), id]);

        const prod: Product = await this.findOne(id);

        return Promise.resolve(prod);
    }


}