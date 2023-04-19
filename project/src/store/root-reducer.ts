import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appProcess } from './app-process/app-process';
import { camerasData } from './cameras-data/cameras-data';
import { promoData } from './promo-data/promo-data';
import { reviewsData } from './rewiews-data/rewiews-data';
import { orderData } from './order-data/order-data';
import { couponData } from './coupone-data/coupon-data';

export const rootReducer = combineReducers({
  [NameSpace.App]: appProcess.reducer,
  [NameSpace.Promo]: promoData.reducer,
  [NameSpace.Cameras]: camerasData.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
  [NameSpace.Order]: orderData.reducer,
  [NameSpace.Coupons]: couponData.reducer,
});
