import { Injectable } from '@nestjs/common';
import { CreateGnome, Gnome } from './gnome.interface';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { Races } from './dtos/races';

@Injectable()
export class GnomesService {

    private gnomes: Gnome[];

    constructor(){
        this.gnomes = [
            {
                gnomeId: 1,
                authorId: 0,
                name: "string",
                age: 10,
                strength: 30,
                race: Races.Sky
            }
        ];
    }

    findById(gnomeId: number){
        return this.gnomes.find(gnome => gnome.gnomeId === gnomeId);
    }

    findAll(){
        return this.gnomes;
    }

    create(body: CreateGnome,userId: number){

        let gnome: Gnome = { gnomeId: this.length() + 1, authorId: userId ,...body};

        this.gnomes.push(gnome);

        return { message: "Create gnome" };
    }

    modify(gnomeId: number,body: UpdateGnomeDto){

        const gnomeIndex = this.gnomes.findIndex(gnome => gnome.gnomeId === gnomeId);

        this.gnomes[gnomeIndex] = Object.assign(this.gnomes[gnomeIndex],body);

        return { message: "Gnome edited" , gnome: JSON.stringify(this.gnomes[gnomeIndex])};
    }

    delete(gnomeId:number){

        const gnomeIndex = this.gnomes.findIndex(gnome => gnome.gnomeId === gnomeId);

        const length = this.length();

        if(length > 1){
            this.gnomes[gnomeIndex] = this.gnomes[length-1];
            this.gnomes.pop();
            return { message: "Gnome deleted" }
        }

        if(length === 1){
            this.gnomes.pop();
            return { message: "Gnome deleted" }
        }
    }

    length(){
        return this.gnomes.length;
    }

}
