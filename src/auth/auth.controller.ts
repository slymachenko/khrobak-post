import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res() res: Response) {
    const { access_token } = await this.authService.signup(dto);

    res.cookie('jwt', access_token, { httpOnly: true });

    res.redirect('/');
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(dto);

    res.cookie('jwt', access_token, { httpOnly: true });

    res.redirect('/');
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');

    res.redirect('/');
  }
}
