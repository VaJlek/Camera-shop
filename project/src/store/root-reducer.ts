import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasData } from './cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './rewiews-data/rewiews-data';

export const rootReducer = combineReducers({
  //[NameSpace.App]: appProcess.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
