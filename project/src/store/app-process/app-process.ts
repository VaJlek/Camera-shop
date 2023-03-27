import { createSlice } from '@reduxjs/toolkit';
import { ModalState, NameSpace, REVIEWS_COUNT } from '../../const';
import { Camera, Reviews } from '../../types/types';

export type AppProcess = {
  modalState: string;
  selectedCameraId?: Camera;
  reviewsAmount: number;
  reviewsOnPage: Reviews;
  sortType: string | null;
  sortOrder: string | null;
};

const initialState: AppProcess = {
  modalState: ModalState.Closed,
  selectedCameraId: undefined,
  reviewsAmount: REVIEWS_COUNT,
  reviewsOnPage: [],
  sortType: null,
  sortOrder: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeModalState: (state, action: {payload: string}) => {
      state.modalState = action.payload;
    },
    setSelectedCamera: (state, action: {payload: Camera}) => {
      state.selectedCameraId = action.payload;
    },
    setReviewsAmount: (state, action: {payload: number}) => {
      state.reviewsAmount = action.payload;
    },
    setSortType: (state, action: {payload: string}) => {
      state.sortType = action.payload;
    },
    setSortOrder: (state, action: {payload: string}) => {
      state.sortOrder = action.payload;
    }
  }
});

export const {changeModalState, setSelectedCamera, setReviewsAmount, setSortType, setSortOrder} = appProcess.actions;
