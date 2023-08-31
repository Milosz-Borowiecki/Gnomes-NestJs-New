import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync } from 'crypto';
import { UserRegistrationDto } from 'src/auth/dtos/user-registration.dto';
import { UserInterface } from './user.interface';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async findOne(p_username: string) : Promise<User | undefined>{
        return this.usersRepository.findOneBy({username:p_username});
    }

    async create(userData: UserRegistrationDto) : Promise<any>{
        
        const salt = randomBytes(16).toString('hex');
        userData.password = `${salt}:${scryptSync(userData.password,salt,64).toString('hex')}`;
        const user = Object.assign(new User(),userData);

        this.usersRepository.save(user);

        return {
            message: "Account created successfully."
        }
    }
}