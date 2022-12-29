import { Injectable } from '@nestjs/common';

@Injectable()
export class GnomesService {

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
