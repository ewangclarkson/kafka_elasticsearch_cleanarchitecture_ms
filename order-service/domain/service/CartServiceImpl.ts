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
        const cart = await this._cartRepository.create(plainToClass(Cart, cartRequestDto));
        return Promise.resolve(plainToClass(CartResponseDto, cart));
    }

    async deleteCartDetail(id: string): Promise<CartResponseDto> {
        const cart = await this._cartRepository.delete(id);
        return plainToClass(CartResponseDto, cart);
    }

    async getCartDetail(id: string): Promise<CartResponseDto | null> {
        const cart = await this._cartRepository.findOne(id);
        if (!cart) return Promise.resolve(null);
        return plainToClass(CartResponseDto, cart);
    }

    async getCartDetails(): Promise<CartResponseDto[] | []> {
        const carts = await this._cartRepository.find();
        return plainToClass(CartResponseDto, carts);
    }

    async updateCart(id: string, updateCartRequestDto: CartRequestDto): Promise<CartResponseDto> {
        const cart = plainToClass(Cart, updateCartRequestDto);
        const cartRes = await this._cartRepository.update(id, cart);

        return plainToClass(CartResponseDto, cartRes);
    }
}