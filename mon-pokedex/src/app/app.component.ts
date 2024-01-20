import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PokemonTabComponent} from "./pokemon-tab/pokemon-tab.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonTabComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mon-pokedex';
}
