import {Product} from "../domain/model/Product";

export default interface IProductRepository {

    create(product: Product): Promise<Product>;

    update(id: string, product: Product): Promise<Product>;

    findOne(id: string): Promise<Product | null>;

    find(): Promise<Product[]>;

    delete(id: string): Promise<Product>;


}