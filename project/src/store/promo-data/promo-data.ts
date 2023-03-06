import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Promo } from '../../types/types';
import { fetchPromoAction } from '../api-actions';

export type PromoData = {
  promo: Promo | null;
  promoFetchStatus: string;
};

const initialState: PromoData = {
  promo: null,
  promoFetchStatus: FetchStatus.Idle,
};

export const promoData = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoAction.pending, (state) => {
        state.promoFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promo = action.payload;
        state.promoFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.promo = null;
        state.promoFetchStatus = FetchStatus.Rejected;
      });
  }
});
