import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus, PaymentMethod, FoodItemStatus } from 'src/constants/enum.constant';

export class CreateOrderDetailDto {
    @ApiProperty({
        description: 'Order ID',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    order_id: number;

    @ApiProperty({
        description: 'Food Item ID',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    food_item_id: number;

    @ApiProperty({
        description: 'Quantity',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

    @ApiProperty({
        description: 'Status',
        example: FoodItemStatus.SERVED,
        type: String,
        enum: FoodItemStatus,
        required: true,
        default: FoodItemStatus.SERVED,
    })
    @IsNotEmpty()
    @IsEnum(FoodItemStatus)
    status: FoodItemStatus;
}
