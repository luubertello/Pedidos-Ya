// src/restaurant/restaurant.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateRestaurantDto } from 'src/DTO/createRestaurant.DTO';

@Controller('restaurant')
export class RestaurantController {
  private restaurants: CreateRestaurantDto[] = [];

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createRestaurantDto: CreateRestaurantDto): string {
    this.restaurants.push(createRestaurantDto);
    return `Restaurante creado correctamente. Total: ${this.restaurants.length}`;
  }

  @Get()
  findAll(): CreateRestaurantDto[] {
    return this.restaurants;
  }

  @Get(':id')
  findOne(@Param('id') id: number): CreateRestaurantDto {
    const restaurant = this.restaurants.find((r) => r.id === id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    return restaurant;
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateRestaurantDto): string {
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    this.restaurants[index] = body;
    return `Restaurante con ID ${id} actualizado correctamente.`;
  }

  @Patch(':id')
  partialUpdate(
    @Param('id') id: number,
    @Body() body: Partial<CreateRestaurantDto>,
  ): string {
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    this.restaurants[index] = { ...this.restaurants[index], ...body };
    return `Restaurante con ID ${id} actualizado parcialmente.`;
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    const index = this.restaurants.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    this.restaurants.splice(index, 1);
    return `Restaurante con ID ${id} eliminado correctamente.`;
  }
}
