import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../types/state';
import { Camera, Cameras, Promo } from '../types/types';
import { APIRoute } from '../const';
import { loadCamera, loadCameras, loadPromo } from './action';

export const fetchPromoAction = createAsyncThunk<void, undefined, {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
  }>(
    'fetchPromo',
    async (_arg, { dispatch, extra: api }) => {
      try {
        const { data } = await api.get<Promo>(APIRoute.Promo);
        dispatch(loadPromo(data));
      } catch (error) {
        toast.error('Loading promo error');
        throw error;
      }
    });

export const fetchCamerasAction = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCameras', async (_arg, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Cameras>(APIRoute.Cameras);
    dispatch(loadCameras(data));
  } catch (error) {
    toast.error('Loading cameras error');
    throw error;
  }
});

export const fetchCameraAction = createAsyncThunk<
  void,
  number,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('fetchCamera', async (cameraId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
    dispatch(loadCamera(data));
  } catch (error) {
    toast.error('Loading camera error');
    throw error;
  }
});
