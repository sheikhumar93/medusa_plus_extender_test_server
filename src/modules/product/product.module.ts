import { Module } from "medusa-extender";
import ProductSubscriber from "./subscribers/product.subscriber";
import { Product } from "./entities/product.entity";
import ProductRepository from "./repositories/product.repository";
import { ProductService } from "./services/product.service";
import addStoreIdToProduct1658147433000 from "./product.migration";
import AttachProductSubscribersMiddleware from "./middlewares/product.middleware";

@Module({
  imports: [
    Product,
    ProductRepository,
    ProductService,
    addStoreIdToProduct1658147433000,
    AttachProductSubscribersMiddleware,
    ProductSubscriber,
  ],
})
export class ProductModule {}
