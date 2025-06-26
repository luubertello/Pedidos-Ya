import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'pedidos-ya';
}
