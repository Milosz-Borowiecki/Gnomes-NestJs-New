import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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
    create(){
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
