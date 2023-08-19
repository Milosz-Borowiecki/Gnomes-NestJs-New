import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsEnum, IsOptional } from "class-validator";
import { Races } from "./races";

export class UpdateGnomeDto{

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    age: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(150)
    strength: number;

    @ApiProperty(
        {
            enum: ['Sky', 'Rock', 'River','Fire','Forest']
        }
    )
    @IsOptional()
    @IsEnum(Races)
    race: Races;

}