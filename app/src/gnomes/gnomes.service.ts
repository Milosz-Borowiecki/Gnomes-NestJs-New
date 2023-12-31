import { Injectable } from '@nestjs/common';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gnome } from './entities/gnome.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Races } from './dtos/races';
import { existsSync, mkdirSync, unlinkSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { CreateGnomeDto } from './dtos/create-gnome.dto';
import * as dotenv from 'dotenv';

dotenv.config();

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
            select: { user: { id: true, username: true }}, 
            where: { id: gnomeId }, 
            relations: ['user']
        });
    }

    async findAll(index: number,limit: number,gnomeType: Races) : Promise<Gnome[]>{

        if(!gnomeType){
            return this.gnomesRepository.find({ 
                select: { user: { id: true, username: true }},
                relations: ['user'],
                take: limit,
                skip: index
            });
        }

        return this.gnomesRepository.find({ 
            select: { user: { id: true, username: true }},
            relations: ['user'],
            where: { race: gnomeType },
            take: limit,
            skip: index
        });
    }

    async create(body: CreateGnomeDto,userId: number) : Promise<Gnome>{

        const gnome: Gnome = Object.assign(new Gnome(),body);

        const user = await this.usersRepository.findOne({ 
            where: { id: userId }, 
            relations: ['gnomes']
        });
    
        const newGnome = await this.gnomesRepository.save(gnome)

        user.gnomes.push(newGnome)

        await this.usersRepository.save(user);

        return newGnome;
    }

    async modify(gnomeId: number,body: UpdateGnomeDto) : Promise<Gnome>{

        const oldGnome = await this.gnomesRepository.findOne({ 
            where: { id: gnomeId } 
        });

        if(!oldGnome){
            return;
        }

        const newGnome = await this.assignDefined(oldGnome,body);

        if(newGnome.race !== Races.Rock && newGnome.strength > 100){
            return;
        }

        return await this.gnomesRepository.save(newGnome);
    }

    async delete(gnomeId:number) : Promise<void>{
        await this.gnomesRepository.delete(gnomeId);
    }

    async countGnomes(gnomeType: Races){

        if(!gnomeType){
            return await this.gnomesRepository.count();
        }

        return await this.gnomesRepository.count({
            where: { race: gnomeType }
        });
    }

    async getGnomeImage(gnomeId:number,userId:number){
        const extensions = ['jpg','jpeg','png','gif'];
        const path = `${process.env.UPLOAD_TEMP_DIR}/${userId}/${gnomeId}`;

        for(const extension of extensions){
            if(existsSync(`${path}.${extension}`) === true){
                return `localhost:3000/images?userId=${userId}&fileName=${gnomeId}.${extension}`;
            }
        }

        return undefined;
    }

    async saveGnomeImage(file: Express.Multer.File,gnomeId: number,userId:number){

        file.originalname = `${gnomeId}${extname(file.originalname)}`;

        const uploadPath = process.env.UPLOAD_TEMP_DIR + "/" + userId;
        
        if(!existsSync(uploadPath)){
            mkdirSync(uploadPath);
        }
        
        writeFileSync(`${uploadPath}/${file.originalname}`,file.buffer);
    }

    async deleteGnomeImage(gnomeId: number,userId:number){
        const extensions = ['jpg','jpeg','png','gif'];
        const path = `${process.env.UPLOAD_TEMP_DIR}/${userId}/${gnomeId}`;

        for(const extension of extensions){
            if(existsSync(`${path}.${extension}`) === true){
                unlinkSync(`${path}.${extension}`);
                break;
            }
        }
    }

    async assignDefined(target:Gnome,...sources) {
        for (const source of sources) {
            for (const key of Object.keys(source)) {
                const val = source[key];
                if (val !== undefined && val !== '') {
                    target[key] = val;
                }
            }
        }
        return target;
    }
}