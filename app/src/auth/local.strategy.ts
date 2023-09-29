import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { UserLoggingDto } from "./dtos/user-login.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService: AuthService){
        super();
    }

    async validate(username: string,password: string) : Promise<any>{
        const loginData : UserLoggingDto = { username : username , password : password };
        
        const user = this.authService.validateUser(loginData);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }
}