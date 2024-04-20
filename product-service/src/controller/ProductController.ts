import {Request, Response, NextFunction} from "express";
import ProductResponseDto from "../domain/dto/ProductResponseDto";
import {RequestValidator} from "../utils/RequestValidator"
import ProductRequestDto from "../domain/dto/ProductRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import {IOC} from "../inversify/inversify.ioc.types";
import ProductService from "../service/ProductService";


@injectable()
export default class ProductController {

    private _productService: ProductService;

    constructor(
        @inject(IOC.ProductService) productService: ProductService
    ) {
        this._productService = productService;
    }

    async createProduct(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(ProductRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const product: ProductResponseDto = await this._productService.createProduct(input);

        return response.status(HttpStatus.CREATED).send(product);
    }


    async updateProduct(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(ProductRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        const savedProduct: ProductResponseDto = await this._productService.updateProduct(parseInt(request.params.id), input);

        return response.status(HttpStatus.OK).send(savedProduct);
    }

    async getProduct(request: Request, response: Response, next: NextFunction) {
        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(product);
    }

    async getProducts(request: Request, response: Response, next: NextFunction) {
        console.log(this._productService);

        const products: ProductResponseDto[] = await this._productService.getProducts();
        return response.status(HttpStatus.OK).send(products);
    }

    async deleteProduct(request: Request, response: Response, next: NextFunction) {
        const product = await this._productService.getProduct(parseInt(request.params.id));
        if (!product) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this._productService.deleteProduct(parseInt(request.body.params.id));

        return response.status(HttpStatus.OK).send(product);
    }
}