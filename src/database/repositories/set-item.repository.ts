import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { SetItemEntity } from "../entities/set_item.entity";

@Injectable()
export class SetItemRepository extends BaseRepository<SetItemEntity> {
    constructor(dataSource: DataSource) {
        super(SetItemEntity, dataSource.createEntityManager());
    }
}
