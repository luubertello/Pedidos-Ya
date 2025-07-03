import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './loginDueño.html',
  styleUrl: './loginDueño.css'
})
export class LoginDueñoComponent implements OnInit {
  loginDuenoForm!: FormGroup;
  mensajeError: string = '';
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

    ngOnInit() {
    this.loginDuenoForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  iniciarSesion() {
    if (this.loginDuenoForm.invalid) return;
    console.log(this.loginDuenoForm.value);
  this.authService.login(this.loginDuenoForm.value).subscribe({
    next: (response) => {
      this.mensajeError = '';
      this.router.navigate(['/mis-restaurantes']);
    },
    error: (error) => {
      if (error.status === 401) {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      } else {
        this.mensajeError = 'Error en el servidor, intente más tarde';
      }
    }
  });
  }
}