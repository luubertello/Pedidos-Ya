import { CreateRestaurantDto } from 'src/interfaces/createRestaurant.DTO';
import { RestaurantService } from './restaurant.service';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Menu } from 'src/entities/menu.entity';
import { RequestWithUser } from 'src/interfaces/request-user';
export declare class RestaurantController {
    private readonly service;
    private readonly restaurantRepository;
    private readonly menuRepository;
    constructor(service: RestaurantService, restaurantRepository: Repository<Restaurant>, menuRepository: Repository<Menu>);
    create(createRestaurantDto: CreateRestaurantDto, req: RequestWithUser): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    getMisRestaurantes(req: RequestWithUser): Promise<Restaurant[]>;
    findOne(id: number): Promise<Restaurant>;
    update(id: number, body: CreateRestaurantDto): Promise<Restaurant>;
    partialUpdate(id: number, body: Partial<CreateRestaurantDto>): Promise<Restaurant>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
