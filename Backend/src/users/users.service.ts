import { Injectable, HttpException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserEntity } from '../entities/user.entity';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService } from 'src/jwt/jwt.service';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { permisosPorRol } from 'src/role/role.permissions';
import { RoleEntity } from 'src/entities/role.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  async register(body: RegisterDTO) {
    try {
      const existingEmail = await this.repository.findOne({ where: { email: body.email } });
      if (existingEmail) {
        throw new HttpException('El email ya está registrado', 409);
      }

      // Buscamos el rol para saber su nombre y permisos
      const role = await this.roleRepository.findOne({ where: { id: body.roleId } });
      if (!role) {
        throw new HttpException('Rol inválido', 400);
      }

      const permisosAsignados = permisosPorRol[role.name] || [];

      const user = this.repository.create({
        email: body.email,
        password: hashSync(body.password, 10),
        role: role,
        permissions: permisosAsignados,  // asignamos permisos aquí
      });

      await this.repository.save(user);
      return { status: 'created' };
    } catch (error) {
      console.error('Error en register:', error);
      throw error instanceof HttpException
        ? error
        : new HttpException('Error de creación', 500);
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

