import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({
    name: 'food_items',
})
export class FoodItem {
    @PrimaryGeneratedColumn()
    id: number;

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