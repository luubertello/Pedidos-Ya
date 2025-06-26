import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-registro',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroExitoso = false;

  onSubmit() {
    this.registroExitoso = true;
  }
}


