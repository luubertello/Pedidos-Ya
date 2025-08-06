import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from 'src/entities/menu.entity';
import { CreateMenuDto } from 'src/interfaces/createMenuDTO';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  // Crea un nuevo menu en la base de datos.
  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const newMenu = this.menuRepository.create({
      name: createMenuDto.name,
      description: createMenuDto.description,
      price: createMenuDto.price,
      imageUrl: createMenuDto.imageUrl,
      restaurant: { id: createMenuDto.restaurantId }, // Asocia el menu al restaurante según ID
    });
    return await this.menuRepository.save(newMenu); // Guarda el menu en la BD
  }

  // Trae todos los menus registrados, incluyendo info del restaurante al que pertenecen.
  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({ relations: ['restaurant'] });
  }

  // Busca un menu por su ID. Si no lo encuentra, tira error
  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!menu) throw new NotFoundException(`Menú con ID ${id} no encontrado.`);
    return menu;
  }

  // Devuelve todos los menus que pertenecen a un restaurante en particular
  async findByRestaurant(restaurantId: number): Promise<Menu[]> {
    return this.menuRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });
  }

  // Actualiza completamente un menu. O sea, puede modificar varios campos a la vez
  async update(id: number, updateDto: Partial<CreateMenuDto>): Promise<Menu> {
    const menu = await this.findOne(id); // Primero busca el menú.
    Object.assign(menu, updateDto); // Le pisa los campos con los nuevos valores.
    return this.menuRepository.save(menu); // Lo guarda actualizado.
  }

  // Hace una actualización parcial
  async partialUpdate(id: number, partialDto: Partial<CreateMenuDto>): Promise<Menu> {
    const menu = await this.findOne(id); 
    Object.assign(menu, partialDto);     
    return this.menuRepository.save(menu);
  }

  // Elimina un menú. Si no lo encuentra, lanza error
  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
  }
}