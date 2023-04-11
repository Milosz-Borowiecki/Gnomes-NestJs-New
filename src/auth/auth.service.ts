import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';
import { scryptSync, timingSafeEqual } from 'crypto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async validateUser(loginData : UserLoggingDto) : Promise<any>{
        const user = await this.userService.findOne(loginData.username);

        if(user !== undefined){
            const [salt, key] = user.password.split(':');
            const hashedBuffer = scryptSync(loginData.password,salt,64);

            const keyBuffer = Buffer.from(key,'hex');
            const match = timingSafeEqual(hashedBuffer,keyBuffer);

            if (user && match) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async register(dataUser: UserRegistrationDto) : Promise<any>{

        let message = await this.userService.create(dataUser);

        return message;
    }

    async login(loginData: UserLoggingDto) : Promise<any>{

        let user = await this.userService.findOne(loginData.username);

        if(user === undefined){
            return {
                message: "We can't find this user. Please try again."
            }
        }

        return user;
    }
}
