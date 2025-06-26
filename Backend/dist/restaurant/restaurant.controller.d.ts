interface Restaurant {
    id: number;
    name: string;
    adress: {
        street: string;
        number: number;
        cityID: number;
        location: {
            lat: number;
            lng: number;
        };
    };
    imageUrl: string;
}
export declare class RestaurantController {
    private restaurants;
    create(createRestaurantDto: Restaurant): string;
    findAll(): Restaurant[];
    findOne(id: number): string;
    update(id: string): string;
    partialUpdate(id: string): string;
    remove(id: string): string;
}
export {};
