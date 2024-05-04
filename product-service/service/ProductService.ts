import ProductRequestDto from "../domain/dto/ProductRequestDto";
import ProductResponseDto from "../domain/dto/ProductResponseDto";

export default interface ProductService {
     createProduct(productRequestDto: ProductRequestDto): Promise<ProductResponseDto>;

    updateProduct(id: string, updateRequestDto: ProductRequestDto): Promise<ProductResponseDto>

    getProduct(id: string): Promise<ProductResponseDto | null>;

    deleteProduct(id: string): Promise<ProductResponseDto>;

    getProducts(): Promise<ProductResponseDto[]>;

}