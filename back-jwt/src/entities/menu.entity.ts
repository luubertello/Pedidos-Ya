import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from "typeorm";
import { Restaurant } from "./restaurant.entity";

@Entity('')
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  imageUrl: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.menus)
    restaurant: Restaurant;

}
