import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { TableStatus, SortOrder } from 'src/constants/enum.constant';

export class GetTablesPaginationDto extends PaginationDto {

    @ApiPropertyOptional({
        example: 1,
        description: 'Table id',
    })
    @IsOptional()
    @IsNumber()
    id?: number;

    @ApiPropertyOptional({
        example: 'Table 1',
        description: 'Table name',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        example: 'available',
        description: 'Table status',
    })
    @IsOptional()
    @IsString()
    @IsEnum(TableStatus)
    status?: TableStatus;

    @ApiPropertyOptional({
        example: 6,
        description: 'Table capacity',
    })
    @IsOptional()
    @IsNumber()
    capacity?: number;

    @ApiPropertyOptional({
        example: 1,
        description: 'Table floor',
    })
    @IsOptional()
    @IsNumber()
    floor?: number;
}
