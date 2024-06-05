import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {
  public pokemons: Pokemon[];

  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private navController: NavController
  ) {
    this.pokemons = [];
  }

  ngOnInit() {
    this.morePokemon();
  }

  async morePokemon($event = null) {
    const promise = this.pokemonService.getPokemons();

    if (promise) {
      let loading = null;

      if (!event) {
        loading = await this.loadingController.create({
          message: 'Cargando...',
        });
        await loading.present();
      }

      promise
        .then((result: Pokemon[]) => {
          console.log(result);

          this.pokemons = this.pokemons.concat(result);

          console.log(this.pokemons);

          if ($event) {
            $event.target.complete();
          }

          setTimeout(() => {}, 5000);
          if (loading) {
            loading.dismiss();
          }
        })
        .catch((err) => {
          if ($event) {
            $event.target.complete();
          }
        });
    }
  }
  goToDetail(pokemon: Pokemon) {
    this.navParams.data['pokemon'] = pokemon;
    this.navController.navigateForward('detail-pokemon');
  }
}
