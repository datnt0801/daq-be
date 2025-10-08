import { PaymentMethod, TableStatus } from 'src/constants/enum.constant';
import { BaseEntity } from 'src/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Order extends BaseEntity {
    @Column()
    user_id: number;

    @Column()
    table_id: number;

    @Column()
    status: TableStatus;

    @Column()
    payment_method: PaymentMethod;

}
