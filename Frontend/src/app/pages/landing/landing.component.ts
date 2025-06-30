import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
    constructor(private router: Router) {}
  pantalla: 'landing' | 'login-cliente' | 'login-duenio' | 'registro' = 'landing';

  LoginCliente() {
    this.router.navigate(['/login-cliente']);
  }

    LoginDueno() {
    this.router.navigate(['/login-dueño']);
  }

  Registro() {
    this.router.navigate(['/registro'])
  }
}
