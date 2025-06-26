declare class LocationDto {
    lat: number;
    lng: number;
}
declare class AdressDto {
    street: string;
    number: number;
    cityID: number;
    location: LocationDto;
}
export declare class CreateRestaurantDto {
    id: number;
    name: string;
    address: AdressDto;
    imageUrl: string;
}
export {};
