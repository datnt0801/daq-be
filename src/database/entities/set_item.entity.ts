import { BaseEntity } from "./base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'set_items',
})
export class SetItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'set_id',
    })
    setId: number;

    @Column({
        name: 'food_item_id',
    })
    foodItemId: number;
}