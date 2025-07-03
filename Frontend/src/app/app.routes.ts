import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component'; 
import { SeleccComponent} from './pages/selecc/selecc.component'
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { MisRestaurantes } from './pages/mis-restaurantes/mis-restaurantes';
import { CrearRestauranteComponent } from './pages/crear-restaurante/crear-restaurante';
import { LoginDueñoComponent } from './pages/LoginDueño/loginDueño';
import { EditarMenuComponent } from './pages/editar-menu/editar-menu';
import { EditarRestaurante } from './pages/editar-restaurante/editar-restaurante';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login-cliente', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'inicio', component: HomeComponent },
  { path: 'selecc', component: SeleccComponent },
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: 'mis-restaurantes', component: MisRestaurantes },
  { path: 'crear-restaurante', component: CrearRestauranteComponent },
  { path: 'login-dueño', component: LoginDueñoComponent },
  { path: 'editar-menu', component: EditarMenuComponent },
  { path: 'editar-menu/:id', component: EditarMenuComponent },
  { path: 'editar-restaurante/:id',
  loadComponent: () => import('./pages/editar-restaurante/editar-restaurante')
    .then(m => m.EditarRestaurante)},
  { path: 'editar-restaurante', component: EditarRestaurante},
  { path: 'restaurant/:id', component: RestaurantComponent },
  { path: '**', redirectTo: '' }
];
