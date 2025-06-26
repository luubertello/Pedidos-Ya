"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const menu_entity_1 = require("./entities/menu.entity");
const adress_entity_1 = require("./entities/adress.entity");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const dataSource = app.get(typeorm_1.DataSource);
    const restaurantRepo = dataSource.getRepository(restaurant_entity_1.Restaurant);
    const menuRepo = dataSource.getRepository(menu_entity_1.Menu);
    const adressRepo = dataSource.getRepository(adress_entity_1.Adress);
    const adress = adressRepo.create({
        street: 'Av. Siempre Viva',
        number: 742,
        cityID: 1,
    });
    await adressRepo.save(adress);
    const restaurant = restaurantRepo.create({
        name: "Moe's Tavern",
        image: 'https://example.com/moes.jpg',
        adress: adress,
    });
    await restaurantRepo.save(restaurant);
    const menu1 = menuRepo.create({
        name: 'Cerveza Duff',
        description: 'La mejor cerveza de Springfield.',
        price: 500,
        image: 'https://example.com/duff.jpg',
        restaurant: restaurant,
    });
    const menu2 = menuRepo.create({
        name: 'Hamburguesa Krusty',
        description: 'Jugosa y sabrosa.',
        price: 1200,
        image: 'https://example.com/burger.jpg',
        restaurant: restaurant,
    });
    await menuRepo.save([menu1, menu2]);
    console.log('✅ Datos de prueba insertados correctamente.');
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map