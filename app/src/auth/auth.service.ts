import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';
import { scryptSync, timingSafeEqual } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { PayloadData } from './auth.interface';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
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

        const user = await this.userService.findOne(dataUser.username);

        if(user){
            return {
                message: "This nick is already taken."
            }
        }

        let message = await this.userService.create(dataUser);

        return message;
    }

    async login(loginData: PayloadData) : Promise<any>{

        const payload = { sub: loginData.userId , username: loginData.username };

        return this.jwtService.sign(payload);
    }
}
