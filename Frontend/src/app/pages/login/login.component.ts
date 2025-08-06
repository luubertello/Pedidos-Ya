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
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginClienteForm!: FormGroup;
  mensajeError: string = '';
  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

    ngOnInit() {
    this.loginClienteForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  iniciarSesion() {
    if (this.loginClienteForm.invalid) return;

  this.authService.login(this.loginClienteForm.value).subscribe({
    next: (response) => {
      this.mensajeError = '';
      this.router.navigate(['/inicio']);
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