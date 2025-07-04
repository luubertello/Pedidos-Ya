import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'leaflet-control-geocoder';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-crear-restaurante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './crear-restaurante.html',
  styleUrls: ['./crear-restaurante.css']
})
export class CrearRestauranteComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient, private router: Router) {}
  restauranteForm!: FormGroup;
  restauranteCreado: boolean = false;
  restauranteId!: number; 

  lat: number = -34.6;
  lng: number = -58.4;

  ngOnInit() {
    this.restauranteForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      street: new FormControl('', Validators.required),
      number: new FormControl(null, [Validators.required, Validators.min(1)]),
      cityID: new FormControl(null, Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

ngAfterViewInit(): void {
  // Crear el mapa y centrarlo
  const map = L.map('mapa').setView([this.lat, this.lng], 13);

  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/marker-icon-2x.png',
  iconUrl: 'assets/marker-icon.png',
  shadowUrl: 'assets/marker-shadow.png',
});

  // Agregar capa de OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Crear marcador draggable
  const marker = L.marker([this.lat, this.lng], { draggable: true }).addTo(map);

  // Actualizar lat/lng al mover el marcador
  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    this.lat = pos.lat;
    this.lng = pos.lng;
  });

  // Control de búsqueda (geocoder) - cast a any para evitar errores TS
    const geocoderControl = (L.Control as any).geocoder({
      placeholder: 'Buscar dirección...',
      defaultMarkGeocode: true,
      position: 'topright' // Cambiar posición
    }).addTo(map);


  // Cuando el geocoder encuentra una ubicación, mueve el marcador y el mapa
  geocoderControl.on('markgeocode', (e: any) => {
    const latlng = e.geocode.center;
    marker.setLatLng(latlng);
    map.setView(latlng, 13);
    this.lat = latlng.lat;
    this.lng = latlng.lng;
  });
}

  guardarRestaurante() {
    if (this.restauranteForm.invalid) {
      this.restauranteForm.markAllAsTouched();
      return;
    }
    
    const data = {
      name: this.restauranteForm.value.name,
      address: {
        street: this.restauranteForm.value.street,
        number: this.restauranteForm.value.number,
        cityID: this.restauranteForm.value.cityID,
        location: {
          lat: this.lat,
          lng: this.lng,
        },
      },
      imageUrl: this.restauranteForm.value.imageUrl,
    };

    console.log('Datos enviados:', data);
    
    const token = localStorage.getItem('accessToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http.post<{ id: number }>(
      'http://localhost:3001/restaurant',
      data,
      { headers }
    ).subscribe({
      next: (response) => {
        console.log('Guardado exitoso:', response);
        this.restauranteId = response.id;
        this.restauranteCreado = true;
      },
      error: (error) => {
        console.error('Error al guardar:', error);
      }
    });
  }
  
  irAMenu() {
    console.log('Ir a menú restaurante con id:', this.restauranteId);
    if (!this.restauranteId) {
      console.error('No hay restaurante creado para ir al menú');
      return;
    }
    this.router.navigate(['/editar-menu', this.restauranteId]);
  }
}

