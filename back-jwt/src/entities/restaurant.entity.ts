import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Address } from './adress.entity';
import { Menu } from './menu.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;

  @Column()
  imageUrl: string;

    @OneToMany(() => Menu, (menu) => menu.restaurant)
    menus: Menu[];

}
