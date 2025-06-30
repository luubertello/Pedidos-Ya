"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const menu_entity_1 = require("./entities/menu.entity");
const restaurant_controller_1 = require("./restaurant/restaurant.controller");
const menu_controller_1 = require("./menu/menu.controller");
const adress_entity_1 = require("./entities/adress.entity");
const permission_entity_1 = require("./entities/permission.entity");
const role_entity_1 = require("./entities/role.entity");
const permission_controller_1 = require("./permission/permission.controller");
const role_controller_1 = require("./role/role.controller");
const users_controller_1 = require("./users/users.controller");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const jwt_service_1 = require("./jwt/jwt.service");
const users_service_1 = require("./users/users.service");
const permission_service_1 = require("./permission/permission.service");
const role_service_1 = require("./role/role.service");
const user_entity_1 = require("./entities/user.entity");
const restaurant_service_1 = require("./restaurant/restaurant.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5433,
                username: 'postgres',
                password: '1234',
                database: 'pedidosya',
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
                logging: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([restaurant_entity_1.Restaurant, menu_entity_1.Menu, adress_entity_1.Address, permission_entity_1.PermissionEntity, role_entity_1.RoleEntity, user_entity_1.UserEntity]),
        ],
        controllers: [restaurant_controller_1.RestaurantController, menu_controller_1.MenuController, permission_controller_1.PermissionsController, role_controller_1.RolesController, users_controller_1.UsersController],
        providers: [auth_middleware_1.AuthGuard, jwt_service_1.JwtService, users_service_1.UsersService, permission_service_1.PermissionService, role_service_1.RoleService, restaurant_service_1.RestaurantService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map