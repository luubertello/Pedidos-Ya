import { RoleEntity } from "src/entities/role.entity";

export interface PermissionsI {
    name: string;
    role: RoleEntity[]
}