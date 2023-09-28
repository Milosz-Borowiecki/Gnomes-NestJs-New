import { Controller, Get, ParseIntPipe, Query, Res } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('images')
export class ImagesController {

    constructor(){}

    @Get()
    @ApiQuery({name: "userId",type: Number,required:true})
    @ApiQuery({name: "fileName",type: String,required:true})
    async findById(
        @Query('userId', ParseIntPipe) userId: number,
        @Query('fileName') fileName: string,
        @Res() res: Response    
    ){
        const file = res.sendFile(fileName,{
            root: `$localhost:3000/images/${userId}/`
        });

        return file;
    }

}
