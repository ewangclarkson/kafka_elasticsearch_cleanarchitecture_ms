import ProductService from "../../service/ProductService";
import {inject, injectable} from "inversify";
import ProductRequestDto from "../dto/ProductRequestDto";
import ProductResponseDto from "../dto/ProductResponseDto";
import {IOC} from "../../ioc/inversify.inversify.types";
import IProductRepository from "../../repository/IProductRepository";
import {plainToClass} from "class-transformer"
import {Product} from "../model/Product";

@injectable()
export default class ProductServiceImpl implements ProductService {

    private _productRepository: IProductRepository;

    constructor(
        @inject(IOC.ProductRepository) productRepository: IProductRepository
    ) {
        this._productRepository = productRepository;
    }

    async createProduct(productRequestDto: ProductRequestDto): Promise<ProductResponseDto> {
        return this._productRepository.create(plainToClass(Product, productRequestDto));
    }

    async deleteProduct(id: string): Promise<ProductResponseDto> {
        const product = await this._productRepository.delete(id);
        return plainToClass(ProductResponseDto, product);
    }

    async getProduct(id: string): Promise<ProductResponseDto | null> {
        const product = await this._productRepository.findOne(id);
        if(!product) return Promise.resolve(product);
        return plainToClass(ProductResponseDto, product);
    }

    async getProducts(): Promise<ProductResponseDto[] | []> {
        const products = await this._productRepository.find();
        return plainToClass(ProductResponseDto, products);
    }

    async updateProduct(id: string, updateRequestDto: ProductRequestDto): Promise<ProductResponseDto> {
        const product = await this._productRepository.update(id, plainToClass(Product, updateRequestDto));
        return plainToClass(ProductResponseDto, product)
    }

}