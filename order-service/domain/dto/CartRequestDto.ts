import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export default class CartRequestDto {
    @IsUUID('4')
    @IsNotEmpty()
    customerId!: string;
    @IsUUID('4')
    @IsNotEmpty()
    productId!: string;
    @IsNumber()
    @IsNotEmpty()
    quantity!: number
    @IsString()
    @IsNotEmpty()
    date!: string
}
