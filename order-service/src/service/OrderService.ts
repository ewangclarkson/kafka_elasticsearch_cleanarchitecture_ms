import ProductRequestDto from "../domain/dto/ProductRequestDto";
import ProductResponseDto from "../domain/dto/ProductResponseDto";

export default interface ProductService {
     createProduct(productRequestDto: ProductRequestDto): Promise<ProductResponseDto>;

    updateProduct(id: number, updateRequestDto: ProductRequestDto): Promise<ProductResponseDto>

    getProduct(id: number): Promise<ProductResponseDto | null>;

    deleteProduct(id: number): Promise<ProductResponseDto>;

    getProducts(): Promise<ProductResponseDto[]>;

}