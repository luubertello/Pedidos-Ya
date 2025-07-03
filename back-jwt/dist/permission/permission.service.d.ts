import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './permission.DTO';
export declare class PermissionService {
    private repository;
    constructor(repository: Repository<PermissionEntity>);
    findPermissionsByNames(permissionNames: string[]): Promise<PermissionEntity[]>;
    createPermission(permission: CreatePermissionDto): Promise<PermissionEntity>;
}
