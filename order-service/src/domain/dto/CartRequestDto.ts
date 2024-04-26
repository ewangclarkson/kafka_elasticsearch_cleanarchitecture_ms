import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export default class CartRequestDto {
    @IsString()
    @IsNotEmpty()
    item!: string;
    @IsNumber()
    @IsNotEmpty()
    prize!: number
}