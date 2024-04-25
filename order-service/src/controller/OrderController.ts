import {Request, Response, NextFunction} from "express";
import OrderResponseDto from "../domain/dto/OrderResponseDto";
import {RequestValidator} from "../utils/RequestValidator"
import OrderRequestDto from "../domain/dto/OrderRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import {IOC} from "../inversify/inversify.ioc.types";
import ProductService from "../service/OrderService";


@injectable()
export default class ProductController {

    private _productService: ProductService;

    constructor(
        @inject(IOC.ProductService) productService: ProductService
    ) {
        this._productService = productService;
    }

    async createProduct(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(OrderRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const product: OrderResponseDto = await this._productService.createProduct(input);

        return response.status(HttpStatus.CREATED).send(product);
    }


    async updateProduct(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(OrderRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        const savedProduct: OrderResponseDto = await this._productService.updateProduct(parseInt(request.params.id), input);

        return response.status(HttpStatus.OK).send(savedProduct);
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(product);
    }

    async getProducts(request: Request, response: Response, next: NextFunction) {

        const products: OrderResponseDto[] = await this._productService.getProducts();
        return response.status(HttpStatus.OK).send(products);
    }

    async deleteProduct(request: Request, response: Response, next: NextFunction) {
        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this._productService.deleteProduct(parseInt(request.params.id));

        return response.status(HttpStatus.OK).send(product);
    }
}