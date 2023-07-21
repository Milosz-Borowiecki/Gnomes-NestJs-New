import { Injectable } from '@nestjs/common';
import { Gnome } from './gnome.interface';

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

    create(){
        return { message: "Create gnome" };
    }

    modify(){
        return { message: "Gnome edited" };
    }

    delete(){
        return { message: "Gnome deleted" };
    }

}
