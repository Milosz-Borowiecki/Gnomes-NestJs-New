import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsEnum, MaxLength } from "class-validator";
import { Races } from "./races";
import { Type } from "class-transformer";

export class CreateGnomeDto {

    @ApiProperty({ type: 'string'})
    @IsString()
    @MaxLength(24)
    @Type(() => String)
    name: string;

    @ApiProperty({ type: 'number'})
    @IsNumber()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    age: number;

    @ApiProperty({ type: 'number'})
    @IsNumber()
    @Min(0)
    @Max(150)
    @Type(() => Number)
    strength: number;

    @ApiProperty(
        {
            enum: ['Sky', 'Rock', 'River','Fire','Forest']
        }
    )
    @IsEnum(Races)
    race: Races;

    @ApiProperty({ type: 'string', format: 'binary'})
    image: Express.Multer.File;
}