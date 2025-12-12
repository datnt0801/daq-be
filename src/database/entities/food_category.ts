import { Entity, Column } from "typeorm";
import { BaseEntity } from 'src/database/entities/base.entity';

@Entity({
    name: 'food_categories',
})
export class FoodCategory extends BaseEntity {
    
    @Column({
        name: 'name',
        unique: true,
    })
    name: string;
    
    @Column({
        name: 'created_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
    })
    created_at: Date;
    
    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updated_at: Date;
}
