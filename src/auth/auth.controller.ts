import { Body, Controller, Post, Request, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody } from '@nestjs/swagger';
import { UserRegistrationDto } from './dtos/user-registration.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('login')
    async login(@Request() req){
        return this.authService.login();
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
