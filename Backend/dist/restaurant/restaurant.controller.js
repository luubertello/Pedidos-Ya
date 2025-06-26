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
const createRestaurant_DTO_1 = require("../DTO/createRestaurant.DTO");
let RestaurantController = class RestaurantController {
    restaurants = [];
    create(createRestaurantDto) {
        this.restaurants.push(createRestaurantDto);
        return `Restaurante creado correctamente. Total: ${this.restaurants.length}`;
    }
    findAll() {
        return this.restaurants;
    }
    findOne(id) {
        const restaurant = this.restaurants.find((r) => r.id === id);
        if (!restaurant) {
            throw new common_1.NotFoundException(`Restaurante con ID ${id} no encontrado.`);
        }
        return restaurant;
    }
    update(id, body) {
        const index = this.restaurants.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Restaurante con ID ${id} no encontrado.`);
        }
        this.restaurants[index] = body;
        return `Restaurante con ID ${id} actualizado correctamente.`;
    }
    partialUpdate(id, body) {
        const index = this.restaurants.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Restaurante con ID ${id} no encontrado.`);
        }
        this.restaurants[index] = { ...this.restaurants[index], ...body };
        return `Restaurante con ID ${id} actualizado parcialmente.`;
    }
    remove(id) {
        const index = this.restaurants.findIndex((r) => r.id === id);
        if (index === -1) {
            throw new common_1.NotFoundException(`Restaurante con ID ${id} no encontrado.`);
        }
        this.restaurants.splice(index, 1);
        return `Restaurante con ID ${id} eliminado correctamente.`;
    }
};
exports.RestaurantController = RestaurantController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createRestaurant_DTO_1.CreateRestaurantDto]),
    __metadata("design:returntype", String)
], RestaurantController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], RestaurantController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", createRestaurant_DTO_1.CreateRestaurantDto)
], RestaurantController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, createRestaurant_DTO_1.CreateRestaurantDto]),
    __metadata("design:returntype", String)
], RestaurantController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", String)
], RestaurantController.prototype, "partialUpdate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", String)
], RestaurantController.prototype, "remove", null);
exports.RestaurantController = RestaurantController = __decorate([
    (0, common_1.Controller)('restaurant')
], RestaurantController);
//# sourceMappingURL=restaurant.controller.js.map