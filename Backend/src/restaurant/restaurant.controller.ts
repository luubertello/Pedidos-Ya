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
import { Permissions } from 'src/middlewares/decorators/permissions.decorator';


@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly service: RestaurantService, @InjectRepository(Restaurant)
   private readonly restaurantRepository: Repository<Restaurant>, @InjectRepository(Menu)
   private readonly menuRepository: Repository<Menu>) {}

  // Crear un restaurante. Requiere el Body (datos del restaurante) y un usuario (duenio)
  @Post()
  @UseGuards(AuthGuard)
  @Permissions('restaurant:create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @Req() req: RequestWithUser
  ) {
    return this.service.create(createRestaurantDto, req.user!);
  }

  // Buscar todos los restaurantes. Se necesita estar logueado como cliente
  @UseGuards(AuthGuard)
  @Permissions('restaurant:list')
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  // Buscar mis restaurantes (solo si soy duenio)
  @UseGuards(AuthGuard)
  @Permissions('restaurant:findMy')
  @Get('mis')
  getMisRestaurantes(@Req() req) {
    console.log('USUARIO:', req.user);
    return this.service.getMisRestaurantes(req.user.id);
  }

  // Encontrar un restaurante por id
  @UseGuards(AuthGuard)
  @Permissions('restaurant:findByID')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = await this.service.findById(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurante con ID ${id} no encontrado.`);
    }
    return restaurant;
  }

  // Modificar totalmente los datos de un restaurante
  @UseGuards(AuthGuard)
  @Permissions('restaurant:update')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateRestaurantDto,
  ) {
    return this.service.update(id, body);
  }

  // Modificar algunos datos de un restaurante
  @UseGuards(AuthGuard)
  @Permissions('restaurant:partialUpdate')
  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateRestaurantDto>,
  ) {
    return this.service.partialUpdate(id, body);
  }
  
  // Eliminar restaurante
  @UseGuards(AuthGuard)
  @Permissions('restaurant:delete')
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // Se borran primero los menus del restaurante
    await this.menuRepository.delete({ restaurant: { id } });
    await this.restaurantRepository.delete(id);
    return { message: 'Restaurante y menús eliminados correctamente' };
  }

}

