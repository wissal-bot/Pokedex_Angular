import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";

@Component({
  selector: 'app-pokemon-tab',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    UpperCasePipe,
    NgClass
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

  constructor(protected pokemonService: PokemonService, private router: Router) {}

  ngOnInit(): void {
    this.loadPokemonTab(this.currentPage, this.pageSize);
  }

  loadPokemonTab(page: number, pageSize: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = page;

    this.pokemonService.getPokemonListPaginated(page, pageSize).subscribe((data: any) => {
      this.pokemonTab = data.results;
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails(): void {
    const observables = this.pokemonTab.map((pokemon: any) => {
      const pokemonId = this.extractPokemonIdFromUrl(pokemon.url);
      return this.pokemonService.getPokemonDetails(+pokemonId);
    });

    forkJoin(observables).subscribe((detailsArray: any[]) => {
      detailsArray.forEach((details: any, index: number) => {
        this.pokemonTab[index].types = details.types.map((typeSlot: any) => typeSlot.type.name);
        this.pokemonTab[index].image = this.pokemonService.getPokemonImage(this.pokemonTab[index].id);
        // Ajouter d'autres propriétés au besoin
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

  viewPokemonDetails(id: number): void {
    this.router.navigate(['/pokemon/', id]).then(r => console.log('Navigated to Pokémon Details'));
  }

  capitalizeFirstLetter(word: string): string {
    return this.pokemonService.capitalizeFirstLetter(word);
  }

  getTypeColorClass(type: string): string {
    return this.pokemonService.getTypeColorClass(type);
  }
}
