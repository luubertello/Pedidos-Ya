import { PermissionEntity } from "src/entities/permission.entity";

export interface RoleI {
    name: string;
    permission: PermissionEntity[]
}