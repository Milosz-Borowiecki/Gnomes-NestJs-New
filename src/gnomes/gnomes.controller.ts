import { Controller, Delete, Get, Patch, Post, ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiConsumes } from '@nestjs/swagger';
import { GnomeValidationPipe } from 'src/pipes/gnome.pipe';
import { CreateGnomeDto } from './dtos/create-gnome.dto';
import { GnomesService } from './gnomes.service';

@Controller('gnomes')
export class GnomesController {

    constructor(private gnomesService: GnomesService){}

    
    @Get()
    findById(){
        return this.gnomesService.findById();
    }

    @Get('/all')
    findAll(){
        return this.gnomesService.findAll();
    }

    @Post()
    @ApiConsumes('multipart/form-data')
    create(@Body(new GnomeValidationPipe()) body: CreateGnomeDto){
        return this.gnomesService.create();
    }

    @Patch()
    modify(){
        return this.gnomesService.modify();
    }

    @Delete()
    delete(){
        return this.gnomesService.delete();
    }

}
