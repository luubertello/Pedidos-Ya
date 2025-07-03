import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.css'
})

export class RestaurantComponent implements OnInit {

restaurant: any;
  menu: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`http://localhost:3001/restaurant/${id}`).subscribe({
      next: (data: any) => {
        console.log(data);
        this.restaurant = data;
        this.menu = data.menu ?? []; 
      },
      error: (err) => console.error('Error al cargar el restaurante', err)
    });
  }
}
