import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { BuffetEntity } from "../entities/buffet.entity";

@Injectable() 
export class BuffetRepository extends BaseRepository<BuffetEntity> {
    constructor(dataSource: DataSource) {
        super(BuffetEntity, dataSource.createEntityManager());
    }
}
