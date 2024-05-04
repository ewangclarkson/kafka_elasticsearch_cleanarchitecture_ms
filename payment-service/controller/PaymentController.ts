import {NextFunction, Request, Response} from "express";
import PaymentResponseDto from "../domain/dto/PaymentResponseDto";
import {RequestValidator} from "../utils/RequestValidator"
import PaymentRequestDto from "../domain/dto/PaymentRequestDto";
import HttpStatus from "http-status";
import {inject, injectable} from "inversify";
import {IOC} from "../config/ioc/inversify.ioc.types";
import PaymentService from "../service/PaymentService";
import CompletePaymentRequest from "../thirdparty/ProviderResponse";


@injectable()
export default class PaymentController {

    private _paymentService: PaymentService;

    constructor(
        @inject(IOC.PaymentService) paymentService: PaymentService) {
        this._paymentService = paymentService;
    }

    async makePayment(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(PaymentRequestDto, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        await this._paymentService.makePayment(input);

        return response.status(HttpStatus.OK).send("Payment successfully initiated");
    }

    async completePayment(request: Request, response: Response, next: NextFunction) {
        const {errors, input} = await RequestValidator(CompletePaymentRequest, request.body);

        if (errors) return response.status(HttpStatus.BAD_REQUEST).send(errors);

        const updatedPayment: PaymentResponseDto = await this._paymentService.completePayment(input);

        return response.status(HttpStatus.OK).send(updatedPayment);
    }

}