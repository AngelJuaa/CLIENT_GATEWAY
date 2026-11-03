import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, UseFilters } from '@nestjs/common';
import { PRODUCT_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDTO } from '../common/dto/pagination.dto.js';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { RpcCustomExceptionFilter } from '../common/index.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

// Rutas HTTP de productos que delegan las operaciones al microservicio correspondiente.
@Controller('products')
@UseFilters(RpcCustomExceptionFilter)
export class ProductsController {
  // Obtiene por inyeccion el cliente TCP registrado en ProductsModule.
  constructor(@Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy,

) {}

  // Endpoint POST /products; aun no tiene implementada la delegacion al microservicio.
  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productsClient.send({cmd:'createProduct'}, CreateProductDto).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
  }

  // Endpoint GET /products: envia al microservicio los parametros de paginacion.
  @Get()
  findAll(@Query()PaginationDTO: PaginationDTO) {
    return this.productsClient.send({cmd:'find'}, PaginationDTO);
  }

  // Endpoint GET /products/:id: exige un identificador numerico y solicita un producto.
  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.productsClient.send({cmd:'find_one'},{id}).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
   /*  try {
          const product = await firstValueFrom( this.productsClient.send({cmd:'find_one'},{id}));
      return product;
    } catch (error) {
      throw new RpcException(error);
    }*/
  } 

  // Endpoint PATCH /products/:id; aun no tiene implementada la actualizacion.
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() updateProductDto: UpdateProductDto ) {
    return this.productsClient.send({cmd:'UpdateProduct'},{id, ...updateProductDto}).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
  }

  // Endpoint DELETE /products/:id; aun no tiene implementada la eliminacion.
  
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await firstValueFrom(
      this.productsClient.send({ cmd: 'deleteProduct' }, { id })
    );
  }
}
