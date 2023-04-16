import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common"
import * as dotenv from 'dotenv';
import { Request } from "express";

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    private static extractJWT(req: Request): string | null {
        if (
            req.cookies &&
            'cookie-token' in req.cookies
          ) {
            return req.cookies['cookie-token'];
          }
          return null;
      }

    async validate(payload: any){
        return payload;
    }
}