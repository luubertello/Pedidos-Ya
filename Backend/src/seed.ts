import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Menu } from './entities/menu.entity';
import { Adress } from './entities/adress.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const restaurantRepo = dataSource.getRepository(Restaurant);
  const menuRepo = dataSource.getRepository(Menu);
  const adressRepo = dataSource.getRepository(Adress);

  // Crear dirección
const adress = adressRepo.create({
  street: 'Av. Siempre Viva',
  number: 742,
  cityID: 1, // ← corregido
});
  await adressRepo.save(adress);

  // Crear restaurante
  const restaurant = restaurantRepo.create({
    name: "Moe's Tavern",
    image: 'https://example.com/moes.jpg',
    adress: adress,
  });
  await restaurantRepo.save(restaurant);

  // Crear menús
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
