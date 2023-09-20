import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsEnum, IsOptional, MaxLength } from "class-validator";
import { Races } from "./races";
import { Type } from "class-transformer";

export class UpdateGnomeDto{

    @ApiProperty({ type: 'string', required: false})
    @IsOptional()
    @IsString()
    @MaxLength(24)
    @Type(() => String)
    name: string;

    @ApiProperty({ type: 'number', required: false})
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    @Type(() => Number)
    age: number;

    @ApiProperty({ type: 'number', required: false})
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(150)
    @Type(() => Number)
    strength: number;

    @ApiProperty(
        {
            enum: ['Sky', 'Rock', 'River','Fire','Forest'],
            required: false
        }
    )
    @IsOptional()
    @IsEnum(Races)
    race: Races;

    @ApiProperty({ type: 'string', format: 'binary',required: false})
    @IsOptional()
    image: Express.Multer.File;

}