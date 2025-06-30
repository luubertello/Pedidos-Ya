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
exports.RestaurantService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("../entities/restaurant.entity");
const adress_entity_1 = require("../entities/adress.entity");
let RestaurantService = class RestaurantService {
    restaurantRepo;
    addressRepo;
    constructor(restaurantRepo, addressRepo) {
        this.restaurantRepo = restaurantRepo;
        this.addressRepo = addressRepo;
    }
    async create(dto) {
        try {
            const address = this.addressRepo.create({
                street: dto.address.street,
                number: dto.address.number,
                cityID: dto.address.cityID,
                lat: dto.address.location.lat,
                lng: dto.address.location.lng,
            });
            const savedaddress = await this.addressRepo.save(address);
            const restaurant = this.restaurantRepo.create({
                name: dto.name,
                imageUrl: dto.imageUrl,
                address: savedaddress,
            });
            const savedRestaurant = await this.restaurantRepo.save(restaurant);
            return savedRestaurant;
        }
        catch (error) {
            console.error('Error al crear restaurante:', error);
            throw error instanceof common_1.HttpException
                ? error
                : new common_1.HttpException('Error de creación del restaurante', 500);
        }
    }
    async findAll() {
        try {
            return await this.restaurantRepo.find({ relations: ['address'] });
        }
        catch (error) {
            console.error('Error al obtener restaurantes:', error);
            throw new common_1.HttpException('Error al obtener restaurantes', 500);
        }
    }
    async remove(id) {
        try {
            const restaurant = await this.restaurantRepo.findOne({
                where: { id },
                relations: ['address'],
            });
            if (!restaurant) {
                throw new common_1.HttpException('Restaurante no encontrado', 404);
            }
            await this.restaurantRepo.remove(restaurant);
            await this.addressRepo.delete(restaurant.address.id);
            return { status: 'deleted' };
        }
        catch (error) {
            console.error('Error al eliminar restaurante:', error);
            throw new common_1.HttpException('Error al eliminar restaurante', 500);
        }
    }
};
exports.RestaurantService = RestaurantService;
exports.RestaurantService = RestaurantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(adress_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantService);
//# sourceMappingURL=restaurant.service.js.map