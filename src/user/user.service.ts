import { Injectable } from '@nestjs/common';

export type User = {
    userId: number,
    username: string,
    password: string
}

@Injectable()
export class UserService {

    private users: User[];

    constructor(){
        this.users = [];
    }

    async findOne(username: string) : Promise<User | undefined>{
        return this.users.find(user => user.username === username);
    }

    async create(userData) : Promise<any>{

        var id: number = this.users.length;

        this.users.push({
            userId: id,
            username: userData.username,
            password: userData.password
        });

        return true;

    }

}
