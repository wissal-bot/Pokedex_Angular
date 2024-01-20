import { Routes } from '@angular/router';
import { PokemonTabComponent } from './pokemon-tab/pokemon-tab.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

export const routes: Routes = [
  { path: '', component: PokemonTabComponent },
  { path: 'pokemon/:id', component: PokemonDetailsComponent },
];
