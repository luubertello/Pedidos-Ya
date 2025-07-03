import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Address } from 'src/entities/adress.entity';
import { CreateRestaurantDto } from 'src/interfaces/createRestaurant.DTO';
import { UserEntity } from 'src/entities/user.entity';
export declare class RestaurantService {
    private readonly restaurantRepo;
    private readonly addressRepo;
    constructor(restaurantRepo: Repository<Restaurant>, addressRepo: Repository<Address>);
    create(dto: CreateRestaurantDto, user: UserEntity): Promise<Restaurant>;
    findAll(): Promise<Restaurant[]>;
    getMisRestaurantes(userId: number): Promise<Restaurant[]>;
    findById(id: number): Promise<Restaurant>;
    update(id: number, dto: CreateRestaurantDto): Promise<Restaurant>;
    partialUpdate(id: number, dto: Partial<CreateRestaurantDto>): Promise<Restaurant>;
    remove(id: number): Promise<{
        status: string;
    }>;
}
