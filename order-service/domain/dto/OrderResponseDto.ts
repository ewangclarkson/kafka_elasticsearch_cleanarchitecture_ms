import {IsNotEmpty, IsUUID} from "class-validator";
import OrderRequestDto from "./OrderRequestDto";

export default class OrderResponseDto extends OrderRequestDto {
    @IsUUID('4')
    @IsNotEmpty()
    id!: string;
}