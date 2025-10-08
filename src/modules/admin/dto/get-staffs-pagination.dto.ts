import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "src/shared/dto/pagination.dto";
import { UserType } from "src/constants/enum.constant";

export class GetStaffsPaginationDto extends PaginationDto {
    @ApiPropertyOptional({
        example: 'John Doe',
        description: 'Staff name',
    })
    name?: string;

    @ApiPropertyOptional({
        example: 1,
        description: 'Staff id',
    })
    id?: number;

    @ApiPropertyOptional({
        example: 'john.doe@example.com',
        description: 'Staff email',
    })
    email?: string;

}