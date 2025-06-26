import { BaseEntity } from "typeorm";
import { RoleEntity } from "./role.entity";
export declare class PermissionEntity extends BaseEntity implements PermissionEntity {
    id: number;
    name: string;
    role: RoleEntity[];
}
