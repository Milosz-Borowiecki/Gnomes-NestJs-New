import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsEnum } from "class-validator";
import { Races } from "./races";

export class UpdateGnomeDto {

    @ApiProperty()
    @IsNumber()
    @Min(1)
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(100)
    age: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(150)
    strength: number;

    @ApiProperty(
        {
            enum: ['Sky', 'Rock', 'River','Fire','Forest']
        }
    )
    @IsEnum(Races)
    race: Races;

}