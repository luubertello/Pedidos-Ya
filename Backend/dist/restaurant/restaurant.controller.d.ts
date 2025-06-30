import { CreateRestaurantDto } from 'src/DTO/createRestaurant.DTO';
import { RestaurantService } from './restaurant.service';
export declare class RestaurantController {
    private readonly service;
    constructor(service: RestaurantService);
    create(createRestaurantDto: CreateRestaurantDto): Promise<import("../entities/restaurant.entity").Restaurant>;
    findAll(): Promise<import("../entities/restaurant.entity").Restaurant[]>;
}
