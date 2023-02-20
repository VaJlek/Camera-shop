import { createReducer } from '@reduxjs/toolkit';
import { Camera, Cameras, Promo } from '../types/types';
import { loadCamera, loadCameras, loadPromo } from './action';

type InitialState = {
  promo: Promo | null;
  cameras: Cameras | null;
  camera: Camera | null;
  currentPage: number;
}

const initialState: InitialState = {
  promo: null,
  cameras: null,
  camera: null,
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
    });
});

export { reducer };
