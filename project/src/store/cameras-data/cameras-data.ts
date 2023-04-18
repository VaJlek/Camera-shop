import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Camera, Cameras, CamerasInBasket, CamerasPriceRange } from '../../types/types';
import { fetchCamerasAction, fetchSimilarCamerasAction, fetchCameraAction, fetchCamerasBySearchAction, fetchPriceRangeAction } from '../api-actions';

export type CamerasData = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
  camera?: Camera;
  cameraFetchStatus: string;
  similar: Cameras;
  camerasByName: Cameras;
  priceRange: CamerasPriceRange;
  priceRangeFetchStatus: string;
  currentSearchParams: [string, string][];
  camerasInBasket: CamerasInBasket;
};

const initialState: CamerasData = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
  camera: undefined,
  cameraFetchStatus: FetchStatus.Idle,
  similar: [],
  camerasByName: [],
  priceRange: {camerasMinPrice: 0, camerasMaxPrice: 0},
  priceRangeFetchStatus: FetchStatus.Idle,
  currentSearchParams: [],
  camerasInBasket: [],
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    setCurrentSearchParams: (state, action: {payload: [string, string][]}) => {
      state.currentSearchParams = action.payload;
    },
    setCamerasInBasket: (state, action: {payload: CamerasInBasket | []}) => {
      state.camerasInBasket = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasAction.pending, (state) => {
        state.camerasFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCamerasAction.fulfilled, (state, action) => {
        state.cameras = action.payload.data;
        state.camerasTotalCount = Number(action.payload.camerasTotalCount);
        state.camerasFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCamerasAction.rejected, (state) => {
        state.cameras = [];
        state.camerasFetchStatus = FetchStatus.Rejected;
      })
      .addCase(fetchCameraAction.pending, (state) => {
        state.cameraFetchStatus = FetchStatus.Loading;
      })
      .addCase(fetchCameraAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.cameraFetchStatus = FetchStatus.Success;
      })
      .addCase(fetchCameraAction.rejected, (state) => {
        state.camera = undefined;
        state.cameraFetchStatus = FetchStatus.Rejected;
      })
      .addCase(fetchSimilarCamerasAction.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(fetchCamerasBySearchAction.fulfilled, (state, action) => {
        state.camerasByName = action.payload;
      })
      .addCase(fetchPriceRangeAction.fulfilled, (state, action) => {
        state.priceRange = action.payload;
        state.priceRangeFetchStatus = FetchStatus.Success;
      });
  }
});

export const {setCurrentSearchParams, setCamerasInBasket} = camerasData.actions;
