const IOC = {
    PaymentRepository: Symbol.for("PaymentRepository"),
    PaymentService: Symbol.for("PaymentService"),
    PaymentController: Symbol.for("PaymentController"),
    ProviderStrategy: Symbol.for("ProviderStrategy"),
    MtnMomoPayment: Symbol.for("MtnMomoPayment"),
    OrangePayment: Symbol.for("OrangePayment"),
    VisaPayment: Symbol.for("VisaPayment")
};

export { IOC };