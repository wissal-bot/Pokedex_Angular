import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  // Récupération Tableau de Pokémons
  getPokemonTab(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    console.log('API URL for Pokémon List:', url); // Ajout de log
    return this.http.get(url);
  }

  // Récupération Détails d'un Pokémon
  getPokemonDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    console.log('API URL for Pokémon Details:', url); // Ajout de log
    return this.http.get(url);
  }

  // Pagination
  getPokemonListPaginated(page: number, pageSize: number): Observable<any> {
    const offset = (page - 1) * pageSize;
    const limit = Math.min(pageSize, 100 - offset);
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const pokemonListWithId = response.results.map((pokemon: any, index: number) => ({
          ...pokemon,
          id: offset + index + 1 // Calculate the ID based on offset and index
        }));
        return { ...response, results: pokemonListWithId };
      })
    );
  }
  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
  getPokemonTypes(id: number): Observable<string[]> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const types = response.types.map((typeSlot: any) => typeSlot.type.name);
        return types;
      })
    );
  }
}



