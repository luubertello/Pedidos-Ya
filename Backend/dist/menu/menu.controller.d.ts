import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
export declare class MenuController {
    private readonly menuRepository;
    constructor(menuRepository: Repository<Menu>);
    create(createmenuDto: Menu): string;
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
