import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";
import CartRequestDto from "./CartRequestDto";

export default class CartResponseDto extends CartRequestDto {
    @IsNotEmpty()
    id!: number;
}