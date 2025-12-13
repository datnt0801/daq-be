import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({
    name: 'buffets',
})
export class BuffetEntity extends BaseEntity {
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
        nullable: true,
    })
    description?: string;

    @Column({
        name: 'image',
        nullable: true,
    })
    image?: string;
}
