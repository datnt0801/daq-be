import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { TableDto } from "./dto/table.dto";
import { JwtAuthGuard } from "src/modules/auth/jwt/jwt.guard";
import { RoleGuard } from "src/shared/guards/role.guards";
import { UserType } from "src/constants/enum.constant";
import { AllowedRoles } from "src/shared/guards/role.guards";
import { StaffDto } from "src/modules/admin/dto/staff.dto";

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Post('table')
    async createTable(@Body() tableDto: TableDto) {
        return this.adminService.createTable(tableDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('table')
    async getTables() {
        return this.adminService.getTables();
    }
    
    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('table/:id')
    async getTable(@Param('id') id: number) {
        return this.adminService.getTable(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Put('table/:id')
    async updateTable(@Param('id') id: number, @Body() tableDto: TableDto) {
        return this.adminService.updateTable(id, tableDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Delete('table/:id')
    async deleteTable(@Param('id') id: number) {
        return this.adminService.deleteTable(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Post('staff')
    async createStaff(@Body() staffDto: StaffDto) {
        return this.adminService.createStaff(staffDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('staff')
    async getStaffs() {
        return this.adminService.getStaffs();
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Get('staff/:id')
    async getStaff(@Param('id') id: number) {
        return this.adminService.getStaff(id);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Put('staff/:id')
    async updateStaff(@Param('id') id: number, @Body() staffDto: StaffDto) {
        return this.adminService.updateStaff(id, staffDto);
    }

    @UseGuards(JwtAuthGuard, RoleGuard)
    @AllowedRoles(UserType.ADMIN)
    @Delete('staff/:id')
    async deleteStaff(@Param('id') id: number) {
        return this.adminService.deleteStaff(id);
    }
}
