import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { FoodCategory } from "../entities/food_category";
import { DataSource } from "typeorm";

@Injectable()
export class FoodCategoryRepository extends BaseRepository<FoodCategory> {
    constructor(dataSource: DataSource) {
        super(FoodCategory, dataSource.createEntityManager());
    }
}
