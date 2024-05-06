import {Request, Response, NextFunction} from "express";
import CartResponseDto from "../domain/dto/CartResponseDto";
import {RequestValidator} from "../utils/RequestValidator"
import CartRequestDto from "../domain/dto/CartRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import {IOC} from "../inversify/inversify.ioc.types";
import CartService from "../service/CartService";


@injectable()
export default class CartController {

    private _cartService: CartService;

    constructor(
        @inject(IOC.CartService) cartService: CartService
    ) {
        this._cartService = cartService;
    }

    async addToCart(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(CartRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const cart: CartResponseDto = await this._cartService.addToCart(input);

        return response.status(HttpStatus.CREATED).send(cart);
    }


    async getCartDetail(request: Request, response: Response, next: NextFunction) {
        const cart = await this._cartService.getCartDetail(request.params.id);
        if (!cart) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        return response.status(HttpStatus.OK).send(cart);
    }

    async getCartDetails(request: Request, response: Response, next: NextFunction) {

        const carts: CartResponseDto[] = await this._cartService.getCartDetails();
        return response.status(HttpStatus.OK).send(carts);
    }

    async deleteCartDetail(request: Request, response: Response, next: NextFunction) {
        const cart = await this._cartService.getCartDetail(request.params.id);
        if (!cart) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);

        await this._cartService.deleteCartDetail(request.params.id);

        return response.status(HttpStatus.OK).send(cart);
    }
    async updateCart(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(CartRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const cart = await this._cartService.getCartDetail(request.params.id);
        if (!cart) return response.status(HttpStatus.NOT_FOUND).send(HttpStatus[`${HttpStatus.NOT_FOUND}_MESSAGE`]);


        const updatedCart: CartResponseDto = await this._cartService.updateCart(request.params.id,input);

        return response.status(HttpStatus.CREATED).send(updatedCart);
    }

}