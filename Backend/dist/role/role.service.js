"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("../entities/role.entity");
const permission_service_1 = require("../permission/permission.service");
let RoleService = class RoleService {
    roleRepo;
    permissionService;
    constructor(roleRepo, permissionService) {
        this.roleRepo = roleRepo;
        this.permissionService = permissionService;
    }
    async create(dto) {
        const exists = await this.roleRepo.findOne({ where: { name: dto.name } });
        if (exists)
            throw new common_1.ConflictException('El rol ya existe');
        const role = this.roleRepo.create({ name: dto.name });
        return this.roleRepo.save(role);
    }
    async findByName(name) {
        const role = await this.roleRepo.findOne({
            where: { name },
            relations: ['permission'],
        });
        if (!role)
            throw new common_1.NotFoundException('Rol no encontrado');
        return role;
    }
    async addPermissions(roleName, dto) {
        const role = await this.findByName(roleName);
        const newPermissions = await this.permissionService.findPermissionsByNames(dto.permissions);
        const current = role.permission.map(p => p.name);
        const filtered = newPermissions.filter(p => !current.includes(p.name));
        role.permission = [...role.permission, ...filtered];
        return this.roleRepo.save(role);
    }
    async setPermissions(roleName, dto) {
        const role = await this.findByName(roleName);
        const permissions = await this.permissionService.findPermissionsByNames(dto.permissions);
        role.permission = permissions;
        return this.roleRepo.save(role);
    }
    hasPermission(role, permission) {
        return role.permission?.some(p => p.name === permission);
    }
    async findAll() {
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
};
exports.RoleService = RoleService;
exports.RoleService = RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.RoleEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        permission_service_1.PermissionService])
], RoleService);
//# sourceMappingURL=role.service.js.map