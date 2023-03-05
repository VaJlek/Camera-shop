import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../types/state';
import { Camera, Cameras, Promo, ReviewPost, Reviews } from '../types/types';
import { APIRoute } from '../const';
import { loadCamera, loadCameras, loadPromo, loadReviews, loadSimilarCameras, postReview } from './action';

export const fetchPromoAction = createAsyncThunk<
  void,
  undefined,
  {
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
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCameras',
    async (_arg, { dispatch, extra: api }) => {
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
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCamera',
    async (cameraId, { dispatch, extra: api }) => {
      try {
        const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
        dispatch(loadCamera(data));
      } catch (error) {
        toast.error('Loading camera error');
        throw error;
      }
    });

export const fetchReviewsAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchReviews',
    async (cameraId, { dispatch, extra: api }) => {
      try {
        const { data } = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/reviews`);
        dispatch(loadReviews(data));
      } catch (error) {
        toast.error('Loading review error');
        throw error;
      }
    });

export const fetchSimilarCamerasAction = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchSimilarCameras', async (cameraId, { dispatch, extra: api }) => {
      try {
        const { data } = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
        dispatch(loadSimilarCameras(data));
      } catch (error) {
        toast.error('Loading similar cameras error');
        throw error;
      }
    });

export const postReviewAction = createAsyncThunk<
  void,
  ReviewPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'postReview', async (
      { userName, advantage, disadvantage, review, rating, cameraId },
      { dispatch, extra: api },
    ) => {
      try {
        await api.post<ReviewPost>(APIRoute.Reviews, {
          userName,
          advantage,
          disadvantage,
          review,
          rating,
          cameraId,
        });
        dispatch(postReview());
      } catch (error) {
        toast.error('Send rewiew error');
        throw error;
      }
    },
  );
