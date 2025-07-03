import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionService } from 'src/permission/permission.service';
import { AssignPermissionsDto, CreateRoleDto } from './role.DTO';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private roleRepo: Repository<RoleEntity>,
    private readonly permissionService: PermissionService,
  ) {}

  async create(dto: CreateRoleDto): Promise<RoleEntity> {
    const exists = await this.roleRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('El rol ya existe');

    const role = this.roleRepo.create({ name: dto.name });
    return this.roleRepo.save(role);
  }

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.roleRepo.findOne({
      where: { name },
      relations: ['permission'], // importante
    });
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }

  async addPermissions(roleName: string, dto: AssignPermissionsDto): Promise<RoleEntity> {
    const role = await this.findByName(roleName);
    const newPermissions = await this.permissionService.findPermissionsByNames(dto.permissions);

    const current = role.permission.map(p => p.name);
    const filtered = newPermissions.filter(p => !current.includes(p.name));

    role.permission = [...role.permission, ...filtered];
    return this.roleRepo.save(role);
  }

  async setPermissions(roleName: string, dto: AssignPermissionsDto): Promise<RoleEntity> {
    const role = await this.findByName(roleName);
    const permissions = await this.permissionService.findPermissionsByNames(dto.permissions);
    role.permission = permissions;
    return this.roleRepo.save(role);
  }

  hasPermission(role: RoleEntity, permission: string): boolean {
    return role.permission?.some(p => p.name === permission);
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.roleRepo.find({ relations: ['permission'] });
  }

  async getRoles(page = 1, quantity = 10) {
    const pageNum = Number(page) || 1;
    const qty = Number(quantity) || 10;
    const skip = (pageNum - 1) * qty;
    const take = qty;

    const [role, total] = await this.roleRepo.findAndCount({
      skip,
      take,
    });

    return {
      data: role,
      total,
      page: pageNum,
      quantity: qty,
    };
  }
}
