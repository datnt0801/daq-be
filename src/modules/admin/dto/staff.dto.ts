import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UserType } from "src/constants/enum.constant";

export class StaffDto {
    @ApiProperty(
        {
            example: 'John Doe',
            description: 'Staff name',
        }
    )
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty(
        {
            example: 'john.doe@example.com',
            description: 'Staff email',
        }
    )
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    email: string;

    @ApiProperty(
        {
            enum: UserType,
            default: UserType.STAFF,
        }
    )
    @IsNotEmpty()
    @IsString()
    @IsEnum(UserType)
    @IsOptional()
    userType: UserType;
}
