import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({
    name: 'sets',
})
export class SetEntity extends BaseEntity {
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
        name: 'image',
    })
    image: string;
}