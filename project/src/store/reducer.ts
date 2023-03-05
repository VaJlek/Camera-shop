import { createReducer } from '@reduxjs/toolkit';
import { Camera, Cameras, Promo, Reviews } from '../types/types';
import { loadCamera, loadCameras, loadPromo, loadReviews, loadSimilarCameras } from './action';

type InitialState = {
  promo: Promo | null;
  cameras: Cameras | null;
  camera: Camera | null;
  reviews: Reviews | null;
  similarCameras: Cameras | null;
  currentPage: number;
}

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
  reviews: null,
  similarCameras: null,
  currentPage: 1,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadPromo, (state, action) => {
      state.promo = action.payload;
    })
    .addCase(loadCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(loadCamera, (state, action) => {
      state.camera = action.payload;
    })
    .addCase(loadSimilarCameras, (state, action) => {
      state.similarCameras = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    });
});

export { reducer };
