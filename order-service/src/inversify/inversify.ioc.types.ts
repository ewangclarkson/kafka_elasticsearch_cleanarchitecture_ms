const IOC = {
    OrderRepository: Symbol.for("OrderRepository"),
    OrderService: Symbol.for("OrderService"),
    OrderController: Symbol.for("OrderController"),
    CartRepository: Symbol.for("CartRepository"),
    CartService: Symbol.for("CartService"),
    CartController: Symbol.for("CartController")
};

export { IOC };