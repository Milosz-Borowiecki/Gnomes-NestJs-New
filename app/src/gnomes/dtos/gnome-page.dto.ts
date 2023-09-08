import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { Gnome } from "../entities/gnome.entity";

export class GnomePageMetaDto {
    @ApiProperty()
    readonly page: number;
  
    @ApiProperty()
    readonly limit: number;
  
    @ApiProperty()
    readonly dataCount: number;
  
    @ApiProperty()
    readonly pageCount: number;
  
    @ApiProperty()
    readonly hasPreviousPage: boolean;
  
    @ApiProperty()
    readonly hasNextPage: boolean;
  
    constructor(page, limit, dataCount) {
      this.page = page;
      this.limit = limit;
      this.dataCount = dataCount;
      this.pageCount = Math.ceil(this.dataCount / this.limit);
      this.hasPreviousPage = this.page > 1;
      this.hasNextPage = this.page < this.pageCount;
    }
}

  export class GnomePageDto {
    @IsArray()
    @ApiProperty({ isArray: true })
    readonly data: Gnome[];
  
    @ApiProperty({ type: () => GnomePageMetaDto })
    readonly meta: GnomePageMetaDto;
  
    constructor(data: Gnome[], meta: GnomePageMetaDto) {
      this.data = data;
      this.meta = meta;
    }
}