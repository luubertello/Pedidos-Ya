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

  async create(createMenuDto: CreateMenuDto): Promise<Menu> {
    const newMenu = this.menuRepository.create({
      name: createMenuDto.name,
      description: createMenuDto.description,
      price: createMenuDto.price,
      imageUrl: createMenuDto.imageUrl,
      restaurant: { id: createMenuDto.restaurantId },
    });
    return await this.menuRepository.save(newMenu);
  }

  async findAll(): Promise<Menu[]> {
    return this.menuRepository.find({ relations: ['restaurant'] });
  }

  async findOne(id: number): Promise<Menu> {
    const menu = await this.menuRepository.findOne({
      where: { id },
      relations: ['restaurant'],
    });
    if (!menu) throw new NotFoundException(`Menú con ID ${id} no encontrado.`);
    return menu;
  }

  async findByRestaurant(restaurantId: number): Promise<Menu[]> {
    return this.menuRepository.find({
      where: { restaurant: { id: restaurantId } },
      relations: ['restaurant'],
    });
  }

    async update(id: number, updateDto: Partial<CreateMenuDto>): Promise<Menu> {
    const menu = await this.findOne(id);
    Object.assign(menu, updateDto);
    return this.menuRepository.save(menu);
    }


    async partialUpdate(id: number, partialDto: Partial<CreateMenuDto>): Promise<Menu> {
    const menu = await this.findOne(id); 
    Object.assign(menu, partialDto);     
    return this.menuRepository.save(menu);
    }

  async remove(id: number): Promise<void> {
    const menu = await this.findOne(id);
    await this.menuRepository.remove(menu);
  }
}
