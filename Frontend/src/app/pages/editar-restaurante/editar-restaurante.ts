import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-restaurante',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-restaurante.html',
  styleUrls: ['./editar-restaurante.css']
})
export class EditarRestaurante implements OnInit {
  restaurante: any;
  menus: any[] = [];

  // Flags edición restaurante
  editandoNombreRestaurante = false;
  editandoImageUrlRestaurante = false;

  editandoAddressFields: { [key: string]: boolean } = {
    street: false,
    number: false,
    cityID: false,
    lat: false,
    lng: false,
  };

  // Flags edición menú
  editandoCamposMenu: { [menuId: number]: { [campo: string]: boolean } } = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarDatos(+id);
    }
  }

  cargarDatos(id: number) {
    this.http.get(`http://localhost:3001/restaurant/${id}`).subscribe((res: any) => {
      this.restaurante = res;
    });

    this.http.get<any[]>(`http://localhost:3001/menu/restaurant/${id}`).subscribe((res) => {
      console.log('Menus recibidos:', res);
      this.menus = res;
      this.inicializarEditables(res);
    });
  }


  inicializarEditables(menus: any[]) {
    this.editandoCamposMenu = {};
    menus.forEach(menu => {
      this.editandoCamposMenu[menu.id] = {
        name: false,
        description: false,
        price: false,
        imageUrl: false,
      };
    });
  }

  habilitarCampoRestaurante(campo: 'name' | 'imageUrl') {
    if (campo === 'name') this.editandoNombreRestaurante = true;
    if (campo === 'imageUrl') this.editandoImageUrlRestaurante = true;
  }

  habilitarCampoAddress(campo: string) {
    this.editandoAddressFields[campo] = true;
  }

  habilitarCampoMenu(menuId: number, campo: string) {
    if (!this.editandoCamposMenu[menuId]) {
      this.editandoCamposMenu[menuId] = {};
    }
    this.editandoCamposMenu[menuId][campo] = true;
  }

guardarCambiosRestaurante() {
  const restaurantId = this.restaurante.id;

  // Armar el body respetando la estructura que espera el backend
  const body = {
    name: this.restaurante.name,
    imageUrl: this.restaurante.imageUrl,
    address: {
      street: this.restaurante.address.street,
      number: this.restaurante.address.number,
      cityID: this.restaurante.address.cityID,
      location: {
        lat: this.restaurante.address.lat,
        lng: this.restaurante.address.lng,
      }
    }
  };

  this.http.put(`http://localhost:3001/restaurant/${restaurantId}`, body).subscribe({
    next: () => {
      alert('Restaurante actualizado');
      this.editandoNombreRestaurante = false;
      this.editandoImageUrlRestaurante = false;
      for (const key in this.editandoAddressFields) {
        this.editandoAddressFields[key] = false;
      }
    },
    error: (err) => {
      console.error('Error actualizando restaurante:', err);
      alert('Error al actualizar restaurante, revisar consola.');
    }
  });
}


  guardarMenu(menu: any) {
    this.http.put(`http://localhost:3001/menu/${menu.id}`, menu).subscribe(() => {
      alert(`Menú "${menu.name}" actualizado`);
      if (this.editandoCamposMenu[menu.id]) {
        for (const key in this.editandoCamposMenu[menu.id]) {
          this.editandoCamposMenu[menu.id][key] = false;
        }
      }
    });
  }

  eliminarMenu(menuId: number) {
  if (confirm('¿Estás seguro que querés eliminar este menú?')) {
    this.http.delete(`http://localhost:3001/menu/${menuId}`).subscribe({
      next: () => {
        alert('Menú eliminado');
        this.menus = this.menus.filter(menu => menu.id !== menuId);
      },
      error: (err) => {
        console.error('Error eliminando menú:', err);
        alert('No se pudo eliminar el menú');
      }
    });
  }
}

irAEditarMenu() {
  this.router.navigate(['/editar-menu', this.restaurante.id]);
}
}