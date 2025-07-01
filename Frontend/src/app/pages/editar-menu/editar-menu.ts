import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-menu',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-menu.html',
  styleUrls: ['./editar-menu.css']
})
export class EditarMenuComponent implements OnInit {
  menuForm!: FormGroup;
  restaurantId!: number;
  exito = false;
  platoCreado: any = null;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    this.menuForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      imageUrl: new FormControl('', [Validators.required]),
    });

  }

  guardarPlato() {
    if (this.menuForm.invalid) {
      this.menuForm.markAllAsTouched();
      return;
    }

    const data = {
      restaurantId: this.restaurantId,
      name: this.menuForm.value.name,
      description: this.menuForm.value.description,
      price: Number(this.menuForm.value.price),
      imageUrl: this.menuForm.value.imageUrl,
    };

    console.log('Datos enviados:', data);

    this.http.post('http://localhost:3001/menu', data).subscribe({
      next: (res) => {
        this.exito = true;
        this.platoCreado = res;
        this.menuForm.reset();
      },
      error: (err) => {
        console.error('Error al crear plato:', err);
      }
    });
  }

  agregarOtroPlato() {
    this.exito = false;
    this.platoCreado = null;
  }

  volverARestaurantes() {
    this.router.navigate(['/mis-restaurantes']);
  }
}