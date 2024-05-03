import CartRequestDto from "../domain/dto/CartRequestDto";
import CartResponseDto from "../domain/dto/CartResponseDto";

export default interface CartService {
    addToCart(cartRequestDto: CartRequestDto): Promise<CartResponseDto>;

    getCartDetail(id: string): Promise<CartResponseDto | null>;

    deleteCartDetail(id: string): Promise<CartResponseDto>;

    getCartDetails(): Promise<CartResponseDto[]>;

    updateCart(id: string, updateCartRequestDto: CartRequestDto): Promise<CartResponseDto>;

}