import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetFoodItemsPaginationDto extends PaginationDto {
  @ApiProperty({
    description: 'Food item id'
  })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    description: 'Food item name',
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'Food category id',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  foodCategoryId?: number;
}
