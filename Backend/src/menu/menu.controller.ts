import { Controller, Get, Post, Put, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from 'src/DTO/createMenuDTO';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Get()
  async findAll() {
    return this.menuService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findOne(id);
  }

  @Get('restaurant/:id')
  async findByRestaurant(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.findByRestaurant(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: Partial<CreateMenuDto>
  ) {
    return this.menuService.update(id, updateDto);
  }


  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialDto: Partial<CreateMenuDto>
  ) {
    return this.menuService.partialUpdate(id, partialDto);
  }


  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.menuService.remove(id);
    return { message: `Menú con ID ${id} eliminado correctamente` };
  }
}
