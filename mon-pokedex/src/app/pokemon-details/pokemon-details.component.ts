import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    UpperCasePipe,
    NgClass
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemonId!: number;
  pokemonDetails: any;
  pokemonImage: string = '';
  pokemonTypes: string[] = [];

  constructor(private route: ActivatedRoute, protected pokemonService: PokemonService,private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails(): void {
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe((details: any) => {
      this.pokemonDetails = details;
      this.loadPokemonImageAndTypes();
      this.concatenateVersions();
    });
  }

  concatenateVersions(): void {
    if (this.pokemonDetails.game_indices && this.pokemonDetails.game_indices.length > 0) {
      this.concatenatedVersions = this.pokemonDetails.game_indices
        .map((gameIndex: any) => gameIndex.version.name)
        .join(' / ');
    } else {
      this.concatenatedVersions = '';
    }
  }

  loadPokemonImageAndTypes(): void {
    this.pokemonImage = this.pokemonService.getPokemonImage(this.pokemonId);
    this.pokemonService.getPokemonTypes(this.pokemonId).subscribe((types: string[]) => {
      this.pokemonTypes = types;
    });

    // Utilisation de la méthode getPokemonSprites
    this.getPokemonSprites(this.pokemonId);
  }

  getPokemonSprites(id: number): void {
    this.pokemonService.getPokemonSprites(id).subscribe(
      (data: any) => {
        this.pokemonImage = data.sprites.front_default;
      },
      (error) => {
        console.error('Error fetching Pokemon sprites', error);
      }
    );
  }
  goToHome(): void {
    this.router.navigate(['']).then(r => console.log('Navigated to home'));
  }
  concatenatedVersions: string = '';

}
