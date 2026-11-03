import { IsNumber,IsPositive,IsEnum, IsOptional} from 'class-validator';
import { OrderStatusList,OrderStatus } from '../enum/order.enum.js';

export class CreateOrderDto {
@IsNumber()
@IsPositive()
totalAmount!:number;

@IsNumber()
@IsPositive()
totalItem!:number;

@IsEnum(OrderStatusList,{
    message:`Possible status values are ${OrderStatusList.join(',')}`,
})
@IsOptional()
status: OrderStatus = OrderStatus.PENDING;

}
