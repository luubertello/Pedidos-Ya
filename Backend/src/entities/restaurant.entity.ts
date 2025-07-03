import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Address } from './adress.entity';
import { Menu } from './menu.entity';
import { UserEntity } from './user.entity';

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
  menu: Menu[];

  @ManyToOne(() => UserEntity, (user) => user.restaurants)
  owner: UserEntity;


}
