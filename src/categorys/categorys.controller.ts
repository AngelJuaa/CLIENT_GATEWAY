import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, UseFilters } from '@nestjs/common';
import { CATEGORY_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDTO } from '../common/dto/pagination.dto.js';
import { catchError, firstValueFrom } from 'rxjs';
import { RpcCustomExceptionFilter } from '../common/index.js';

import { UpdateCategoryDto } from './dto/update-category.dto.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

// Rutas HTTP de productos que delegan las operaciones al microservicio correspondiente.
@Controller('categories')
@UseFilters(RpcCustomExceptionFilter)
export class CategorysController {
  // Obtiene por inyeccion el cliente TCP registrado en ProductsModule.
  constructor(@Inject(CATEGORY_SERVICE) private readonly categorysClient: ClientProxy,

) {}

  // Endpoint POST /products; aun no tiene implementada la delegacion al microservicio.
  @Post()
  create(@Body() CreateCategoryDto: CreateCategoryDto) {
    return this.categorysClient.send({cmd:'create_category'}, CreateCategoryDto).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
  }

  // Endpoint GET /products: envia al microservicio los parametros de paginacion.
  @Get()
  findAll(@Query()PaginationDTO: PaginationDTO) {
    return this.categorysClient.send({cmd:'find_all_categories'}, PaginationDTO);
  }

  // Endpoint GET /products/:id: exige un identificador numerico y solicita un producto.
  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.categorysClient.send({cmd:'find_one_category'},{id}).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
   /*  try {
          const product = await firstValueFrom( this.categorysClient.send({cmd:'find_one'},{id}));
      return product;
    } catch (error) {
      throw new RpcException(error);
    }*/
  } 

  // Endpoint PATCH /products/:id; aun no tiene implementada la actualizacion.
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id:number, @Body() updateCategoryDto: UpdateCategoryDto ) {
    return this.categorysClient.send({cmd:'update_category'},{...updateCategoryDto, id}).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
  }

  // Endpoint DELETE /products/:id; aun no tiene implementada la eliminacion.
  
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await firstValueFrom(
      this.categorysClient.send({ cmd: 'remove_category' }, { id })
    );
  }
}
