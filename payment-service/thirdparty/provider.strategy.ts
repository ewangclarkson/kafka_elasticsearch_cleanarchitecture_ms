import PaymentInterface from "./payment.interface";

export default class ProviderStrategy {

    strategy!: PaymentInterface;

    constructor(private provider: PaymentInterface) {
        this.strategy = provider;
    }

}