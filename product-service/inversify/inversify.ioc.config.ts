import {Container} from "inversify";
import {IOC} from "./inversify.ioc.types"
import IProductRepository from "../repository/IProductRepository";
import ProductionRepository from "../repository/implementation/ProductRepository";
import ProductService from "../service/ProductService";
import ProductServiceImpl from "../domain/service/ProductServiceImpl"
import ProductController from "../controller/ProductController";


const container = new Container();
container.bind<IProductRepository>(IOC.ProductRepository).to(ProductionRepository);
container.bind<ProductService>(IOC.ProductService).to(ProductServiceImpl);
container.bind(IOC.ProductController).to(ProductController);

export {container};