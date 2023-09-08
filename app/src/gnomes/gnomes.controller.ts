import { Controller, DefaultValuePipe, Delete, Get, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Body, Param, Query, Request, UseGuards } from '@nestjs/common/decorators';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GnomeValidationPipe } from 'src/pipes/gnome.pipe';
import { NumberValidationPipe } from 'src/pipes/number.pipe';
import { TypeValidationPipe } from 'src/pipes/type.pipe';
import { CreateGnomeDto } from './dtos/create-gnome.dto';
import { Races } from './dtos/races';
import { UpdateGnomeDto } from './dtos/update-gnome.dto';
import { GnomesService } from './gnomes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GnomePageDto, GnomePageMetaDto } from './dtos/gnome-page.dto';


@Controller('gnomes')
export class GnomesController {

    constructor(private gnomesService: GnomesService){}

    
    @Get()
    @ApiQuery({name: "id",type: Number,required:false})
    findById(
        @Query('id', ParseIntPipe) id: number
    ){

        const gnome = this.findGnome(id);

        if(!gnome){
            return {
                message: "We couldn't find this gnome"
            }
        }

        return gnome;
    }

    @ApiQuery({name: "page",type: String,required:false})
    @ApiQuery({name: "limit",type: String,required:false})
    @ApiQuery({name: "type",type: String,required:false})
    @Get('/all')
    async findAll(
        @Query('page', new DefaultValuePipe(1),NumberValidationPipe ,ParseIntPipe) page: number,
        @Query('limit', new DefaultValuePipe(10),NumberValidationPipe ,ParseIntPipe) limit: number,
        @Query('type', new TypeValidationPipe) gnomeType? : Races
    ){
        const dataCount = await this.gnomesService.countGnomes(gnomeType);

        const data = await this.gnomesService.findAll((page - 1) * limit,limit,gnomeType);

        const gnomePageMetaDto = new GnomePageMetaDto(page,limit,dataCount)

        return new GnomePageDto(data,gnomePageMetaDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiBody({
        description: 'Create gnome',
        type: CreateGnomeDto,
      })
    async create(
        @Body(new GnomeValidationPipe()) body: CreateGnomeDto,
        @Request() req
    ){
        return this.gnomesService.create(body,await this.userFromRequest(req));
    }

    @UseGuards(JwtAuthGuard)
    @Patch('/:id')
    @ApiBody({
        description: 'Update gnome',
        type: UpdateGnomeDto,
      })
    @ApiParam({name: "id",type: Number,required:true})
    async modify(
        @Param('id',new NumberValidationPipe,ParseIntPipe) id: number,
        @Body(new GnomeValidationPipe()) body: UpdateGnomeDto,
        @Request() req
    ){
        const gnome = await this.findGnome(id);

        if(!gnome){
            return {
                message: "We couldn't find this gnome"
            }
        }

        if(gnome.user.id != this.userFromRequest(req)){
            return {
                message: "You are not the owner of this gnome"
            }
        }

        return this.gnomesService.modify(id,body);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    @ApiParam({name: "id",type: Number,required:true})
    async delete(
        @Param('id',NumberValidationPipe ,ParseIntPipe) id: number,
        @Request() req
    ){
        const gnome = await this.findGnome(id);

        if(!gnome){
            return {
                message: "We couldn't find this gnome"
            }
        }

        if(gnome.user.id != this.userFromRequest(req)){
            return {
                message: "You are not the owner of this gnome"
            }
        }

        return this.gnomesService.delete(id);
    }

    userFromRequest(req:any){
        return req.user["sub"];
    }

    async findGnome(id:number){
        return await this.gnomesService.findById(+id);
    }

}
