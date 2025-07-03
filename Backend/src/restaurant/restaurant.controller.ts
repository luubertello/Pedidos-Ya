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
  ParseIntPipe,
} from '@nestjs/common';
import { CreateRestaurantDto } from 'src/interfaces/createRestaurant.DTO';
import { RestaurantService } from './restaurant.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from 'src/entities/restaurant.entity'; 
import { Menu } from 'src/entities/menu.entity';
import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares/auth.middleware';
import { RequestWithUser } from 'src/interfaces/request-user';


@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService, @InjectRepository(Restaurant)
   private readonly restaurantRepository: Repository<Restaurant>, @InjectRepository(Menu)
   private readonly menuRepository: Repository<Menu>) {}

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Req() req: RequestWithUser
  ) {
    return this.service.create(createRestaurantDto, req.user!);
  }

  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('mis')
  getMisRestaurantes(@Req() req) {
    console.log('USUARIO:', req.user);
    return this.service.getMisRestaurantes(req.user.id);
  }


  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = await this.service.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    return restaurant;
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRestaurantDto,
  ) {
    return this.service.update(id, body);
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateRestaurantDto>,
  ) {
    return this.service.partialUpdate(id, body);
  }
  

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // Borrar primero los menús del restaurante
    await this.menuRepository.delete({ restaurant: { id } });

    // Luego borrar el restaurante
    await this.restaurantRepository.delete(id);

    return { message: 'Restaurante y menús eliminados correctamente' };
  }

}

