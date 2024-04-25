import ProductService from "../../service/OrderService";
import {inject, injectable} from "inversify";
import OrderRequestDto from "../dto/OrderRequestDto";
import OrderResponseDto from "../dto/OrderResponseDto";
import {IOC} from "../../inversify/inversify.ioc.types";
import IOrderRepository from "../../repository/IOrderRepository";
import {plainToClass} from "class-transformer"
import {Order} from "../model/Order";

@injectable()
export default class ProductServiceImpl implements ProductService {

    private _productRepository: IOrderRepository;

    constructor(
        @inject(IOC.ProductRepository) productRepository: IOrderRepository
    ) {
        this._productRepository = productRepository;
    }

    async createProduct(productRequestDto: OrderRequestDto): Promise<OrderResponseDto> {
        return this._productRepository.create(plainToClass(Order, productRequestDto));
    }

    async deleteProduct(id: number): Promise<OrderResponseDto> {
        const product = await this._productRepository.delete(id);
        return plainToClass(OrderResponseDto, product);
    }

    async getProduct(id: number): Promise<OrderResponseDto | null> {
        const product = await this._productRepository.findOne(id);
        if(!product) return Promise.resolve(product);
        return plainToClass(OrderResponseDto, product);
    }

    async getProducts(): Promise<OrderResponseDto[] | []> {
        const products = await this._productRepository.find();
        return plainToClass(OrderResponseDto, products);
    }

    async updateProduct(id: number, updateRequestDto: OrderRequestDto): Promise<OrderResponseDto> {
        const product = await this._productRepository.update(id, plainToClass(Order, updateRequestDto));
        return plainToClass(OrderResponseDto, product)
    }

}