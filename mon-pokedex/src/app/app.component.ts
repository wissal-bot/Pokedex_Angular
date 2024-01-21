import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {PokemonTabComponent} from "./pokemon-tab/pokemon-tab.component";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";
import {PokemonService} from "./pokemon.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PokemonTabComponent,PokemonDetailsComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [PokemonService]
})
export class AppComponent {
  title = 'mon-pokedex';
}
