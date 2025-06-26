import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  pantalla: 'landing' | 'login-cliente' | 'login-duenio' | 'registro' = 'landing';

  mostrarPantalla(p: 'landing' | 'login-cliente' | 'login-duenio' | 'registro') {
    this.pantalla = p;
  }
}

