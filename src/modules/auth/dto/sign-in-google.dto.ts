import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInGoogleDto {
    @ApiProperty({
        example:'idtoken'})
    @IsNotEmpty()
    @IsString()
    credential: string;
}   
    