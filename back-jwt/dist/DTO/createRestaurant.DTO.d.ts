declare class LocationDto {
    lat: number;
    lng: number;
}
declare class AddressDto {
    street: string;
    number: number;
    cityID: number;
    location: LocationDto;
}
export declare class CreateRestaurantDto {
    name: string;
    address: AddressDto;
    imageUrl: string;
}
export {};
