import { CreateRestaurantDto } from 'src/DTO/createRestaurant.DTO';
export declare class RestaurantController {
    private restaurants;
    create(createRestaurantDto: CreateRestaurantDto): string;
    findAll(): CreateRestaurantDto[];
    findOne(id: number): CreateRestaurantDto;
    update(id: number, body: CreateRestaurantDto): string;
    partialUpdate(id: number, body: Partial<CreateRestaurantDto>): string;
    remove(id: number): string;
}
