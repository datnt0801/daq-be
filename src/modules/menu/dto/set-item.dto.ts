import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateSetItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    setId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    foodItemId: number;
}
