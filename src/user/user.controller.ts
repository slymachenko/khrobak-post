import { Body, Controller, Get, Patch, Res, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch('me')
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
    @Res() res: Response,
  ) {
    this.userService.editUser(userId, dto);

    res.redirect('/profile');
  }
}
