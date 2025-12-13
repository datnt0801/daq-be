import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateBuffetItemDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    buffetId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    foodItemId: number;
}
