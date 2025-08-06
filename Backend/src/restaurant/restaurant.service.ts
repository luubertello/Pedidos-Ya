import { Injectable, HttpException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity';
import { Address } from 'src/entities/adress.entity';
import { CreateRestaurantDto } from 'src/interfaces/createRestaurant.DTO';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,

    @InjectRepository(Address)
    private readonly addressRepo: Repository<Address>,
  ) {}

  // crear restaurante
  async create(dto: CreateRestaurantDto, user: UserEntity) {
    try {
      // crear la direccion a partir del dto
      const address = this.addressRepo.create({
        street: dto.address.street,
        number: dto.address.number,
        cityID: dto.address.cityID,
        lat: dto.address.location.lat,
        lng: dto.address.location.lng,
      })
      const savedAddress = await this.addressRepo.save(address) // guardar la direccion en la base

      // crear restaurante con la direccion y el usuario dueño
      const restaurant = this.restaurantRepo.create({
        name: dto.name,
        imageUrl: dto.imageUrl,
        address: savedAddress,
        owner: user,
      })

      // guardar restaurante en la base
      return await this.restaurantRepo.save(restaurant)
    } catch (error) {
      // manejo de errores
      console.error('Error al crear restaurante:', error)
      throw error instanceof HttpException
        ? error
        : new HttpException('Error de creacion del restaurante', 500)
    }
  }

  // obtener todos los restaurantes con su direccion
  async findAll() {
    try {
      return await this.restaurantRepo.find({ relations: ['address'] })
    } catch (error) {
      console.error('Error al obtener restaurantes:', error)
      throw new HttpException('Error al obtener restaurantes', 500)
    }
  }

  // obtener restaurantes del usuario segun su id
  async getMisRestaurantes(userId: number) {
    return this.restaurantRepo.find({
      where: { owner: { id: userId } },
      relations: ['owner'],
    })
  }

  // buscar restaurante por id incluyendo direccion y menu
  async findById(id: number) {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['address', 'menu'],
      })

      if (!restaurant) {
        throw new NotFoundException(`Restaurante con ID ${id} no encontrado`)
      }

      return restaurant
    } catch (error) {
      console.error('Error al obtener restaurante:', error)
      throw error instanceof HttpException
        ? error
        : new HttpException('Error al obtener restaurante', 500)
    }
  }

  // actualizar restaurante completo
  async update(id: number, dto: CreateRestaurantDto) {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['address'],
      })

      if (!restaurant) {
        throw new NotFoundException(`Restaurante con ID ${id} no encontrado`)
      }

      // actualizar datos del restaurante
      restaurant.name = dto.name
      restaurant.imageUrl = dto.imageUrl

      // actualizar direccion
      if (dto.address && restaurant.address) {
        restaurant.address.street = dto.address.street
        restaurant.address.number = dto.address.number
        restaurant.address.cityID = dto.address.cityID
        restaurant.address.lat = dto.address.location.lat
        restaurant.address.lng = dto.address.location.lng

        await this.addressRepo.save(restaurant.address)
      }

      return await this.restaurantRepo.save(restaurant)
    } catch (error) {
      console.error('Error al actualizar restaurante:', error)
      throw error instanceof HttpException
        ? error
        : new HttpException('Error al actualizar restaurante', 500)
    }
  }

  // actualizar parcialmente un restaurante
  async partialUpdate(id: number, dto: Partial<CreateRestaurantDto>) {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['address'],
      })

      if (!restaurant) {
        throw new NotFoundException(`Restaurante con ID ${id} no encontrado`)
      }

      // actualizar campos individuales si estan definidos
      if (dto.name !== undefined) restaurant.name = dto.name
      if (dto.imageUrl !== undefined) restaurant.imageUrl = dto.imageUrl

      // actualizar direccion si viene en el dto
      if (dto.address && restaurant.address) {
        const { street, number, cityID, location } = dto.address

        if (street !== undefined) restaurant.address.street = street
        if (number !== undefined) restaurant.address.number = number
        if (cityID !== undefined) restaurant.address.cityID = cityID
        if (location) {
          if (location.lat !== undefined) restaurant.address.lat = location.lat
          if (location.lng !== undefined) restaurant.address.lng = location.lng
        }

        await this.addressRepo.save(restaurant.address)
      }

      return await this.restaurantRepo.save(restaurant)
    } catch (error) {
      console.error('Error al actualizar parcialmente restaurante:', error)
      throw error instanceof HttpException
        ? error
        : new HttpException('Error parcial al actualizar restaurante', 500)
    }
  }

  // eliminar restaurante y su direccion asociada
  async remove(id: number) {
    try {
      const restaurant = await this.restaurantRepo.findOne({
        where: { id },
        relations: ['address'],
      })

      if (!restaurant) {
        throw new HttpException('Restaurante no encontrado', 404)
      }

      await this.restaurantRepo.remove(restaurant) // borrar restaurante
      await this.addressRepo.delete(restaurant.address.id) // borrar direccion

      return { status: 'deleted' }
    } catch (error) {
      console.error('Error al eliminar restaurante:', error)
      throw new HttpException('Error al eliminar restaurante', 500)
    }
  }
}