import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  // Récupération Tableau de Pokémons
  getPokemonTab(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl}?offset=${offset}&limit=${limit}`;
    console.log('API URL for Pokémon List:', url);
    return this.http.get(url);
  }

  // Récupération Détails d'un Pokémon
  getPokemonDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/`;
    console.log('API URL for Pokémon Details:', url);
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
          id: offset + index + 1
        }));
        return { ...response, results: pokemonListWithId };
      })
    );
  }

  // Récupération des types d'un Pokémon
  getPokemonTypes(id: number): Observable<string[]> {
    const url = `${this.apiUrl}/${id}/`;
    return this.http.get(url).pipe(
      map((response: any) => {
        const types = response.types.map((typeSlot: any) => typeSlot.type.name);
        return types;
      })
    );
  }

  // Récupération de l'image d'un Pokémon
  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  // Fonction pour obtenir la classe de couleur en fonction du type
  getTypeColorClass(type: string): string {
    switch (type.toLowerCase()) {
      case 'normal':
        return 'normal-type';
      case 'grass':
        return 'grass-type';
      case 'fire':
        return 'fire-type';
      case 'water':
        return 'water-type';
      case 'electric':
        return 'electric-type';
      case 'ice':
        return 'ice-type';
      case 'fighting':
        return 'fighting-type';
      case 'poison':
        return 'poison-type';
      case 'ground':
        return 'ground-type';
      case 'flying':
        return 'flying-type';
      case 'psychic':
        return 'psychic-type';
      case 'bug':
        return 'bug-type';
      case 'rock':
        return 'rock-type';
      case 'ghost':
        return 'ghost-type';
      case 'dragon':
        return 'dragon-type';
      case 'dark':
        return 'dark-type';
      case 'steel':
        return 'steel-type';
      case 'fairy':
        return 'fairy-type';
      case 'stellar':
        return 'stellar-type';
      default:
        return 'default-type';
    }
  }
  // letters capital
  capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  getPokemonSprites(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }
}
