import { BaseModel, API } from 'mobx-model';
import BPromise from 'bluebird';

import url from 'url';
import { compact, sortBy } from 'lodash';

const POKEMON_LIST_API_URL = '/pokemon';

class Pokemon extends BaseModel {
  static attributes = {
    sprites: '',
    name: '',
    types: {},
    weight: '',
  };
}

Pokemon.addClassAction('fetchList', function(params) {
  return new BPromise((resolve, reject) => {
    API.request({
      endpoint: POKEMON_LIST_API_URL,
      data: params,
    }).then(response => {
      const { results } = response.body;

      const pokemonIds = results.map(pokemon => {
        const urlArray = compact(url.parse(pokemon.url).path.split('/'));

        return urlArray[urlArray.length - 1];
      });

      const pokemonFetchPromises = pokemonIds.map(id =>
        Pokemon.fetchPokemonByIdOrName({
          pokemonIdOrName: id,
        }),
      );

      Promise.all(pokemonFetchPromises).then(res => resolve(res));
    });
  });
});

Pokemon.addClassAction('fetchPokemonByIdOrName', function({ pokemonIdOrName }) {
  return new BPromise((resolve, reject) => {
    API.request({
      endpoint: `${POKEMON_LIST_API_URL}/${pokemonIdOrName}`,
    }).then(response => {
      const { name, sprites, id, types, weight } = response.body;

      const pokemonModel = {
        id,
        name,
        sprites,
        types,
        weight,
      };

      this.set({
        modelJson: pokemonModel,
      });

      return resolve(pokemonModel);
    }).catch(err => reject([]));
  });
});

export default Pokemon;

window.Pokemon = Pokemon;
