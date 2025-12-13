import { OrderType, PaymentMethod, OrderStatus } from 'src/constants/enum.constant';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('orders')
export class OrderEntity extends BaseEntity {
    @Column()
    user_id: number;

    @Column()
    table_id: number;

    @Column({type: 'enum', enum: OrderStatus})
    status: OrderStatus;
    
    @Column({type: 'enum', enum: OrderType})
    type: OrderType;
    
    @Column()
    type_id: number;
    
    @Column({type: 'enum', enum: PaymentMethod})
    payment_method: PaymentMethod;
    
    @Column()
    total: number; 

}
