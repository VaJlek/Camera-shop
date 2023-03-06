import { createSlice } from '@reduxjs/toolkit';
import { FetchStatus, NameSpace } from '../../const';
import { Reviews } from '../../types/types';
import { fetchReviewsAction, postReviewAction } from '../api-actions';

export type ReviewsData = {
  reviews: Reviews;
  reviewPostStatus: string;
};

const initialState: ReviewsData = {
  reviews: [],
  reviewPostStatus: FetchStatus.Idle,
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewPostStatus = FetchStatus.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviewPostStatus = FetchStatus.Success;
        state.reviews.pop();
        action.payload && state.reviews.unshift(action.payload);
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewPostStatus = FetchStatus.Rejected;
      });
  }
});
