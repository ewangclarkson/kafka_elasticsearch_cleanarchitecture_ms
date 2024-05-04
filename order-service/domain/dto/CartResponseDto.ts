import {IsNotEmpty, IsUUID} from "class-validator";
import CartRequestDto from "./CartRequestDto";

export default class CartResponseDto extends CartRequestDto {
    @IsNotEmpty()
    @IsUUID('4')
    id!: string;
}