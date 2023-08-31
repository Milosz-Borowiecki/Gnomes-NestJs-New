import { Injectable } from '@nestjs/common';
import { CreateGnomeInterface } from './gnome.interface';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gnome } from './entities/gnome.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GnomesService {

    constructor(
        @InjectRepository(Gnome)
        private gnomesRepository: Repository<Gnome>
    ){}

    findById(gnomeId: number) : Promise<Gnome | null>{
        return this.gnomesRepository.findOneBy({id:gnomeId});
    }

    findAll() : Promise<Gnome[]>{
        return this.gnomesRepository.find();
    }

    create(body: CreateGnomeInterface,userId: number) : Promise<Gnome>{
    
        const gnome = Object.assign(new Gnome(),body);
    
        gnome.author_id = userId;

        return this.gnomesRepository.save(gnome);
    }

    modify(gnomeId: number,body: UpdateGnomeDto) : Promise<Gnome>{

        const gnome = Object.assign(new Gnome(),body);
    
        gnome.id = gnomeId;

        return this.gnomesRepository.save(gnome);
    }

    async delete(gnomeId:number) : Promise<void>{
        await this.gnomesRepository.delete(gnomeId);
    }
}