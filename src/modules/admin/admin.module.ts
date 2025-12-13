import { Module } from "@nestjs/common";
import { TablesRepository } from "src/database/repositories/tables.repository";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";
import { FoodItemRepository } from "src/database/repositories/food-items.repository";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [TablesRepository, AdminService, FoodItemRepository],
    exports: [TablesRepository, AdminService, FoodItemRepository],
})
export class AdminModule {}