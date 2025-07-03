import { UsersService } from './users.service';
import { LoginDTO } from '../interfaces/login.dto';
import { RegisterDTO } from '../interfaces/register.dto';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/request-user';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    getUsers(page?: number, quantity?: number): Promise<{
        data: import("../entities/user.entity").UserEntity[];
        total: number;
        page: number;
        quantity: number;
    }>;
    getProfile(req: RequestWithUser): {
        email: string;
    };
    loginUser(body: LoginDTO): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    registerUser(body: RegisterDTO): Promise<{
        status: string;
    }>;
    refreshToken(request: Request): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
