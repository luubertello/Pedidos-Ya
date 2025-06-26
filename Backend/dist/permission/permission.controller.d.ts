import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './permission.DTO';
export declare class PermissionsController {
    private permissionService;
    constructor(permissionService: PermissionService);
    createPermission(name: CreatePermissionDto): Promise<import("../entities/permission.entity").PermissionEntity>;
}
