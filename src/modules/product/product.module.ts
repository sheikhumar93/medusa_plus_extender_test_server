import { Module } from 'medusa-extender';
import { Product } from './entities/product.entity';
import ProductRepository from './repositories/product.repository';
import { ProductService } from './services/product.service';
import addStoreIdToProduct1658147433000 from './product.migration';

@Module({
  imports: [
    Product,
    ProductRepository,
    ProductService,
    addStoreIdToProduct1658147433000,
  ]
})
export class ProductModule { }