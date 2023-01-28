import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { ApiBody } from '@nestjs/swagger';
import { GnomeValidationPipe } from 'src/pipes/gnome.pipe';
import { CreateGnomeDto } from './dtos/create-gnome.dto';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
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
    @ApiBody({
        description: 'Create gnome',
        type: CreateGnomeDto,
      })
    create(@Body(new GnomeValidationPipe()) body: CreateGnomeDto){
        return this.gnomesService.create();
    }

    @Patch()
    @ApiBody({
        description: 'Update gnome',
        type: UpdateGnomeDto,
      })
    modify(@Body(new GnomeValidationPipe()) body: UpdateGnomeDto){
        return this.gnomesService.modify();
    }

    @Delete()
    delete(){
        return this.gnomesService.delete();
    }

}
