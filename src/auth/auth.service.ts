import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async register(dataUser: UserRegistrationDto) : Promise<any>{

        let message = await this.userService.create(dataUser);

        return message;
    }

    async login(loginData: UserLoggingDto) : Promise<any>{

        let user = await this.userService.findOne(loginData);

        if(user === undefined){
            return {
                message: "We can't find this user. Please try again."
            }
        }

        return user;
    }
}
