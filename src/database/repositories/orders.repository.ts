import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { OrderEntity } from "../entities/orders.entity";
import { DataSource } from "typeorm";

@Injectable()
export class OrderRepository extends BaseRepository<OrderEntity> {
    constructor(dataSource: DataSource) {
        super(OrderEntity, dataSource.createEntityManager());
    }
}
