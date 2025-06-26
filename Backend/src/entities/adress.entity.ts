import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Location } from "./location.entity";
import { Restaurant } from "./restaurant.entity";

@Entity()
export class Adress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  cityID: number;

  @OneToOne(() => Location)
  @JoinColumn()
  location: Location;

  @OneToOne(() => Restaurant, restaurant => restaurant.adress)
  restaurant: Restaurant;
}
