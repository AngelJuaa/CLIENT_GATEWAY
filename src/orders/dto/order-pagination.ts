import { IsEnum, IsOptional } from 'class-validator';
import {OrderStatus, OrderStatusList } from '../enum/order.enum.js';
import { PaginationDTO } from '../../common/index.js';

export class OrderPaginationDto extends PaginationDTO {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList.join(', ')}`,
  })
  status!: OrderStatus;
}
