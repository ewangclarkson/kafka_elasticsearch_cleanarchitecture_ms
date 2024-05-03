import {IsNotEmpty, IsNumber, IsString, IsUUID} from "class-validator";
import ProductRequestDto from "./ProductRequestDto";

export default class ProductResponseDto extends ProductRequestDto {
    @IsNotEmpty()
    id!: number;
}