import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { AppDispatch, State } from '../types/state';
import { Camera, Cameras, Promo, Review, ReviewPost, Reviews } from '../types/types';
import { APIRoute } from '../const';

export const fetchPromoAction = createAsyncThunk<
  Promo,
  undefined,
  {
   dispatch: AppDispatch;
   state: State;
   extra: AxiosInstance;
  }>(
    'fetchPromo',
    async (_arg, { extra: api }) => {
      try {
        const { data } = await api.get<Promo>(APIRoute.Promo);
        return data;
      } catch (error) {
        toast.error('Loading promo error');
        throw error;
      }
    });

export const fetchCamerasAction = createAsyncThunk<
  Cameras,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCameras',
    async (_arg, { extra: api }) => {
      try {
        const { data } = await api.get<Cameras>(APIRoute.Cameras);
        return data;
      } catch (error) {
        toast.error('Loading cameras error');
        throw error;
      }
    });

export const fetchCameraAction = createAsyncThunk<
  Camera,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCamera',
    async (cameraId, { extra: api }) => {
      try {
        const { data } = await api.get<Camera>(`${APIRoute.Cameras}/${cameraId}`);
        return data;
      } catch (error) {
        toast.error('Loading camera error');
        throw error;
      }
    });

export const fetchReviewsAction = createAsyncThunk<
  Reviews,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchReviews',
    async (cameraId, { extra: api }) => {
      try {
        const { data } = await api.get<Reviews>(`${APIRoute.Cameras}/${cameraId}/reviews?_sort=createAt&_order=desc`);
        return data;
      } catch (error) {
        toast.error('Loading review error');
        throw error;
      }
    });

export const fetchSimilarCamerasAction = createAsyncThunk<
  Cameras,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchSimilarCameras', async (cameraId, { extra: api }) => {
      try {
        const { data } = await api.get<Cameras>(`${APIRoute.Cameras}/${cameraId}/similar`);
        return data;
      } catch (error) {
        toast.error('Loading similar cameras error');
        throw error;
      }
    });

export const postReviewAction = createAsyncThunk<
  Review,
  ReviewPost,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'postReview', async (
      { userName, advantage, disadvantage, review, rating, cameraId },
      { extra: api },
    ) => {
      try {
        const {data} = await api.post<Review>(APIRoute.Reviews, {
          userName,
          advantage,
          disadvantage,
          review,
          rating,
          cameraId,
        });
        return data;
      } catch (error) {
        toast.error('Send rewiew error');
        throw error;
      }
    },
  );
