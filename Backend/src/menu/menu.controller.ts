import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from 'src/interfaces/createMenuDTO';
import { AuthGuard } from 'src/middlewares/auth.middleware';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Crear menu
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  // Buscar todos los menus
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.menuService.findAll();
  }

  // Buscar menu por id
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  // Buscar los menus de un restaurante
  @UseGuards(AuthGuard)
  @Get('restaurant/:id')
  async findByRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findByRestaurant(id);
  }

  // Modificar menu
  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateMenuDto>
  ) {
    return this.menuService.update(id, updateDto);
  }

  // Modificar parcialmente menu
  @UseGuards(AuthGuard)
  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialDto: Partial<CreateMenuDto>
  ) {
    return this.menuService.partialUpdate(id, partialDto);
  }

  // Borrar menu
  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.remove(id);
    return { message: `Menú con ID ${id} eliminado correctamente` };
  }
}
