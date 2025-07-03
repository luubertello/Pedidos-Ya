import { MenuService } from './menu.service';
import { CreateMenuDto } from 'src/DTO/createMenuDTO';
export declare class MenuController {
    private readonly menuService;
    constructor(menuService: MenuService);
    create(createMenuDto: CreateMenuDto): Promise<import("../entities/menu.entity").Menu>;
    findAll(): Promise<import("../entities/menu.entity").Menu[]>;
    findOne(id: number): Promise<import("../entities/menu.entity").Menu>;
    findByRestaurant(id: number): Promise<import("../entities/menu.entity").Menu[]>;
    update(id: number, updateDto: Partial<CreateMenuDto>): Promise<import("../entities/menu.entity").Menu>;
    partialUpdate(id: number, partialDto: Partial<CreateMenuDto>): Promise<import("../entities/menu.entity").Menu>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
