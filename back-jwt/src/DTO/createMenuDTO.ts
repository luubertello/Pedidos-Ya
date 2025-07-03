import { IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateMenuDto {
  @IsNumber()
  restaurantId: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  @IsUrl()
  imageUrl: string;
}
