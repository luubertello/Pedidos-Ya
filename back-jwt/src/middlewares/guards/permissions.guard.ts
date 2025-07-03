import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import axios from 'axios';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new ForbiddenException('Token no enviado');
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/can-do',
        {
          permissions: requiredPermissions,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.data.allowed === true) {
        return true;
      } else {
        throw new ForbiddenException('Permiso denegado');
      }
    } catch (err) {
      throw new ForbiddenException('Error verificando permisos');
    }
  }
}
