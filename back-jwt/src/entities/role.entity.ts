import { RoleI } from "src/interfaces/role.interface";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Index, Column, ManyToMany, JoinTable, OneToMany  } from "typeorm";
import { PermissionEntity } from "./permission.entity";
import { UserEntity } from "./user.entity";

@Entity('role')
export class RoleEntity extends BaseEntity implements RoleI {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({unique:true})
    @Column()
    name: string;

    @ManyToMany(() => PermissionEntity, permission => permission.role)
    @JoinTable()
    permission: PermissionEntity[];

    @OneToMany(() => UserEntity, user => user.role)
    users: UserEntity[]
}