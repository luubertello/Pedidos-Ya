import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Address } from 'src/entities/adress.entity';
import { CreateRestaurantDto } from 'src/DTO/createRestaurant.DTO';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  async create(dto: CreateRestaurantDto) {
    try {
      // Crear la entidad de dirección manualmente
      const address = this.addressRepo.create({
        street: dto.address.street,
        number: dto.address.number,
        cityID: dto.address.cityID,
        lat: dto.address.location.lat,
        lng: dto.address.location.lng,
      });

      const savedaddress = await this.addressRepo.save(address);

      // Crear el restaurante usando la dirección guardada
      const restaurant = this.restaurantRepo.create({
        name: dto.name,
        imageUrl: dto.imageUrl,
        address: savedaddress,
      });

      const savedRestaurant = await this.restaurantRepo.save(restaurant);

      return savedRestaurant;
    } catch (error) {
      console.error('Error al crear restaurante:', error);
      throw error instanceof HttpException
        ? error
        : new HttpException('Error de creación del restaurante', 500);
    }
  }

  async findAll() {
    try {
      return await this.restaurantRepo.find({ relations: ['address'] });
    } catch (error) {
      console.error('Error al obtener restaurantes:', error);
      throw new HttpException('Error al obtener restaurantes', 500);
    }
  }

  async remove(id: number) {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['address'],
      });

      if (!restaurant) {
        throw new HttpException('Restaurante no encontrado', 404);
      }

      await this.restaurantRepo.remove(restaurant);
      await this.addressRepo.delete(restaurant.address.id);

      return { status: 'deleted' };
    } catch (error) {
      console.error('Error al eliminar restaurante:', error);
      throw new HttpException('Error al eliminar restaurante', 500);
    }
  }
}
