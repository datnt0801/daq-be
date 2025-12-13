import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { TableDto } from "./dto/table.dto";
import { JwtAuthGuard } from "src/modules/auth/jwt/jwt.guard";
import { RoleGuard } from "src/shared/guards/role.guards";
import { UserType } from "src/constants/enum.constant";
import { AllowedRoles } from "src/shared/guards/role.guards";
import { StaffDto } from "src/modules/admin/dto/staff.dto";
import { GetStaffsPaginationDto } from "src/modules/admin/dto/get-staffs-pagination.dto";
import { GetTablesPaginationDto } from "src/modules/admin/dto/get-tables-pagination.dto";
import { FoodItemDto } from "src/modules/admin/dto/food-item.dto";
import { GetFoodItemsPaginationDto } from "src/modules/admin/dto/get-food-items-pagination.dto";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Post('table')
    @ApiOperation({ summary: 'Create table' })
    async createTable(@Body() tableDto: TableDto) {
        return this.adminService.createTable(tableDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('table')
    @ApiOperation({ summary: 'Get tables' })
    async getTables(@Query() getTablesPaginationDto: GetTablesPaginationDto) {
        return this.adminService.getTables(getTablesPaginationDto);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('table/:id')
    @ApiOperation({ summary: 'Get table' })
    async getTable(@Param('id') id: number) {
        return this.adminService.getTable(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Put('table/:id')
    @ApiOperation({ summary: 'Update table' })
    async updateTable(@Param('id') id: number, @Body() tableDto: TableDto) {
        return this.adminService.updateTable(id, tableDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Delete('table/:id')
    @ApiOperation({ summary: 'Delete table' })
    async deleteTable(@Param('id') id: number) {
        return this.adminService.deleteTable(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Post('staff')
    @ApiOperation({ summary: 'Create staff' })
    async createStaff(@Body() staffDto: StaffDto) {
        return this.adminService.createStaff(staffDto);
    }

    @Get('staff')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @ApiOperation({ summary: 'Get staffs' })
    async getStaffs(@Query() getStaffsPaginationDto: GetStaffsPaginationDto) {
        return this.adminService.getStaffs(getStaffsPaginationDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('staff/:id')
    @ApiOperation({ summary: 'Get staff' })
    async getStaff(@Param('id') id: number) {
        return this.adminService.getStaff(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Put('staff/:id')
    @ApiOperation({ summary: 'Update staff' })
    async updateStaff(@Param('id') id: number, @Body() staffDto: StaffDto) {
        return this.adminService.updateStaff(id, staffDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Delete('staff/:id')
    @ApiOperation({ summary: 'Delete staff' })
    async deleteStaff(@Param('id') id: number) {
        return this.adminService.deleteStaff(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Post('food-item')
    @ApiOperation({ summary: 'Create food item' })
    async createFoodItem(@Body() foodItemDto: FoodItemDto) {
        return this.adminService.createFoodItem(foodItemDto);
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @AllowedRoles(UserType.ADMIN)
    @Get('food-item')
    @ApiOperation({ summary: 'Get food items' })
    async getFoodItems(@Query() getFoodItemsPaginationDto: GetFoodItemsPaginationDto) {
        return this.adminService.getFoodItems(getFoodItemsPaginationDto);
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @AllowedRoles(UserType.ADMIN)
    @Get('food-item/:id')
    @ApiOperation({ summary: 'Get food item' })
    async getFoodItem(@Param('id') id: number) {
        return this.adminService.getFoodItem(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Put('food-item/:id')
    @ApiOperation({ summary: 'Update food item' })
    async updateFoodItem(@Param('id') id: number, @Body() foodItemDto: FoodItemDto) {
        return this.adminService.updateFoodItem(id, foodItemDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Delete('food-item/:id')
    @ApiOperation({ summary: 'Delete food item' })
    async deleteFoodItem(@Param('id') id: number) {
        return this.adminService.deleteFoodItem(id);
    }
}
