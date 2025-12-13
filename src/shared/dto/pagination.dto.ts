import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsNumber, Min } from 'class-validator';
import { SortOrder } from 'src/constants/enum.constant';

export class PaginationDto {
  @Expose()
  @ApiPropertyOptional({
    example: 1,
    required: false,
  })
  @IsNumber()
  @Min(1)
  @Transform(({ value }) => Number.parseInt(value, 10))
  page?: number = 1;

  @Expose()
  @ApiPropertyOptional({
    example: 10,
    required: false,
  })
  @IsNumber()
  @Min(10)
  @Transform(({ value }) => Number.parseInt(value, 10))
  size?: number = 10;

  @ApiPropertyOptional({
    example: 'DESC',
    required: false,
  })
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;

  get limit() {
    return this.size || 10;
  }

  get offset() {
    return this.page ? (this.page - 1) * this.limit : 0;
  }
}
