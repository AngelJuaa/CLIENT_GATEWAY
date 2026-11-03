import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs.js';
import { PRODUCT_SERVICE } from '../config/service.js';

// Modulo que conecta las rutas HTTP de productos con su microservicio TCP.
@Module({
  // Registra un cliente NestJS con la direccion tomada de la configuracion.
  imports:[ ClientsModule.register([
      { name: PRODUCT_SERVICE, transport: Transport.TCP,options:{
        host:envs.productsMicroserviceHost,
        port:envs.productsMicroservicePort,
      } },
    ]),
  ],
  // Las rutas HTTP de productos se implementan en este controlador.
  controllers: [ProductsController],
  // El cliente se proporciona mediante ClientsModule y no requiere proveedores propios.
  providers: [],
})
export class ProductsModule {}
