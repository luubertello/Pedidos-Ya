import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-selecc',
  templateUrl: './selecc.component.html',
  styleUrls: ['./selecc.component.css']
})
export class SeleccComponent implements OnInit {

  restaurantes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('accessToken'); // 👈 obtenés el token guardado al hacer login

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` // 👈 lo ponés en el header
    });

    this.http.get<any[]>('http://localhost:3001/restaurant', { headers }).subscribe({
      next: (data) => {
        this.restaurantes = data.map(r => ({
          ...r,
          puntaje: (Math.random() * 2 + 3).toFixed(1)  // puntaje aleatorio de 3.0 a 5.0
        }));
      },
      error: (err) => console.error('Error al cargar restaurantes:', err),
    });
  }

  goToRestaurantDetail(id: number) {
    this.router.navigate(['/restaurant', id]);
  }
}
