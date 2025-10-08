import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { OrderDetail } from "../entities/order_detail.entity";
import { DataSource } from "typeorm";

@Injectable()
export class OrderDetailRepository extends BaseRepository<OrderDetail> {
    constructor(dataSource: DataSource) {
        super(OrderDetail, dataSource.createEntityManager());
    }
}
