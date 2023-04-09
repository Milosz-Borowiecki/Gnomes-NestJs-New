import { Injectable } from '@nestjs/common';
import { UserLoggingDto } from 'src/auth/dtos/user-login.dto';
import { randomBytes, scryptSync } from 'crypto';
import { UserRegistrationDto } from 'src/auth/dtos/user-registration.dto';
import { User } from './user.interface';

@Injectable()
export class UserService {

    private users: User[];

    constructor(){
        this.users = [];
    }

    async findOne(username: string) : Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }

    async create(userData: UserRegistrationDto) : Promise<any>{
        if(this.users.find(user => user.username === userData.username) !== undefined){
            return {
                message: "This nick is already taken."
            }
        }

        const salt = randomBytes(16).toString('hex');
        const hashedPassword = `${salt}:${scryptSync(userData.password,salt,64).toString('hex')}`;
        const id: number = this.users.length;

        this.users.push({
            userId: id,
            username: userData.username,
            password: hashedPassword
        });

        return {
            message: "Account created successfully."
        }
    }
}