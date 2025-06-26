// src/restaurant/dto/create-restaurant.dto.ts

import {
  IsString,
  IsNumber,
  ValidateNested,
  IsObject,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocationDto {
  @IsNumber()
  lat: number;

  @IsNumber()
  lng: number;
}

class AdressDto {
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
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => AdressDto)
  address: AdressDto;

  @IsUrl()
  imageUrl: string;
}
