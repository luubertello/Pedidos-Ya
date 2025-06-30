import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      usuario: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      terminos: new FormControl(false, Validators.requiredTrue)
    });
  }

  onSubmit() {
    if (this.registroForm.invalid) return;
    const { email, password } = this.registroForm.value;

    this.authService.register({ email, password }).subscribe({
      next: () => {
        this.error = null;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Error al registrar usuario';
        console.error(err);
      }
    });
  }
}