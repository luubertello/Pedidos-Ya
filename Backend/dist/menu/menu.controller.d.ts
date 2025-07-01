import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
import { CreateMenuDto } from 'src/DTO/createMenuDTO';
export declare class MenuController {
    private readonly menuRepository;
    constructor(menuRepository: Repository<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(query: {
        page: number;
        limit: number;
    }): string;
    findOne(id: number): string;
    findMenusByRestaurant(id: number): Promise<Menu[]>;
    update(id: string): string;
    partialUpdate(id: string): string;
    remove(id: string): string;
}
