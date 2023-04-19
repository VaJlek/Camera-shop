import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { postCouponGetDiscount } from '../api-actions';

export type DataCoupons = {
  coupon: string;
  discount: number;
  couponPostStatus: string;
};

const initialState: DataCoupons = {
  coupon: '',
  discount: 0,
  couponPostStatus: FetchStatus.Idle,
};

export const couponData = createSlice({
  name: NameSpace.Coupons,
  initialState,
  reducers: {
    setCouponPostStatus: (state, action: {payload: string}) => {
      state.couponPostStatus = action.payload;
    },
    setCoupon: (state, action: {payload: string}) => {
      state.coupon = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postCouponGetDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.couponPostStatus = FetchStatus.Success;
      })
      .addCase(postCouponGetDiscount.pending, (state) => {
        state.couponPostStatus = FetchStatus.Loading;
      })
      .addCase(postCouponGetDiscount.rejected, (state) => {
        state.discount = 0;
        state.couponPostStatus = FetchStatus.Rejected;
      });
  }
});

export const {setCouponPostStatus, setCoupon} = couponData.actions;
