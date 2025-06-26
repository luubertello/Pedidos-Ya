interface Restaurant {
    id: number;
    name: string;
    adress: {
        street: string;
        number: number;
        cityID: number;
        location: {
            lat: number;
            ing: number;
        };
    };
    imageUrl: string;
}
export declare class RestaurantController {
    create(createRestaurantDto: Restaurant): string;
    findAll(query: {
        page: number;
        limit: number;
    }): string;
    findOne(id: number): string;
    update(id: string): string;
    partialUpdate(id: string): string;
    remove(id: string): string;
}
export {};
