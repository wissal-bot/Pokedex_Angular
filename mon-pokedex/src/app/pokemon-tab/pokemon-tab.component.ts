import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import {NgForOf, NgIf} from "@angular/common";
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './pokemon-tab.component.html',
  styleUrls: ['./pokemon-tab.component.css']
})
export class PokemonTabComponent implements OnInit {
  pokemonTab: any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // Récupération des 10 premiers pokemon au chargement de la page
    this.loadPokemonTab(0, 10);
  }

  // Chargement tab pokemon
  loadPokemonTab(offset: number, limit: number): void {
    this.pokemonService.getPokemonTab(offset, limit).subscribe((data: any) => {
      this.pokemonTab = data.results;
      // Charger les détails des types pour chaque Pokémon
      this.loadPokemonTypes();
    });
  }

  // URL de l'image du pokemon
  getPokemonImage(url: string): string {
    const pokemonId = this.extractPokemonIdFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

  // Type pokemon
  loadPokemonTypes(): void {
    const observables = this.pokemonTab.map((pokemon: any) => {
      const pokemonId = this.extractPokemonIdFromUrl(pokemon.url);
      return this.pokemonService.getPokemonDetails(+pokemonId);
    });

    forkJoin(observables).subscribe((detailsArray: any[]) => {
      detailsArray.forEach((details: any, index: number) => {
        this.pokemonTab[index].types = details.types.map((typeSlot: any) => typeSlot.type.name);
      });
    });
  }

  // Extraction ID
  private extractPokemonIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
