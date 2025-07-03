import { IsEmail, IsString, IsInt } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  roleId: number;
}
