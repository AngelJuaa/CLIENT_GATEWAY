import { IsOptional, IsEnum } from "class-validator";
import { OrderStatusList, OrderStatus } from "../enum/order.enum.js";

export class StatusDto{
    @IsOptional()
      @IsEnum(OrderStatusList, {
        message: `Valid status are ${OrderStatusList.join(', ')}`,
      })
      status!: OrderStatus ;
}