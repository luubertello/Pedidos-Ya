import { LoginDTO } from 'src/interfaces/login.dto';
import { RegisterDTO } from 'src/interfaces/register.dto';
import { UserI } from 'src/interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly repository;
    private readonly jwtService;
    constructor(repository: Repository<UserEntity>, jwtService: JwtService);
    register(body: RegisterDTO): Promise<{
        status: string;
    }>;
    login(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    findByEmail(email: string): Promise<UserEntity>;
    canDo(user: UserI, permission: string): Promise<boolean>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getUsers(page?: number, quantity?: number): Promise<{
        data: UserEntity[];
        total: number;
        page: number;
        quantity: number;
    }>;
}
