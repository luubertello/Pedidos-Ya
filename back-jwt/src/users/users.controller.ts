import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { AuthGuard } from '../middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async getUsers(
    @Query('page') page = 1,
    @Query('quantity') quantity = 10,
  ) {
    return this.service.getUsers(page, quantity);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Req() req: RequestWithUser) {
    return {
      email: req.user!.email,
    };
  }

  @Post('login')
  loginUser(@Body() body: LoginDTO) {
    console.log('Login request body:', body);
    return this.service.login(body);
  }

  @Post('register')
  registerUser(@Body() body: RegisterDTO) {
    return this.service.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.service.refreshToken(
      request.headers['refresh-token'] as string,
    );
  }
}

