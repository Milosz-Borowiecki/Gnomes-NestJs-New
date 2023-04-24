import { Injectable } from '@nestjs/common';
import { Gnome } from './gnome.interface';

@Injectable()
export class GnomesService {

    private gnomes: Gnome[];

    constructor(){
        this.gnomes = [];
    }

    findById(){
        return { message: "Get gnome" };
    }

    findAll(){
        return { message: "All gnomes" };
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
