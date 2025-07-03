
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ← añade Router
import { ApiService } from '../../services/api.service';

interface Local {
  id: number;
  name: string;
  adress: string;
  rating: number;
  imgUrl: string;
}

@Component({
  selector: 'app-selecc',
  templateUrl: './selecc.component.html',
  styleUrls: ['./selecc.component.css'],
})
export class SeleccComponent implements OnInit {
  locals: Local[] = [];
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (!id) {
      this.error = 'ID de tipo (restaurantes/mercados/…) faltante';
      return;
    }
    this.loading = true;
    try {
      // Traigo los locales del tipo seleccionado (ejemplo endpoint /menu?restaurantId=…)
      this.locals = await this.api.getMenuByRestaurant(id.toString());
      // Si tu endpoint devuelve directamente restaurantes, ajusta: getRestaurants()
    } catch (err: any) {
      this.error = err.message || 'Error cargando locales';
    } finally {
      this.loading = false;
    }
  }

  goToRestaurantDetail(id: number) {
    this.router.navigate(['/restaurant', id]);
  }
}
