import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Adress } from "./adress.entity";
import { Menu } from "./menu.entity";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Adress)
  adress: Adress;

  @Column()
  image: string;

@OneToMany(() => Menu, (menu) => menu.restaurant)
menus: Menu[];

}
