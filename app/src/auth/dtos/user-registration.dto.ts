import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserRegistrationDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @MaxLength(24)
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(250)
    @IsNotEmpty()
    password: string;
}