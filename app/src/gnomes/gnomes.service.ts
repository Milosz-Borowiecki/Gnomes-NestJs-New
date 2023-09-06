import { Injectable } from '@nestjs/common';
import { CreateGnomeInterface } from './gnome.interface';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gnome } from './entities/gnome.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GnomesService {

    constructor(
        @InjectRepository(Gnome)
        private gnomesRepository: Repository<Gnome>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ){}

    async findById(gnomeId: number) : Promise<Gnome | null>{
        return this.gnomesRepository.findOne({
            select: { user: { username: true }}, 
            where: { id: gnomeId }, 
            relations: ['user']
        });
    }

    async findAll() : Promise<Gnome[]>{
        return this.gnomesRepository.find({ 
            select: { user: { username: true }},
            relations: ['user']
        });
    }

    async create(body: CreateGnomeInterface,userId: number) : Promise<Gnome>{

        const gnome = Object.assign(new Gnome(),body);

        const user = await this.usersRepository.findOne({ 
            where: { id: userId }, 
            relations: ['gnomes']
        });
    
        const newGnome = await this.gnomesRepository.save(gnome)

        user.gnomes.push(gnome)

        await this.usersRepository.save(user);

        return newGnome;
    }

    async modify(gnomeId: number,body: UpdateGnomeDto) : Promise<Gnome>{

        const gnome = Object.assign(new Gnome(),body);

        const isExist = await this.gnomesRepository.exist({ 
            where: { id: gnomeId } 
        });

        if(!isExist){
            return;
        }
    
        gnome.id = gnomeId;

        return this.gnomesRepository.save(gnome);
    }

    async delete(gnomeId:number) : Promise<void>{
        await this.gnomesRepository.delete(gnomeId);
    }
}