import { TableStatus } from "src/constants/enum.constant";
import { BaseEntity } from "src/database/entities/base.entity";
import { Column, Entity } from "typeorm";

@Entity({
    name: 'tables',
})
export class TableEntity extends BaseEntity {
    @Column({
        name: 'name',
        unique: true,
    })
    name: string;

    @Column({
        name: 'status',
    })
    status: TableStatus;

    @Column({
        name: 'capacity',
    })
    capacity: number;
}
