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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const bcrypt_1 = require("bcrypt");
const jwt_service_1 = require("../jwt/jwt.service");
const dayjs = require("dayjs");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let UsersService = class UsersService {
    repository;
    jwtService;
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    async register(body) {
        try {
            const user = this.repository.create(body);
            user.password = (0, bcrypt_1.hashSync)(user.password, 10);
            await this.repository.save(user);
            return { status: 'created' };
        }
        catch (error) {
            console.error('Error en register:', error);
            throw new common_1.HttpException('Error de creación', 500);
        }
    }
    async login(body) {
        const user = await this.findByEmail(body.email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const match = (0, bcrypt_1.compareSync)(body.password, user.password);
        if (!match) {
            throw new common_1.UnauthorizedException('Contraseña incorrecta');
        }
        return {
            accessToken: this.jwtService.generateToken({ email: user.email }, 'auth'),
            refreshToken: this.jwtService.generateToken({ email: user.email }, 'refresh'),
        };
    }
    async findByEmail(email) {
        const user = await this.repository.findOneBy({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        return user;
    }
    async canDo(user, permission) {
        const hasPermission = user.permissionCodes?.includes(permission);
        if (!hasPermission) {
            throw new common_1.UnauthorizedException('No tiene permiso para realizar esta acción');
        }
        return true;
    }
    async refreshToken(refreshToken) {
        try {
            const payload = this.jwtService.getPayload(refreshToken, 'refresh');
            const timeToExpire = dayjs.unix(payload.exp).diff(dayjs(), 'minute');
            return {
                accessToken: this.jwtService.generateToken({ email: payload.email }, 'auth'),
                refreshToken: timeToExpire < 20
                    ? this.jwtService.generateToken({ email: payload.email }, 'refresh')
                    : refreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
    }
    async getUsers(page = 1, quantity = 10) {
        const pageNum = Number(page) || 1;
        const qty = Number(quantity) || 10;
        const skip = (pageNum - 1) * qty;
        const take = qty;
        const [users, total] = await this.repository.findAndCount({
            skip,
            take,
        });
        return {
            data: users,
            total,
            page: pageNum,
            quantity: qty,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_service_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map