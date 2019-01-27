import { API } from 'mobx-model';
import env from './env';

API.config({
  urlRoot: env.apiRoot,

  requestHeaders() {
    return {

    };
  },
});
