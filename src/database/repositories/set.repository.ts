import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { SetEntity } from "../entities/set.entity";

@Injectable()
export class SetRepository extends BaseRepository<SetEntity> {
    constructor(dataSource: DataSource) {
        super(SetEntity, dataSource.createEntityManager());
    }
}