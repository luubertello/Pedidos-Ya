import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(body: RegisterDTO) {
    try {
      const user = this.repository.create(body);
      user.password = hashSync(user.password, 10);
      await this.repository.save(user);
      return { status: 'created' };
    } catch (error) {
      console.error('Error en register:', error);
      throw new HttpException('Error de creación', 500);
    }
  }

  async login(body: LoginDTO) {
    const user = await this.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    const match = compareSync(body.password, user.password);
    if (!match) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    return {
      accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
      refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
    };
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }
    return user;
  }

  async canDo(user: UserI, permission: string): Promise<boolean> {
  const hasPermission = user.permissionCodes?.includes(permission);
  if (!hasPermission) {
    throw new UnauthorizedException('No tiene permiso para realizar esta acción');
  }
  return true;
}

async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
  try {
    const payload = this.jwtService.getPayload(refreshToken, 'refresh');
    const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
    return {
      accessToken: this.jwtService.generateToken({ email: payload.email }, 'auth'),
      refreshToken: timeToExpire < 20
        ? this.jwtService.generateToken({ email: payload.email }, 'refresh')
        : refreshToken,
    };
  } catch (error) {
    throw new UnauthorizedException('Token inválido o expirado');
  }
}

async getUsers(page = 1, quantity = 10) {
  const pageNum = Number(page) || 1;
  const qty = Number(quantity) || 10;
  const skip = (pageNum - 1) * qty;
  const take = qty;

  const [users, total] = await this.repository.findAndCount({
    skip,
    take,
  });

  return {
    data: users,
    total,
    page: pageNum,
    quantity: qty,
  };
}
}


