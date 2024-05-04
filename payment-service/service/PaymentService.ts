import PaymentRequestDto from "../domain/dto/PaymentRequestDto";
import PaymentResponseDto from "../domain/dto/PaymentResponseDto";
import ProviderResponse from "../thirdparty/ProviderResponse";

export default interface PaymentService {
    makePayment(paymentRequestDto: PaymentRequestDto): Promise<void>;

    completePayment(completePaymentRequestDto: ProviderResponse): Promise<PaymentResponseDto>;
}