import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { envs } from './config/envs.js';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common/exceptions/rpc-exception.filter.js';

// Crea y configura la aplicacion antes de empezar a aceptar solicitudes.
async function bootstrap() {
  // Logger con un contexto identificable para los mensajes de arranque.
  const logger = new Logger('Main-Gateway');
  const app = await NestFactory.create(AppModule);

  // Valida los DTO de entrada, elimina propiedades no declaradas y rechaza
  // solicitudes que incluyan propiedades adicionales.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  app.useGlobalFilters(new RpcCustomExceptionFilter());

  app.setGlobalPrefix('api');
  // Usa el puerto validado desde la configuracion del entorno.
  await app.listen(envs.port);
logger.log(`Gateway running on port ${envs.port}`);
}

// Inicia el servidor al cargar el punto de entrada de la aplicacion.
await bootstrap();
