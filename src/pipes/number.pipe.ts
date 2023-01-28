import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class NumberValidationPipe implements PipeTransform {

    async transform(value: number) {

        if(value == 0){
            throw new BadRequestException('Validation failed: value must not be equal 0');
        }

        if(value >= 0){
            value = (-1) * value;
        }
        
        return value;
    }
}
