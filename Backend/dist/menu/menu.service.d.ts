import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
import { CreateMenuDto } from 'src/DTO/createMenuDTO';
export declare class MenuService {
    private readonly menuRepository;
    constructor(menuRepository: Repository<Menu>);
    create(createMenuDto: CreateMenuDto): Promise<Menu>;
    findAll(): Promise<Menu[]>;
    findOne(id: number): Promise<Menu>;
    findByRestaurant(restaurantId: number): Promise<Menu[]>;
    update(id: number, updateDto: Partial<CreateMenuDto>): Promise<Menu>;
    partialUpdate(id: number, partialDto: Partial<CreateMenuDto>): Promise<Menu>;
    remove(id: number): Promise<void>;
}
