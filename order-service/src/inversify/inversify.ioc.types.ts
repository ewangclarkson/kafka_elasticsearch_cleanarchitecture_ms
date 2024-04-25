const IOC = {
    OrderRepository: Symbol.for("OrderRepository"),
    OrderService: Symbol.for("OrderService"),
    OrderController: Symbol.for("OrderController")
};

export { IOC };