import { CreateRestaurantDto } from 'src/DTO/createRestaurant.DTO';
import { RestaurantService } from './restaurant.service';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Menu } from 'src/entities/menu.entity';
export declare class RestaurantController {
    private readonly service;
    private readonly restaurantRepository;
    private readonly menuRepository;
    constructor(service: RestaurantService, restaurantRepository: Repository<Restaurant>, menuRepository: Repository<Menu>);
    create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
