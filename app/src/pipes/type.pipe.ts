import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Races } from 'src/gnomes/dtos/races';

@Injectable()
export class TypeValidationPipe implements PipeTransform {

    async transform(value: string) {

        if(value === undefined){
            return value;
        }

        if(value in Races){
            return value;
        }

        throw new BadRequestException('Validation failed');
    }
}
