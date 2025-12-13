import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { BuffetItemEntity } from "../entities/buffet_item.entity";

@Injectable()
export class BuffetItemRepository extends BaseRepository<BuffetItemEntity> {
    constructor(dataSource: DataSource) {
        super(BuffetItemEntity, dataSource.createEntityManager());
    }
}