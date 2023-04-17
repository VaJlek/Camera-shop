import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, FetchStatus } from '../../const';
import { Camera, Cameras } from '../../types/types';
import { fetchCamerasAction, fetchSimilarCamerasAction, fetchCameraAction, fetchCamerasBySearchAction } from '../api-actions';

export type CamerasData = {
  cameras: Cameras;
  camerasFetchStatus: string;
  camerasTotalCount: number;
  camera?: Camera;
  cameraFetchStatus: string;
  similar: Cameras;
  camerasByName: Cameras;
};

const initialState: CamerasData = {
  cameras: [],
  camerasFetchStatus: FetchStatus.Idle,
  camerasTotalCount: 0,
  camera: undefined,
  cameraFetchStatus: FetchStatus.Idle,
  similar: [],
  camerasByName: [],
};

export const camerasData = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
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
      });
  }
});


