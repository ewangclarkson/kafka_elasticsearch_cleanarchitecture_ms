import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";
import OrderRequestDto from "./OrderRequestDto";

export default class OrderResponseDto extends OrderRequestDto {
    @IsNotEmpty()
    id!: number;
}