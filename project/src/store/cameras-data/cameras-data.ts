import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Camera, Cameras, PriceRange } from '../../types/types';
import { fetchCamerasAction, fetchSimilarCamerasAction, fetchCameraAction } from '../api-actions';

export type CamerasData = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
  product: Camera | undefined;
  productFetchStatus: string;
  similar: Cameras;
  camerasByName: Cameras;
  priceRange: PriceRange;
  priceRangeFetchStatus: string;
  carrentSearchParams: [string, string][];
};

const initialState: CamerasData = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
  product: undefined,
  productFetchStatus: FetchStatus.Idle,
  similar: [],
  camerasByName: [],
  priceRange: {MinPrice: 0, MaxPrice: 0},
  priceRangeFetchStatus: FetchStatus.Idle,
  carrentSearchParams: [],
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setCarrentSearchParams: (state, action: {payload: [string, string][]}) => {
      state.carrentSearchParams = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.camerasFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras = [];
        state.camerasFetchStatus = FetchStatus.Rejected;
      })
      .addCase(fetchCameraAction.pending, (state) => {
        state.productFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.productFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.product = undefined;
        state.productFetchStatus = FetchStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      });
  }
});

export const {setCarrentSearchParams} = camerasData.actions;
