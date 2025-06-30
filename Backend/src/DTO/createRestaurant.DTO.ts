import { IsString, IsNumber, ValidateNested, IsUrl, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

class AddressDto {
  @IsString()
  street: string;

  @IsNumber()
  number: number;

  @IsNumber()
  cityID: number;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}

export class CreateRestaurantDto {

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsUrl()
  imageUrl: string;
}
