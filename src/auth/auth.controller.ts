import { Body, Controller, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({
        description: 'Registers the user',
        type: UserLoggingDto,
      })
    async login(@Body(new ValidationPipe()) body: UserLoggingDto){
        return this.authService.login(body);
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
