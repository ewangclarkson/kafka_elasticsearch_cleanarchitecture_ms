import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export default class CartRequestDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
    @IsString()
    @IsNotEmpty()
    description!: string;
    @IsNumber()
    @IsNotEmpty()
    stock!: number
}