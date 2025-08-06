import { UserI } from '../interfaces/user.interface';
import { BaseEntity, Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Restaurant } from './restaurant.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements UserI {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({unique:true})
  @Column()
  email: string;

  @Column()
  password: string;

  @Column('simple-array', { nullable: true })
  permissions: string[];
  
  @ManyToOne(() => RoleEntity, role => role.users)
  role: RoleEntity;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants: Restaurant[];

}