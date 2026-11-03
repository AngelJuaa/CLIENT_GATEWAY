import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';

// Pruebas de extremo a extremo que levantan la aplicacion NestJS real.
describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  // Crea una instancia nueva para cada prueba y prepara sus rutas y dependencias.
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Comprueba la respuesta HTTP del endpoint raiz configurado por la aplicacion.
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  // Cierra la instancia para liberar recursos y evitar interferencias entre pruebas.
  afterEach(async () => {
    await app.close();
  });
});
