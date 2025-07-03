import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';

interface Restaurante {
  id: number;
  name: string;
  imageUrl: string;
  address: {
    street: string;
    number: number;
  };
}

@Component({
  selector: 'app-mis-restaurantes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-restaurantes.html',
  styleUrls: ['./mis-restaurantes.css'],
})
export class MisRestaurantes implements OnInit {
  restaurantes: Restaurante[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
  const token = localStorage.getItem('accessToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  this.http.get<any[]>('http://localhost:3001/restaurant/mis', { headers }).subscribe({
    next: (data) => this.restaurantes = data,
    error: (err) => console.error('Error al cargar restaurantes:', err),
  });
}


  editarRestaurante(id: number) {
    this.router.navigate(['/editar-restaurante', id]);
  }

  eliminarRestaurante(id: number) {
    if (confirm('¿Querés eliminar este restaurante?')) {
      this.http.delete(`http://localhost:3001/restaurant/${id}`).subscribe({
        next: () => {
          this.restaurantes = this.restaurantes.filter(r => r.id !== id);
        },
        error: (err) => console.error('Error al eliminar', err),
      });
    }
  }

  crearRestaurante(event: Event) {
    event.preventDefault(); // Evita que recargue la página
    this.router.navigate(['/crear-restaurante']);
  }

}
