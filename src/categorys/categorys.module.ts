import { Module } from '@nestjs/common';
import { CategorysController } from './categorys.controller.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from '../config/envs.js';
import { CATEGORY_SERVICE } from '../config/service.js';

// Modulo que conecta las rutas HTTP de productos con su microservicio TCP.
@Module({
  // Registra un cliente NestJS con la direccion tomada de la configuracion.
  imports:[ ClientsModule.register([
      { name: CATEGORY_SERVICE, transport: Transport.TCP,options:{
        host:envs.categoryMicroserviceHost,
        port:envs.categoryMicroservicePort,
      } },
    ]),
  ],
  // Las rutas HTTP de productos se implementan en este controlador.
  controllers: [CategorysController],
  // El cliente se proporciona mediante ClientsModule y no requiere proveedores propios.
  providers: [],
})
export class CategorysModule {}
