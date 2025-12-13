import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSetDto {
 @ApiProperty()
 @IsNotEmpty()
 @IsString()
 name: string;

 @ApiProperty()
 @IsNotEmpty()
 @IsNumber()
 price: number;

 @ApiProperty()
 @IsOptional()
 @IsString()
 description?: string;

 @ApiProperty()
 @IsOptional()
 @IsString()
 image?: string;
}