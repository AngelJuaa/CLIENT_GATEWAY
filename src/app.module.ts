import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module.js";
import { OrdersModule } from './orders/orders.module.js';

// Modulo raiz: agrupa los modulos funcionales que componen el gateway.
@Module({
  // El gateway expone actualmente la funcionalidad relacionada con productos.
  imports: [ProductsModule, OrdersModule],
  // Los controladores y proveedores pertenecen a sus modulos funcionales.
  controllers: [],
  providers: [],
})
export class AppModule {}
