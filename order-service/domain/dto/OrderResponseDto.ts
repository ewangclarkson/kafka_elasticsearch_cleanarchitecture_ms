import {IsNotEmpty, IsNumber, IsString, isUUID, IsUUID} from "class-validator";
import OrderRequestDto from "./OrderRequestDto";

export default class OrderResponseDto extends OrderRequestDto {
    @isUUID('4')
    @IsNotEmpty()
    id!: string;
}