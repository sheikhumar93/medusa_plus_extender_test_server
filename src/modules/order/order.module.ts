import { Module } from "medusa-extender";
import { Order } from "./entities/order.entity";
import { OrderMigration1658317196788 } from "./1658317196788-order.migration";
import { OrderRepository } from "./repositories/order.repository";
import { OrderService } from "./services/order.service";

@Module({
  imports: [Order, OrderRepository, OrderService, OrderMigration1658317196788],
})
export class OrderModule {}
