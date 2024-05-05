import {Container} from "inversify";
import {IOC} from "./inversify.ioc.types"
import IPaymentRepository from "../../repository/IPaymentRepository";
import PaymentRepository from "../../repository/implementation/PaymentRepository";
import PaymentService from "../../service/PaymentService";
import PaymentServiceImpl from "../../domain/service/PaymentServiceImpl"
import PaymentController from "../../controller/PaymentController";
import IThirdPartyProvider from "../../thirdparty/Ithirdparty.provider";
import ThirdPartyProvider from "../../thirdparty/thirdparty.provider";
import PaymentInterface from "../../thirdparty/payment.interface";
import MtnMomoPayment from "../../thirdparty/mtn/MtnMomoPayment";
import OrangeMomoPayment from "../../thirdparty/orange/OrangeMomoPayment";
import VisaPayment from "../../thirdparty/visa/VisaPayment";
import KafkaService from "../../service/KafkaService";
import KafkaServiceImpl from "../../domain/service/KafkaServiceImpl";

const container = new Container();
container.bind<IPaymentRepository>(IOC.PaymentRepository).to(PaymentRepository);
container.bind<PaymentService>(IOC.PaymentService).to(PaymentServiceImpl);
container.bind<IThirdPartyProvider>(IOC.ProviderStrategy).to(ThirdPartyProvider);
container.bind<PaymentInterface>(IOC.MtnMomoPayment).to(MtnMomoPayment);
container.bind<PaymentInterface>(IOC.VisaPayment).to(VisaPayment);
container.bind<PaymentInterface>(IOC.OrangePayment).to(OrangeMomoPayment);
container.bind<KafkaService>(IOC.KafkaService).to(KafkaServiceImpl);
container.bind(IOC.PaymentController).to(PaymentController);

export {container};