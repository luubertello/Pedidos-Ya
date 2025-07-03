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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const menu_entity_1 = require("../entities/menu.entity");
let MenuService = class MenuService {
    menuRepository;
    constructor(menuRepository) {
        this.menuRepository = menuRepository;
    }
    async create(createMenuDto) {
        const newMenu = this.menuRepository.create({
            name: createMenuDto.name,
            description: createMenuDto.description,
            price: createMenuDto.price,
            imageUrl: createMenuDto.imageUrl,
            restaurant: { id: createMenuDto.restaurantId },
        });
        return await this.menuRepository.save(newMenu);
    }
    async findAll() {
        return this.menuRepository.find({ relations: ['restaurant'] });
    }
    async findOne(id) {
        const menu = await this.menuRepository.findOne({
            where: { id },
            relations: ['restaurant'],
        });
        if (!menu)
            throw new common_1.NotFoundException(`Menú con ID ${id} no encontrado.`);
        return menu;
    }
    async findByRestaurant(restaurantId) {
        return this.menuRepository.find({
            where: { restaurant: { id: restaurantId } },
            relations: ['restaurant'],
        });
    }
    async update(id, updateDto) {
        const menu = await this.findOne(id);
        Object.assign(menu, updateDto);
        return this.menuRepository.save(menu);
    }
    async partialUpdate(id, partialDto) {
        const menu = await this.findOne(id);
        Object.assign(menu, partialDto);
        return this.menuRepository.save(menu);
    }
    async remove(id) {
        const menu = await this.findOne(id);
        await this.menuRepository.remove(menu);
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(menu_entity_1.Menu)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MenuService);
//# sourceMappingURL=menu.service.js.map