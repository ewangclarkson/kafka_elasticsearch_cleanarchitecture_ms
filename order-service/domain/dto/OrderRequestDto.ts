import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";

export default class OrderRequestDto {
    @IsUUID('4')
    @IsNotEmpty()
    customerId!: string;
    @IsString()
    @IsNotEmpty()
    orderDate!: string;
    @IsString()
    @IsNotEmpty()
    shippingAddress!: string;
    @IsString()
    @IsNotEmpty()
    billingAddress!: string;
    @IsNumber()
    @IsNotEmpty()
    amount!: number;
}
