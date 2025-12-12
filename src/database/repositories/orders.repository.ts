import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { Order } from "../entities/orders.entity";
import { DataSource } from "typeorm";

@Injectable()
export class OrderRepository extends BaseRepository<Order> {
    constructor(dataSource: DataSource) {
        super(Order, dataSource.createEntityManager());
    }
}
