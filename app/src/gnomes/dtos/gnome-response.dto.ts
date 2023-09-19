import { ApiProperty } from "@nestjs/swagger";
import { Gnome } from "../entities/gnome.entity";


export class GnomeResponse {
    
    @ApiProperty()
    readonly gnome: Gnome;
  
    @ApiProperty()
    readonly image: string;
  
    constructor(gnome: Gnome,meta:string) {
      this.gnome = gnome;
      this.image = meta;
    }
}