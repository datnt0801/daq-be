import { AllowedRoles } from 'src/shared/guards/role.guards';
import { Controller, Get, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/shared/guards/role.guards';
import { UserType } from 'src/constants/enum.constant';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard )
    // @AllowedRoles(UserType.USER)
    @ApiOperation({ summary: 'Get buffets' })
    @Get('/buffets')
    async getBuffets() {
        return this.userService.getBuffets();
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard )
    // @AllowedRoles(UserType.USER)
    @ApiOperation({ summary: 'Get buffet items' })
    @Get('/buffet-items')
    async getBuffetItems() {
        return this.userService.getBuffetItems();
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard )
    // @AllowedRoles(UserType.USER)
    @ApiOperation({ summary: 'Get sets' })
    @Get('/sets')
    async getSets() {
        return this.userService.getSets();
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard, RoleGuard )
    // @AllowedRoles(UserType.USER)
    @ApiOperation({ summary: 'Get set items' })
    @Get('/set-items')
    async getSetItems() {
        return this.userService.getSetItems();
    }
}
