import PaymentResponseDto from "../domain/dto/PaymentResponseDto";
import ProviderRequest from "./provider.request";
import ProviderResponse from "./ProviderResponse";

export default interface PaymentInterface {
    processPayment(paymentRequest: ProviderRequest): Promise<void>

    handlePaymentResponse(paymentResponseDto: ProviderResponse): Promise<PaymentResponseDto>

    checkPaymentStatus(payStatusRequest: ProviderRequest): Promise<PaymentResponseDto>
}