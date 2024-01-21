import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import {NgIf} from "@angular/common";
@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})

export class PokemonDetailsComponent implements OnInit {
  pokemonId!: number;
  pokemonDetails: any;

  constructor(private route: ActivatedRoute, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.pokemonId = +params['id'];
      this.loadPokemonDetails();
    });
  }

  loadPokemonDetails(): void {
    this.pokemonService.getPokemonDetails(this.pokemonId).subscribe((details: any) => {
      this.pokemonDetails = details;
    });
  }
}

