import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component'; 
import { SeleccComponent} from './pages/selecc/selecc.component'
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { MisRestaurantes } from './pages/mis-restaurantes/mis-restaurantes';
import { CrearRestauranteComponent } from './pages/crear-restaurante/crear-restaurante';
import { loginDueñoComponent } from './pages/LoginDueño/loginDueño';
import { EditarMenu } from './pages/editar-menu/editar-menu';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login-cliente', component: LoginComponent },
  { path: 'registro', component: RegistroComponent }, 
  { path: 'inicio', component: HomeComponent },
  { path: 'selecc', component: SeleccComponent },
  { path: 'restaurantes', component: RestaurantComponent },
  { path: 'mis-restaurantes', component: MisRestaurantes },
  { path: 'crear-restaurante', component: CrearRestauranteComponent },
  { path: 'login-dueño', component: loginDueñoComponent },
  { path: 'editar-menu', component: EditarMenu },
  { path: '**', redirectTo: '' }
];
