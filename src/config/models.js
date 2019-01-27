import { BaseModel } from 'mobx-model';
import models from 'models';

BaseModel.getModel = (modelName) => {
  return models[modelName]
}