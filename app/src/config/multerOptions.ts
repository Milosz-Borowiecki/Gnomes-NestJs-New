import { HttpException, HttpStatus } from "@nestjs/common";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import { Request } from "express";
import { extname } from "node:path/win32";

export const multerOptions: MulterOptions = {
    limits: {
        fileSize: +process.env.MAX_FILE_SIZE || 10485760,
    },
    fileFilter(
        req: Request,
        file: Express.Multer.File,
        done: (error: Error, acceptFile: boolean) => void,
    ){
        if(file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
            done(null,true);
        } else {
            done(
                new HttpException(
                    `Unsupported file type ${extname(file.originalname)}`,
                    HttpStatus.BAD_REQUEST,
                ),
                false,
            );
        }
    }
}