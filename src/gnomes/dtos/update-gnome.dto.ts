import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsEnum } from "class-validator";
import { CreateGnomeDto } from "./create-gnome.dto";
import { Races } from "./races";

export class UpdateGnomeDto extends CreateGnomeDto{

    @ApiProperty()
    @IsNumber()
    @Min(1)
    id: number;

}