import { Controller, Get, Post, Body, Param, Inject, Query, Patch, ParseUUIDPipe, } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { ORDER_SERVICE } from '../config/service.js';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { OrderPaginationDto } from './dto/order-pagination.js';
import { catchError } from 'rxjs';
import { StatusDto } from './dto/status.dto.js';
import { PaginationDTO } from '../common/index.js';
import { OrderStatus } from './enum/order.enum.js';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy) { }

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() OrderPaginationDto: OrderPaginationDto) {
    return this.ordersClient.send( 'findAllOrders', OrderPaginationDto);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

  }
  @Get(':status')
  findAllByStatus(@Param() statusDto: StatusDto, @Query() paginationDTO: PaginationDTO) {
    return this.ordersClient.send('findAllOrders', { ...paginationDTO, status: statusDto.status }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

  }

  @Patch(':id')
  changeStatus(@Param('id', ParseUUIDPipe) id: string, @Body() status: StatusDto,) {
    return this.ordersClient.send('changeOrderStatus', { id: id, status: status.status }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }


}
