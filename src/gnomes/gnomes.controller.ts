import { Controller, DefaultValuePipe, Delete, Get, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Body, Query, Request, UseGuards } from '@nestjs/common/decorators';
import { ApiBody, ApiQuery } from '@nestjs/swagger';
import { GnomeValidationPipe } from 'src/pipes/gnome.pipe';
import { NumberValidationPipe } from 'src/pipes/number.pipe';
import { TypeValidationPipe } from 'src/pipes/type.pipe';
import { CreateGnomeDto } from './dtos/create-gnome.dto';
import { Races } from './dtos/races';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { GnomesService } from './gnomes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('gnomes')
export class GnomesController {

    constructor(private gnomesService: GnomesService){}

    
    @Get()
    @ApiQuery({name: "id",type: Number,required:false})
    findById(
        @Query('id', ParseIntPipe) id: number
    ){
        return this.gnomesService.findById(id);
    }

    @ApiQuery({name: "page",type: String,required:false})
    @ApiQuery({name: "limit",type: String,required:false})
    @ApiQuery({name: "type",type: String,required:false})
    @Get('/all')
    findAll(
        @Query('page', new DefaultValuePipe(1),NumberValidationPipe ,ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(2),NumberValidationPipe ,ParseIntPipe) limit: number,
        @Query('type', new TypeValidationPipe()) gnomeType? : Races
    ){
        return this.gnomesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({
        description: 'Create gnome',
        type: CreateGnomeDto,
      })
    create(@Body(new GnomeValidationPipe()) body: CreateGnomeDto){
        return this.gnomesService.create();
    }

    @UseGuards(JwtAuthGuard)
    @Patch()
    @ApiBody({
        description: 'Update gnome',
        type: UpdateGnomeDto,
      })
    modify(@Body(new GnomeValidationPipe()) body: UpdateGnomeDto){
        return this.gnomesService.modify();
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    @ApiQuery({name: "id",type: Number,required:false})
    delete(
        @Query('id',NumberValidationPipe ,ParseIntPipe) id: number
    ){
        return this.gnomesService.delete();
    }

}
