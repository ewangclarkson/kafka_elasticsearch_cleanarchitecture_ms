import IProductRepository from "../IProductRepository";
import {Product} from "../../domain/model/Product";
import Pool from "../../startup/database";
import {injectable} from "inversify";


@injectable()
export default class ProductRepository implements IProductRepository {
    async create(product: Product): Promise<Product> {

        const sql = `INSERT INTO products (name,description,stock) VALUES(${product.name},${product.description},${product.stock});`;

        const [rows, fields] = await Pool.query(sql);

        return Promise.resolve( new Product(1,"dg","dete",3));
    }

    async delete(id: number): Promise<Product> {

        const sql = `DELETE * FROM products WHERE id=${id};`;

        const [rows, fields] = await Pool.query(sql);
        console.log(rows);

        return Promise.resolve(new Product(1,"dg","dete",3));
    }

    async findOne(id: number): Promise<Product> {

        const sql = `SELECT * FROM products WHERE id=${id};`;

        const [rows, fields] = await Pool.query(sql);
        console.log(rows);


        return Promise.resolve(new Product(1,"dg","dete",3));
    }

    async find(): Promise<Product[]> {

        const sql = `SELECT * FROM products;`;

        const [rows, fields] = await Pool.query(sql);
        console.log(rows);
        return Promise.resolve([new Product(1,"dg","dete",3)]);
    }

    async update(id: number, product: Product): Promise<Product> {

        const sql = `UPDATE products SET name=${product.name} description=${product.description} stock=${product.stock}`;

        const [rows, fields] = await Pool.query(sql);
        console.log(rows);
        return Promise.resolve(new Product(1,"dg","dete",3));
    }

}