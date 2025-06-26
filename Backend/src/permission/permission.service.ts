import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { Repository, In } from 'typeorm';
import { CreatePermissionDto } from './permission.DTO';

@Injectable()
export class PermissionService {

    constructor(@InjectRepository(PermissionEntity) private repository: Repository<PermissionEntity>,
                ) {}
    async findPermissionsByNames(permissionNames: string[]): Promise<PermissionEntity[]> {
        return await this.repository.find({ where: { name: In(permissionNames), },
        });
    }

    async createPermission(permission: CreatePermissionDto): Promise<PermissionEntity> {
        return await this.repository.save(permission)
    }

}