import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./base.repository";
import { TableEntity } from "../entities/table.entity";
import { DataSource } from "typeorm";

@Injectable()
export class TablesRepository extends BaseRepository<TableEntity> {
    constructor(dataSource: DataSource) {
        super(TableEntity, dataSource.createEntityManager());
      }
}