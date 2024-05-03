import {IsNotEmpty, isUUID} from "class-validator";
import CartRequestDto from "./CartRequestDto";

export default class CartResponseDto extends CartRequestDto {
    @IsNotEmpty()
    @isUUID('4')
    id!: string;
}