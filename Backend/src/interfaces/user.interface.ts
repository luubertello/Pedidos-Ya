import { PermissionEntity } from "src/entities/permission.entity";
import { RoleEntity } from "src/entities/role.entity";

export interface UserI {
  email: string;
  password: string;
  role: RoleEntity
}
