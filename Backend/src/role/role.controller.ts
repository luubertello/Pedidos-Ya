import { Body, Controller, Param, Post, Put, UseGuards, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AssignPermissionsDto, CreateRoleDto } from './role.DTO';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  // Crea un rol
  @UseGuards(AuthGuard)
  @Permissions('roles_create')
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  // Reemplaza los permisos del rol
  @UseGuards(AuthGuard)
  @Permissions('roles_assign_permissions')
  @Put(':name/set-permissions')
  async setPermissions(
    @Param('name') name: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.roleService.setPermissions(name, dto);
  }

  // Agrega permisos al rol
  @UseGuards(AuthGuard)
  @Permissions('roles_assign_permissions')
  @Put(':name/add-permissions') 
  async addPermissions(
    @Param('name') name: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.roleService.addPermissions(name, dto);
  }

  // Busca todos los roles
  @UseGuards(AuthGuard)
  @Get('roles')
    async getRoles(
      @Query('page') page = 1,
      @Query('quantity') quantity = 10,
    ) {
      return this.roleService.getRoles(page, quantity);
    }
}
