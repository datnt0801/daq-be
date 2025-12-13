import { BaseEntity } from "./base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'buffet_items',
})
export class BuffetItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'buffet_id',
    })
    buffetId: number;

    @Column({
        name: 'food_item_id',
    })
    foodItemId: number;
}