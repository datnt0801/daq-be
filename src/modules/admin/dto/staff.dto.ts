import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
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
    name: string;

    @ApiProperty(
        {
            example: 'john.doe@example.com',
            description: 'Staff email',
        }
    )
    @IsNotEmpty()
    @IsString()
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
    userType: UserType;
}
