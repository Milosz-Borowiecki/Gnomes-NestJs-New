import { Body, Controller, Post, ValidationPipe, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        description: 'Login the user',
        type: UserLoggingDto,
      })
    async login(@Body(new ValidationPipe()) body: UserLoggingDto,
                @Req() req,
                @Res({ passthrough: true }) res: Response){
        const token = await this.authService.login(req.user);
        res.cookie('cookie-token',token,{ httpOnly: true });
    }

    @Post('register')
    @ApiBody({
        description: 'Registers the user',
        type: UserRegistrationDto,
      })
    async register(@Body(new ValidationPipe()) body: UserRegistrationDto){
        return this.authService.register(body);
    }
}
