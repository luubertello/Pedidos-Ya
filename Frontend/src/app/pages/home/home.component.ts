import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sugerencias: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Cargar restaurantes con id 1 y 2
    const ids = [1, 2];
    const requests = ids.map(id =>
      this.http.get(`http://localhost:3001/restaurant/${id}`)
    );

    // Hacer todas las peticiones y esperar que terminen
    Promise.all(requests.map(req => req.toPromise()))
      .then(results => {
        this.sugerencias = results;
      })
      .catch(error => console.error('Error al cargar sugerencias', error));
  }

  goToRestaurant(id: number) {
    this.router.navigate(['/restaurant', id]);
  }

  goToSelecc() {
  this.router.navigate(['/selecc']);
  }
}
