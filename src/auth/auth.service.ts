import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ){}

    async register() : Promise<any>{
        return {
            message: "Account created successfully"
        }
    }

    async login() : Promise<any>{
        return {
            message: "Successful login"
        }
    }
}
