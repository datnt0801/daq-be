import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, OrderStatus, PaymentMethod } from 'src/constants/enum.constant';

export class CreateOrderDto {
    @ApiProperty({
        description: 'User ID',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        description: 'Table ID',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    table_id: number;

    @ApiProperty({
        description: 'Order Type',
        example: OrderType.BUFFET,
        type: String,
        enum: OrderType,
        required: true,
        default: OrderType.BUFFET,
    })
    @IsNotEmpty()
    @IsEnum(OrderType)
    type: OrderType;

    @ApiProperty({
        description: 'Order Type ID',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    type_id: number;

    @ApiProperty({
        description: 'Order Status',
        example: OrderStatus.UNPAID,
        type: String,
        enum: OrderStatus,
        required: true,
        default: OrderStatus.UNPAID,
    })
    @IsNotEmpty()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @ApiProperty({
        description: 'Payment Method',
        example: PaymentMethod.CASH,
        type: String,
        enum: PaymentMethod,
        required: true,
        default: PaymentMethod.CASH,
    })
    @IsNotEmpty()
    @IsEnum(PaymentMethod)
    payment_method: PaymentMethod;

    @ApiProperty({
        description: 'Total',
        example: 1,
        type: Number,
        required: true,
        default: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    total: number;
}
