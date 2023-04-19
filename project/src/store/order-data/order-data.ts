import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { postOrderAction } from '../api-actions';

export type OrderData = {
  orderPostStatus: string;
};

const initialState: OrderData = {
  orderPostStatus: FetchStatus.Idle,
};

export const orderData = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    setOrderPostStatus: (state, action: {payload: string}) => {
      state.orderPostStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrderAction.fulfilled, (state) => {
        state.orderPostStatus = FetchStatus.Success;
      })
      .addCase(postOrderAction.pending, (state) => {
        state.orderPostStatus = FetchStatus.Loading;
      })
      .addCase(postOrderAction.rejected, (state) => {
        state.orderPostStatus = FetchStatus.Rejected;
      });
  }
});

export const {setOrderPostStatus} = orderData.actions;
