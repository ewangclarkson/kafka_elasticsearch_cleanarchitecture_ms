import {Product} from "../domain/model/Product";

export default interface IProductRepository {

    create(product: Product): Promise<Product>;

    update(id: number, product: Product): Promise<Product>;

    findOne(id: number): Promise<Product>;

    find(): Promise<Product[]>;

    delete(id: number): Promise<Product>;


}