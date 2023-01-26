import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateGnomeDto } from 'src/gnomes/dtos/create-gnome.dto';

@Injectable()
export class GnomeValidationPipe implements PipeTransform {

    async transform(value: CreateGnomeDto,  { metatype }: ArgumentMetadata) {

        const object = plainToInstance(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed');
        }

        if(value.strength > 100 && value.race !== "rock"){
            throw new BadRequestException('Validation failed');
        }

        return value;
    }
}
