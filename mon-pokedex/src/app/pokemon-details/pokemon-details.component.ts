import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";

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

  constructor(private route: ActivatedRoute, protected pokemonService: PokemonService) {}

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
    });
  }

  loadPokemonImageAndTypes(): void {
    this.pokemonImage = this.pokemonService.getPokemonImage(this.pokemonId);
    this.pokemonService.getPokemonTypes(this.pokemonId).subscribe((types: string[]) => {
      this.pokemonTypes = types;
    });
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
}
