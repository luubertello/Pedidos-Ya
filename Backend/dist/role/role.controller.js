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
exports.RolesController = void 0;
const common_1 = require("@nestjs/common");
const role_service_1 = require("./role.service");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permissions_decorator_1 = require("../middlewares/decorators/permissions.decorator");
const role_DTO_1 = require("./role.DTO");
let RolesController = class RolesController {
    roleService;
    constructor(roleService) {
        this.roleService = roleService;
    }
    async create(dto) {
        return this.roleService.create(dto);
    }
    async setPermissions(name, dto) {
        return this.roleService.setPermissions(name, dto);
    }
    async addPermissions(name, dto) {
        return this.roleService.addPermissions(name, dto);
    }
    async getRoles(page = 1, quantity = 10) {
        return this.roleService.getRoles(page, quantity);
    }
};
exports.RolesController = RolesController;
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)('roles_create'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [role_DTO_1.CreateRoleDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)('roles_assign_permissions'),
    (0, common_1.Put)(':name/set-permissions'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_DTO_1.AssignPermissionsDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "setPermissions", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)('roles_assign_permissions'),
    (0, common_1.Put)(':name/add-permissions'),
    __param(0, (0, common_1.Param)('name')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, role_DTO_1.AssignPermissionsDto]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "addPermissions", null);
__decorate([
    (0, common_1.Get)('roles'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RolesController.prototype, "getRoles", null);
exports.RolesController = RolesController = __decorate([
    (0, common_1.Controller)('roles'),
    __metadata("design:paramtypes", [role_service_1.RoleService])
], RolesController);
//# sourceMappingURL=role.controller.js.map