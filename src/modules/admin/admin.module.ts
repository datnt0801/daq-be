import { Module } from "@nestjs/common";
import { TablesRepository } from "src/database/repositories/tables.repository";
import { AdminService } from "./admin.service";
import { AdminController } from "./admin.controller";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [TablesRepository, AdminService],
    exports: [TablesRepository, AdminService],
})
export class AdminModule {}