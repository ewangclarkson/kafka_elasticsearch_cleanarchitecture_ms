import OrderRequestDto from "../domain/dto/OrderRequestDto";
import OrderResponseDto from "../domain/dto/OrderResponseDto";

export default interface OrderService {
    createOrder(orderRequestDto: OrderRequestDto): Promise<OrderResponseDto>;
    
    getOrder(id: number): Promise<OrderResponseDto | null>;

    deleteOrder(id: number): Promise<OrderResponseDto>;

    getOrders(): Promise<OrderResponseDto[]>;

}