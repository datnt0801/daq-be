import { Injectable } from "@nestjs/common";
import { TablesRepository } from "src/database/repositories/tables.repository";
import { TableDto } from "./dto/table.dto";
import { StaffDto } from "./dto/staff.dto";

@Injectable()
export class AdminService {
    constructor(
        private readonly tableRepository: TablesRepository,
    ) {}

    async createTable(tableDto: TableDto) {
        return this.tableRepository.save({
            name: tableDto.name,
            status: tableDto.status,
        });
    }

    async getTables() {
        return this.tableRepository.find();
    }

    async getTable(id: number) {
        return this.tableRepository.findOne({ where: { id } });
    }

    async updateTable(id: number, tableDto: TableDto) {
        return this.tableRepository.update({ id }, tableDto);
    }

    async deleteTable(id: number) {
        return this.tableRepository.delete({ id });
    }

    async createStaff(staffDto: StaffDto) {
        return this.tableRepository.save({
            name: staffDto.name,
            email: staffDto.email,
            role: staffDto.role,
        });
    }

    async getStaffs() {
        return this.tableRepository.find();
    }

    async getStaff(id: number) {
        return this.tableRepository.findOne({ where: { id } });
    }

    async updateStaff(id: number, staffDto: StaffDto) {
        return this.tableRepository.update({ id }, staffDto);
    }

    async deleteStaff(id: number) {
        return this.tableRepository.delete({ id });
    }
}
