import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
    constructor(private http: HttpClient) {}
  loginClienteForm!: FormGroup;

    ngOnInit() {
    this.loginClienteForm = new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  iniciarSesion() {
    if (this.loginClienteForm.valid) {
      const datos = this.loginClienteForm.value;
      console.log('Login:', datos);
      // Acá hacés la llamada al backend o lo que necesites
    } else {
      // Marca los campos como tocados para mostrar los errores
      this.loginClienteForm.markAllAsTouched();
    }
  }
}