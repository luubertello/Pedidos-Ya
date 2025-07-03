import { RoleService } from './role.service';
import { AssignPermissionsDto, CreateRoleDto } from './role.DTO';
export declare class RolesController {
    private readonly roleService;
    constructor(roleService: RoleService);
    create(dto: CreateRoleDto): Promise<import("../entities/role.entity").RoleEntity>;
    setPermissions(name: string, dto: AssignPermissionsDto): Promise<import("../entities/role.entity").RoleEntity>;
    addPermissions(name: string, dto: AssignPermissionsDto): Promise<import("../entities/role.entity").RoleEntity>;
    getRoles(page?: number, quantity?: number): Promise<{
        data: import("../entities/role.entity").RoleEntity[];
        total: number;
        page: number;
        quantity: number;
    }>;
}
