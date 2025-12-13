import { Entity } from "typeorm";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column } from "typeorm";
import { FoodItemStatus } from "src/constants/enum.constant";

@Entity('order_details')
export class OrderDetail extends BaseEntity {

    @Column()
    order_id: number;

    @Column()
    food_item_id: number;

    @Column()
    amount: number;
    
    @Column()
    status: FoodItemStatus;
}