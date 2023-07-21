import { Injectable } from '@nestjs/common';
import { CreateGnome, Gnome } from './gnome.interface';

@Injectable()
export class GnomesService {

    private gnomes: Gnome[];

    constructor(){
        this.gnomes = [];
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

    modify(){
        return { message: "Gnome edited" };
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
