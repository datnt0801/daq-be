import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { BuffetRepository } from "src/database/repositories/buffet.repository";
import { BuffetItemRepository } from "src/database/repositories/buffet-item.repository";
import { SetRepository } from "src/database/repositories/set.repository";
import { SetItemRepository } from "src/database/repositories/set-item.repository";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService, BuffetRepository, BuffetItemRepository, SetRepository, SetItemRepository],
    exports: [UserService],
})
export class UserModule { }