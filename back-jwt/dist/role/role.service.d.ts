import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { AssignPermissionsDto, CreateRoleDto } from './role.DTO';
export declare class RoleService {
    private roleRepo;
    private readonly permissionService;
    constructor(roleRepo: Repository<RoleEntity>, permissionService: PermissionService);
    create(dto: CreateRoleDto): Promise<RoleEntity>;
    findByName(name: string): Promise<RoleEntity>;
    addPermissions(roleName: string, dto: AssignPermissionsDto): Promise<RoleEntity>;
    setPermissions(roleName: string, dto: AssignPermissionsDto): Promise<RoleEntity>;
    hasPermission(role: RoleEntity, permission: string): boolean;
    findAll(): Promise<RoleEntity[]>;
    getRoles(page?: number, quantity?: number): Promise<{
        data: RoleEntity[];
        total: number;
        page: number;
        quantity: number;
    }>;
}
