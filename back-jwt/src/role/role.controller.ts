import { Body, Controller, Param, Post, Put, UseGuards, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';
import { AssignPermissionsDto, CreateRoleDto } from './role.DTO';

@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @Permissions('roles_create')
  @Post()
  async create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Permissions('roles_assign_permissions')
  @Put(':name/set-permissions') // Reemplaza los permisos del rol
  async setPermissions(
    @Param('name') name: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.roleService.setPermissions(name, dto);
  }

  @UseGuards(AuthGuard)
  @Permissions('roles_assign_permissions')
  @Put(':name/add-permissions') // Agrega permisos nuevos al rol
  async addPermissions(
    @Param('name') name: string,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.roleService.addPermissions(name, dto);
  }

  @Get('roles')
    async getRoles(
      @Query('page') page = 1,
      @Query('quantity') quantity = 10,
    ) {
      return this.roleService.getRoles(page, quantity);
    }
}
