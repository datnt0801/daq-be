import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { FoodItemEntity } from "../entities/food_items.entity";
import { DataSource } from "typeorm";

@Injectable()
export class FoodItemRepository extends BaseRepository<FoodItemEntity> {
    constructor(dataSource: DataSource) {
        super(FoodItemEntity, dataSource.createEntityManager());
    }
}
