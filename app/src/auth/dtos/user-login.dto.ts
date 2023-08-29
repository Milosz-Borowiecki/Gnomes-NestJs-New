import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoggingDto {

    @ApiProperty()
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;
}