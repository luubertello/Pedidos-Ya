import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query, Module } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
import { CreateMenuDto } from 'src/DTO/createMenuDTO';

interface menu {
  id: number;
  restaurantID: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

  @Controller('menu')
  export class MenuController {
    constructor(
      @InjectRepository(Menu)
      private readonly menuRepository: Repository<Menu>,
    ) {}

    @Post()
    async create(@Body() createMenuDto: CreateMenuDto) {
      try {
        const newMenu = this.menuRepository.create({
          name: createMenuDto.name,
          description: createMenuDto.description,
          price: createMenuDto.price,
          imageUrl: createMenuDto.imageUrl,
          restaurant: { id: createMenuDto.restaurantId },
        });

        return await this.menuRepository.save(newMenu);
      } catch (error) {
        console.error('Error creando menú:', error);
        throw error;
      }
    }


    @Get()
  findAll(@Query() query: { page: number, limit: number }): string {
    return `This action returns all menus. Query: ${JSON.stringify(query)}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `This action returns menu with ID ${id}`;
  }

  @Get('/restaurant/:id/menu')
async findMenusByRestaurant(@Param('id', ParseIntPipe) id: number) {
  return this.menuRepository.find({
    where: { restaurant: { id } },
    relations: ['restaurant'],
  });
}

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates menu with ID ${id}`;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string): string {
    return `This action partially updates menu with ID ${id}`;
  }

   @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes menu with ID ${id}`;
  }
}