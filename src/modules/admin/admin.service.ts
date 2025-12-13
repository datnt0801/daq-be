import { FoodItemEntity } from 'src/database/entities/food_items.entity';
import { BadRequestException, Injectable } from "@nestjs/common";
import { TablesRepository } from "src/database/repositories/tables.repository";
import { TableDto } from "./dto/table.dto";
import { StaffDto } from "./dto/staff.dto";
import { UserRepository } from "src/database/repositories/users.repository";
import { UserType } from "src/constants/enum.constant";
import { GetStaffsPaginationDto } from "src/modules/admin/dto/get-staffs-pagination.dto";
import { GetTablesPaginationDto } from "src/modules/admin/dto/get-tables-pagination.dto";
import { FindOptionsWhere, Like, MoreThanOrEqual } from "typeorm";
import { TableEntity } from "src/database/entities/table.entity";
import { UserEntity } from "src/database/entities/user.entity";
import { FoodItemDto } from "src/modules/admin/dto/food-item.dto";
import { FoodItemRepository } from "src/database/repositories/food-items.repository";
import { GetFoodItemsPaginationDto } from "src/modules/admin/dto/get-food-items-pagination.dto";
@Injectable()
export class AdminService {
    constructor(
        private readonly tableRepository: TablesRepository,
        private readonly userRepository: UserRepository,
        private readonly foodItemRepository: FoodItemRepository,
    ) {}

    async createTable(tableDto: TableDto) {
        return this.tableRepository.save({
            name: tableDto.name,
            status: tableDto.status,
            capacity: tableDto.capacity,
            floor: tableDto.floor,
        });
    }

    async getTables(getTablesPaginationDto: GetTablesPaginationDto) {
        const whereCondition: FindOptionsWhere<TableEntity> = {};
        if(getTablesPaginationDto.id){
            whereCondition.id = getTablesPaginationDto.id;
        }
        if(getTablesPaginationDto.name){
            whereCondition.name = Like(`%${getTablesPaginationDto.name}%`);
        }
        if(getTablesPaginationDto.status){
            whereCondition.status = getTablesPaginationDto.status;
        }
        if(getTablesPaginationDto.capacity){
            whereCondition.capacity = MoreThanOrEqual(getTablesPaginationDto.capacity);
        }
        if(getTablesPaginationDto.floor){
            whereCondition.floor = getTablesPaginationDto.floor;
        }
        
        const tables = await this.tableRepository.find({
            where: whereCondition,
            take: getTablesPaginationDto.limit,
            skip: getTablesPaginationDto.offset,
            order: { updatedAt: getTablesPaginationDto.order || 'ASC' } });
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
            floor: tableDto.floor,
        });
    }

    async deleteTable(id: number) {
        return this.tableRepository.delete({ id });
    }

    async createStaff(staffDto: StaffDto) {
        const user = await this.userRepository.findOne({ where: { email: staffDto.email } });
        if (user) {
            throw new BadRequestException('Email đã tồn tại');
        }
        return this.userRepository.save({
            
            name: staffDto.name,
            email: staffDto.email,
            userType: staffDto.userType,
        });
    }

    async getStaffs(getStaffsPaginationDto: GetStaffsPaginationDto) {
        let  whereCondition: Array<FindOptionsWhere<UserEntity>> = [];
        let baseCondition: FindOptionsWhere<UserEntity> = {userType: UserType.STAFF };

        if(getStaffsPaginationDto.status){
          baseCondition.status = getStaffsPaginationDto.status;
        }
       
        if (getStaffsPaginationDto.search) {
            whereCondition.push({...baseCondition, name: Like(`%${getStaffsPaginationDto.search}%`) });
            whereCondition.push({...baseCondition, email: Like(`%${getStaffsPaginationDto.search}%`) });
        } else {
            whereCondition.push(baseCondition);
        }
       
        const [staffs, total] = await this.userRepository.findAndCount({ 
            where: whereCondition,
            take: getStaffsPaginationDto.limit,
            skip: getStaffsPaginationDto.offset,
            order: { updatedAt: getStaffsPaginationDto.order || 'DESC' } });
        return { data: staffs, total };
    }

    async getStaff(id: number) {
        return this.userRepository.findOne({ where: { id } });
    }

    async updateStaff(id: number, staffDto: StaffDto) {
        const staff = await this.userRepository.findOne({ where: { id } });
        if (!staff) {
            throw new Error('Staff not found');
        }
        if (staffDto.name) {
            staff.name = staffDto.name;
        }
        if (staffDto.email) {
            staff.email = staffDto.email;
        }
        if (staffDto.userType) {
            staff.userType = staffDto.userType;
        }
        return this.userRepository.save(staff);
    }

    async deleteStaff(id: number) {
        return this.userRepository.delete({ id });
    }

    async createFoodItem(foodItemDto: FoodItemDto) {
        return this.foodItemRepository.save({
            name: foodItemDto.name,
            price: foodItemDto.price,
            description: foodItemDto.description,
            foodCategoryId: foodItemDto.foodCategoryId,
            image: foodItemDto.image,
        });
    }

    async getFoodItems(getFoodItemsPaginationDto: GetFoodItemsPaginationDto) {
        const whereCondition: FindOptionsWhere<FoodItemEntity> = {};
        if(getFoodItemsPaginationDto.id){
            whereCondition.id = getFoodItemsPaginationDto.id;
        }
        if (getFoodItemsPaginationDto.name) {
            whereCondition.name = Like(`%${getFoodItemsPaginationDto.name}%`);
        }
        if (getFoodItemsPaginationDto.foodCategoryId) {
            whereCondition.foodCategoryId = getFoodItemsPaginationDto.foodCategoryId;
        }

        const foodItems = await this.foodItemRepository.find({
            where: whereCondition,
            take: getFoodItemsPaginationDto.limit,
            skip: getFoodItemsPaginationDto.offset,
            order: { updatedAt: getFoodItemsPaginationDto.order || 'ASC' } });
        return { data: foodItems, count: foodItems.length };
    }

    async getFoodItem(id: number) {
        return this.foodItemRepository.findOne({ where: { id } });
    }

    async updateFoodItem(id: number, foodItemDto: FoodItemDto) {
        const foodItem = await this.foodItemRepository.findOne({ where: { id } });
        if (!foodItem) {
            throw new Error('Food item not found');
        }
        if (foodItemDto.name) {
            foodItem.name = foodItemDto.name;
        }
        if (foodItemDto.price) {
            foodItem.price = foodItemDto.price;
        }
        if (foodItemDto.description) {
            foodItem.description = foodItemDto.description;
        }
        if (foodItemDto.foodCategoryId) {
            foodItem.foodCategoryId = foodItemDto.foodCategoryId;
        }
        if (foodItemDto.image) {
            foodItem.image = foodItemDto.image;
        }
        const updatedFoodItem = await this.foodItemRepository.save(foodItem);
        console.log("updatedFoodItem", updatedFoodItem);
        return updatedFoodItem;
    }

    async deleteFoodItem(id: number) {
        return this.foodItemRepository.delete({ id });
    }

}

// TODO: update lại api get all theo gpt