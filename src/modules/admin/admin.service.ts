import { Injectable } from "@nestjs/common";
import { TablesRepository } from "src/database/repositories/tables.repository";
import { TableDto } from "./dto/table.dto";
import { StaffDto } from "./dto/staff.dto";
import { UserRepository } from "src/database/repositories/users.repository";
import { UserType } from "src/constants/enum.constant";
import { GetStaffsPaginationDto } from "src/modules/admin/dto/get-staffs-pagination.dto";
import { GetTablesPaginationDto } from "src/modules/admin/dto/get-tables-pagination.dto";
import { FindOptionsWhere, Like } from "typeorm";
import { TableEntity } from "src/database/entities/table.entity";
import { UserEntity } from "src/database/entities/user.entity";

@Injectable()
export class AdminService {
    constructor(
        private readonly tableRepository: TablesRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async createTable(tableDto: TableDto) {
        return this.tableRepository.save({
            name: tableDto.name,
            status: tableDto.status,
            capacity: tableDto.capacity,
        });
    }

    async getTables(getTablesPaginationDto: GetTablesPaginationDto) {
        const whereCondition: FindOptionsWhere<TableEntity> = getTablesPaginationDto.id ? { id: getTablesPaginationDto.id } : {};
        if (getTablesPaginationDto.name) {
            whereCondition.name = Like(`%${getTablesPaginationDto.name}%`);
        }
        if (getTablesPaginationDto.status) {
            whereCondition.status = getTablesPaginationDto.status;
        }
        if (getTablesPaginationDto.capacity) {
            whereCondition.capacity = getTablesPaginationDto.capacity;
        }
        const tables = await this.tableRepository.find({
            where: whereCondition,
            take: getTablesPaginationDto.limit,
            skip: getTablesPaginationDto.offset });
        return { data: tables, count: tables.length };
    }

    async getTable(id: number) {
        return this.tableRepository.findOne({ where: { id } });
    }

    async updateTable(id: number, tableDto: TableDto) {
        return this.tableRepository.update({ id }, {
            name: tableDto.name,
            status: tableDto.status,
            capacity: tableDto.capacity,
        });
    }

    async deleteTable(id: number) {
        return this.tableRepository.delete({ id });
    }

    async createStaff(staffDto: StaffDto) {
        return this.userRepository.save({
            name: staffDto.name,
            email: staffDto.email,
            userType: staffDto.userType,
        });
    }

    async getStaffs(getStaffsPaginationDto: GetStaffsPaginationDto) {
        const whereCondition: FindOptionsWhere<UserEntity> = {};
        if (getStaffsPaginationDto.id) {
            whereCondition.id = getStaffsPaginationDto.id;
        }
        if (getStaffsPaginationDto.name) {
            whereCondition.name = Like(`%${getStaffsPaginationDto.name}%`);
        }
        if (getStaffsPaginationDto.email) {
            whereCondition.email = Like(`%${getStaffsPaginationDto.email}%`);
        }
        const staffs = await this.userRepository.find({ where: whereCondition,
            take: getStaffsPaginationDto.limit,
            skip: getStaffsPaginationDto.offset });
        return { data: staffs, count: staffs.length };
    }

    async getStaff(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateStaff(id: number, staffDto: StaffDto) {
        const staff = await this.userRepository.findOne({ where: { id } });
        if (!staff) {
            throw new Error('Staff not found');
        }
        staff.name = staffDto.name;
        staff.email = staffDto.email;
        staff.userType = staffDto.userType;
        return this.userRepository.save(staff);
    }

    async deleteStaff(id: number) {
        return this.userRepository.delete({ id });
    }

}
