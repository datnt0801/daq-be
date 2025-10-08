import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import { BaseEntity } from 'src/database/entities/base.entity';


@Entity({
    name: 'food_items',
})
export class FoodItem extends BaseEntity {
    
    @Column({
        name: 'name',
        unique: true,
    })
    name: string;

    @Column({
        name: 'price',
    })
    price: number;

    @Column({
        name: 'description',    
    })
    description: string;

    @Column({
        name: 'food_category_id',
    })
    foodCategoryId: number;

    @Column({
        name: 'image',
    })
    image: string;
}