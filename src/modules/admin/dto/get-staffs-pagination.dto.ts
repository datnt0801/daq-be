import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UserStatus, UserType } from "src/constants/enum.constant";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";       

export class GetStaffsPaginationDto extends PaginationDto {
    @ApiPropertyOptional({
        example: 'John Doe',
        description: 'Staff name',
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: UserStatus,
    })
    @IsOptional() 
    @IsEnum(UserStatus)
    status?: UserStatus;

}