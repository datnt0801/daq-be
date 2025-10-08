import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { FoodItem } from "../entities/food_items.entity";
import { DataSource } from "typeorm";

@Injectable()
export class FoodItemRepository extends BaseRepository<FoodItem> {
    constructor(dataSource: DataSource) {
        super(FoodItem, dataSource.createEntityManager());
    }
}
