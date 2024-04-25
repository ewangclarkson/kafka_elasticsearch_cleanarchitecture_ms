import CartRequestDto from "../domain/dto/CartRequestDto";
import CartResponseDto from "../domain/dto/CartResponseDto";

export default interface CartService {
    addToCart(cartRequestDto: CartRequestDto): Promise<CartResponseDto>;

    getCartDetail(id: number): Promise<CartResponseDto | null>;

    deleteCartDetail(id: number): Promise<CartResponseDto>;

    getCartDetails(): Promise<CartResponseDto[]>;

    updateCart(id: number, updateCartRequestDto: CartRequestDto): Promise<CartResponseDto>;

}