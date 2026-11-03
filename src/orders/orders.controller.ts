import { Controller, Get, Post, Body, Param, Inject, Query,  } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { ORDER_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.js';
import { catchError } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient:ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
     return this.ordersClient.send({cmd:'createOrder'},createOrderDto).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );
  }

  @Get()
  findAll(@Query() OrderPaginationDto: OrderPaginationDto) {
   return this.ordersClient.send({cmd:'findAllOrders'}, OrderPaginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  return this.ordersClient.send({cmd:'findOneOrder'},{id}).pipe(
    catchError((err)=>{
      throw new RpcException(err);
    }),
  );

  }

 
}
