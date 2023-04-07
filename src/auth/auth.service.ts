import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserRegistrationDto } from './dtos/user-registration.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async register(dataUser: UserRegistrationDto) : Promise<any>{

        var message = await this.userService.create(dataUser);

        return message;
    }

    async login() : Promise<any>{
        return {
            message: "Successful login"
        }
    }
}
