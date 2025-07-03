import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { GlobalStatusService } from '../../services/global-status.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

export class HomeComponent implements OnInit {
  restaurants: any[] = [];

  constructor(
    private api: ApiService,
    private router: Router        
  ) {}

  ngOnInit() {
    this.api.getRestaurants().then(data => this.restaurants = data);
  }

  // ← método que llamaremos desde el template
  goToSelecc() {
    this.router.navigate(['/selecc']);
  }

 
  goToRestaurant(id: number) {
    this.router.navigate(['/restaurant', id]);
  }

}