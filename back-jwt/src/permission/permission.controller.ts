import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { Permissions } from 'src/middlewares/decorators/permissions.decorator'; 
import { CreatePermissionDto } from './permission.DTO';

@Controller('permissions')
export class PermissionsController {
constructor(private permissionService: PermissionService) {}

  @UseGuards(AuthGuard)
  @Permissions('create-permission')
  @Post()
  async createPermission(@Body() name: CreatePermissionDto) {
    return await this.permissionService.createPermission(name)
  }


}
