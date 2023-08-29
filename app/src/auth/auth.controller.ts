import { Body, Controller, Post, ValidationPipe, UseGuards, Res, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { UserRegistrationDto } from './dtos/user-registration.dto';
import { UserLoggingDto } from './dtos/user-login.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Response, Request } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    @ApiBody({
      description: 'Logout the user'
    })
    @ApiCookieAuth('cookie-token')
    async logout(
      @Req() req: Request,
      @Res({ passthrough: true })res: Response){
      res.cookie('cookie-token', '', { expires: new Date(), httpOnly: true });
      return {
        message: "You have been logged out."
      }
    }
}
