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
exports.RestaurantController = void 0;
const common_1 = require("@nestjs/common");
const createRestaurant_DTO_1 = require("../interfaces/createRestaurant.DTO");
const restaurant_service_1 = require("./restaurant.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const menu_entity_1 = require("../entities/menu.entity");
const common_2 = require("@nestjs/common");
const auth_middleware_1 = require("../middlewares/auth.middleware");
let RestaurantController = class RestaurantController {
    service;
    restaurantRepository;
    menuRepository;
    constructor(service, restaurantRepository, menuRepository) {
        this.service = service;
        this.restaurantRepository = restaurantRepository;
        this.menuRepository = menuRepository;
    }
    async create(createRestaurantDto, req) {
        return this.service.create(createRestaurantDto, req.user);
    }
    async findAll() {
        return this.service.findAll();
    }
    async getMisRestaurantes(req) {
        const userId = req.user.id;
        return this.service.getMisRestaurantes(userId);
    }
    async findOne(id) {
        const restaurant = await this.service.findById(id);
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurante con ID ${id} no encontrado.`);
        }
        return restaurant;
    }
    async update(id, body) {
        return this.service.update(id, body);
    }
    async partialUpdate(id, body) {
        return this.service.partialUpdate(id, body);
    }
    async remove(id) {
        await this.menuRepository.delete({ restaurant: { id } });
        await this.restaurantRepository.delete(id);
        return { message: 'Restaurante y menús eliminados correctamente' };
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Post)(),
    (0, common_2.UseGuards)(auth_middleware_1.AuthGuard),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRestaurant_DTO_1.CreateRestaurantDto, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('mis'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "getMisRestaurantes", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createRestaurant_DTO_1.CreateRestaurantDto]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "partialUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RestaurantController.prototype, "remove", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, common_1.Controller)('restaurant'),
    __param(1, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(2, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [restaurant_service_1.RestaurantService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map