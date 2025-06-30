import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import 'leaflet-control-geocoder';
import * as L from 'leaflet';

@Component({
  selector: 'app-crear-restaurante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  templateUrl: './crear-restaurante.html',
  styleUrls: ['./crear-restaurante.css']
})
export class CrearRestauranteComponent implements OnInit, AfterViewInit {
  constructor(private http: HttpClient) {}
  restauranteForm!: FormGroup;

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

    this.http.post('http://localhost:3001/restaurant', data)
      .subscribe({
        next: (response) => {
          console.log('Guardado exitoso:', response);
        },
        error: (error) => {
          console.error('Error al guardar:', error);
        }
      });
  }
}

