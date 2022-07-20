import { Service, OnMedusaEntityEvent, EntityEventType, MedusaEventHandlerParams, } from "medusa-extender";
import { EntityManager } from "typeorm";
import { ProductService as MedusaProductService } from "@medusajs/medusa/dist/services";
import { Product } from '../entities/product.entity';
import { User } from "../../user/entities/user.entity";
import UserService from "../../user/services/user.service";
// import { FindWithoutRelationsOptions } from "@medusajs/medusa/dist/repositories/product";
import { Selector } from "@medusajs/medusa/dist/types/common";
import { FilterableProductProps, FindProductConfig } from "@medusajs/medusa/dist/types/product";
// import ProductRepository from '../repositories/product.repository';
import ProductVariantService from '@medusajs/medusa/dist/services/product-variant';
import { ProductVariantRepository } from '@medusajs/medusa/dist/repositories/product-variant';
import { ProductOptionRepository } from '@medusajs/medusa/dist/repositories/product-option';
import EventBusService from '@medusajs/medusa/dist/services/event-bus';
import ProductCollectionService from '@medusajs/medusa/dist/services/product-collection';
import { ProductTypeRepository } from '@medusajs/medusa/dist/repositories/product-type';
import { ProductTagRepository } from '@medusajs/medusa/dist/repositories/product-tag';
import { ImageRepository } from '@medusajs/medusa/dist/repositories/image';
import DefaultSearchService from '@medusajs/medusa/dist/services/search';
import ProductRepository from '../repositories/product.repository';


interface ConstructorParams<TSearchService extends DefaultSearchService = DefaultSearchService> {
  manager: EntityManager;
  loggedInUser: User;
  productRepository: typeof ProductRepository;
  productVariantRepository: typeof ProductVariantRepository;
  productOptionRepository: typeof ProductOptionRepository;
  eventBusService: EventBusService;
  productVariantService: ProductVariantService;
  productCollectionService: ProductCollectionService;
  productTypeRepository: typeof ProductTypeRepository;
  productTagRepository: typeof ProductTagRepository;
  imageRepository: typeof ImageRepository;
  searchService: TSearchService;
  userService: UserService;
};

@Service({ scope: 'SCOPED', override: MedusaProductService })
export class ProductService extends MedusaProductService {
  readonly manager: EntityManager;

  constructor(readonly container: ConstructorParams) {
    super(container);
    this.manager = container.manager;
  }

  protected prepareListQuery_(
    selector: FilterableProductProps | Selector<Product>,
    config: FindProductConfig
  ) {
    if (Object.keys(this.container).includes('loggedInUser')) {
      selector['store_id'] = this.container.loggedInUser.store_id;
    }
    return super.prepareListQuery_(selector, config);
  }

  @OnMedusaEntityEvent.Before.Insert(Product, { async: true })
  public async attachStoreToProduct(
    params: MedusaEventHandlerParams<Product, 'Insert'>
  ): Promise<EntityEventType<Product, 'Insert'>> {
    const { event } = params;
    const loggedInUser = this.container.loggedInUser;
    event.entity.store_id = loggedInUser.store_id;
    return event;
  }
}