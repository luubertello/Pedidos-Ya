import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from "typeorm";
import { Adress } from "./adress.entity";

@Entity('')
export class Location {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lat: number;

  @Column()
  ing: number;

@OneToOne(() => Adress, adress => adress.location)
adress: Adress;

}