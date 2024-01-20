import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    UpperCasePipe
  ],
  templateUrl: './pokemon-tab.component.html',
  styleUrls: ['./pokemon-tab.component.css']
})

export class PokemonTabComponent implements OnInit {
  pokemonTab: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalResults = 100;
  totalPages = Math.ceil(this.totalResults / this.pageSize);

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemonTab(this.currentPage, this.pageSize);
  }

  loadPokemonTab(page: number, pageSize: number): void {
    if (page < 1 || page > this.totalPages) {
      return; // Ne charge pas de résultats pour les pages hors limites
    }

    this.currentPage = page;

    this.pokemonService.getPokemonListPaginated(page, pageSize).subscribe((data: any) => {
      this.pokemonTab = data.results;
      this.loadPokemonTypes();
    });
  }

  getPokemonImage(url: string): string {
    const pokemonId = this.extractPokemonIdFromUrl(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
  }

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

  private extractPokemonIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  // Pagination

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.loadPokemonTab(this.currentPage - 1, this.pageSize);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.loadPokemonTab(this.currentPage + 1, this.pageSize);
    }
  }
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
