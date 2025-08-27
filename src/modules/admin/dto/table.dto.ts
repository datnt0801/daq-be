import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEnum } from "class-validator";
import { TableStatus } from "src/constants/enum.constant";

export class TableDto {
    @ApiProperty({
        example: 'Table 1',
        description: 'Table name',
    })
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({
        enum: TableStatus,
        example: TableStatus.AVAILABLE,
        description: 'Table status',
        default: TableStatus.AVAILABLE,
    })
    @IsNotEmpty()
    @IsEnum(TableStatus)
    status: TableStatus;
    
}