import { Controller, Get, Post, Put, Patch, Delete, Body, Param, Query } from '@nestjs/common';

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
    }
  }
  imageUrl: string;
}


@Controller('restaurant')
export class RestaurantController {
    @Post()
  create(@Body() createRestaurantDto: Restaurant): string {
    return `This action adds a new restaurants. Body: ${JSON.stringify(createRestaurantDto)}`;
  }
    @Get()
  findAll(@Query() query: { page: number, limit: number }): string {
    return `This action returns all restaurants. Query: ${JSON.stringify(query)}`;
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    return `This action returns restaurant with ID ${id}`;
  }

  @Put(':id')
  update(@Param('id') id: string): string {
    return `This action updates restaurant with ID ${id}`;
  }

  @Patch(':id')
  partialUpdate(@Param('id') id: string): string {
    return `This action partially updates restaurant with ID ${id}`;
  }

   @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes restaurant with ID ${id}`;
  }
}