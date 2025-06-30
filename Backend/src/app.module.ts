import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Menu } from './entities/menu.entity';
import { RestaurantController } from './restaurant/restaurant.controller';
import { MenuController } from './menu/menu.controller';
import { Address } from './entities/adress.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionsController } from './permission/permission.controller';
import { RolesController } from './role/role.controller';
import { UsersController } from './users/users.controller';
import { AuthGuard } from './middlewares/auth.middleware';
import { JwtService } from './jwt/jwt.service';
import { UsersService } from './users/users.service';
import { PermissionService } from './permission/permission.service';
import { RoleService } from './role/role.service';
import { UserEntity } from './entities/user.entity';
import { RestaurantService } from './restaurant/restaurant.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433, // el puerto correcto
      username: 'postgres',
      password: '1234',
      database: 'pedidosya',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // carga automática de entidades
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Restaurant, Menu, Address, PermissionEntity, RoleEntity, UserEntity]),
  ],
  controllers: [RestaurantController, MenuController, PermissionsController, RolesController, UsersController],
  providers: [AuthGuard, JwtService, UsersService, PermissionService, RoleService, RestaurantService]
})
export class AppModule {}
