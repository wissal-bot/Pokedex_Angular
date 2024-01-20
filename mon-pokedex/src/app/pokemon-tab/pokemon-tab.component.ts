import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './pokemon-tab.component.html',
  styleUrls: ['./pokemon-tab.component.css']
})
export class PokemonTabComponent implements OnInit {
  pokemonTab: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // Récupération des 10 premier pokemon au chargement de la page
    this.loadPokemonTab(0, 10);
  }

  //Chargement tab pokemon
  loadPokemonTab(offset: number, limit: number): void {
    this.pokemonService.getPokemonTab(offset, limit).subscribe((data: any) => {
      this.pokemonTab = data.results;
    });
  }
}
