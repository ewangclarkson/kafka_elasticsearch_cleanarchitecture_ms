import CartService from "../../service/CartService";
import {inject, injectable} from "inversify";
import CartRequestDto from "../dto/CartRequestDto";
import CartResponseDto from "../dto/CartResponseDto";
import {IOC} from "../../inversify/inversify.ioc.types";
import ICartRepository from "../../repository/ICartRepository";
import {plainToClass} from "class-transformer"
import {Cart} from "../model/Cart";

@injectable()
export default class CartServiceImpl implements CartService {

    private _cartRepository: ICartRepository;

    constructor(@inject(IOC.CartRepository) cartRepository: ICartRepository) {
        this._cartRepository = cartRepository;
    }

    async addToCart(cartRequestDto: CartRequestDto): Promise<CartResponseDto> {
        return this._cartRepository.create(plainToClass(Cart, cartRequestDto));
    }

    async deleteCartDetail(id: number): Promise<CartResponseDto> {
        const cart = await this._cartRepository.delete(id);
        return plainToClass(CartResponseDto, cart);
    }

    async getCartDetail(id: number): Promise<CartResponseDto | null> {
        const cart = await this._cartRepository.findOne(id);
        if(!cart) return Promise.resolve(cart);
        return plainToClass(CartResponseDto, cart);
    }

    async getCartDetails(): Promise<CartResponseDto[] | []> {
        const carts = await this._cartRepository.find();
        return plainToClass(CartResponseDto, carts);
    }
    async updateCart(id: number,updateCartRequestDto: CartRequestDto): Promise<CartResponseDto> {
        const cart: Cart = plainToClass(Cart, updateRequestDto);
        const cartRes = await this._cartRepository.update(id,cart);
        if(!cartRes) return Promise.resolve(cartRes);
        return plainToClass(CartResponseDto, cartRes);
    }
}