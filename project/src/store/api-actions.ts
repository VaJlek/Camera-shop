import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import { AppDispatch, State } from '../types/state';
import { Camera, Cameras, CamerasFetchParams, CamerasPriceRange, Order, Promo, Review, ReviewPost, Reviews } from '../types/types';
import { APIRoute, ModalState, PRODUCTS_PER_PAGE, queryParams, SortOrder, SortType } from '../const';
import { changeModalState } from './app-process/app-process';
import { setCamerasInBasket } from './cameras-data/cameras-data';
import { setCoupon } from './coupone-data/coupon-data';

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

export const fetchCamerasAction = createAsyncThunk<{
  data: Cameras;
  camerasTotalCount: string;
  },
    CamerasFetchParams,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCameras',
    async ({pageId, sortType, sortOrder, minPrice, maxPrice, category, type, level}, { extra: api}) => {
      try {
        const {data, headers} = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.camerasAmountOnPage]: PRODUCTS_PER_PAGE,
            [queryParams.firstCameraOnPage]: String((pageId - 1) * PRODUCTS_PER_PAGE),
            [queryParams.sortType]: sortType ? String(sortType) : null,
            [queryParams.sortOrder]: sortOrder ? String(sortOrder) : null,
            [queryParams.minPrice]: minPrice,
            [queryParams.maxPrice]: maxPrice,
            [queryParams.type]: type,
            [queryParams.category]: category,
            [queryParams.level]: level,
          }});
        return {
          data,
          camerasTotalCount: headers['x-total-count']
        };
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
      { dispatch, extra: api },
    ) => {
      try {
        const { data } = await api.post<Review>(APIRoute.Reviews, {
          userName,
          advantage,
          disadvantage,
          review,
          rating,
          cameraId,
        });

        dispatch(changeModalState(ModalState.ReviewSuccess));
        return data;
      } catch (error) {
        toast.error('Send rewiew error');
        throw error;
      }
    },
  );

export const fetchCamerasBySearchAction = createAsyncThunk<
 Cameras,
 string,
 {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  }>(
    'fetchCamerasByName',
    async (name, {extra: api}) => {
      try {
        const {data} = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.seachByName]:name
          }});
        return data;
      } catch(error) {
        toast.error('Cameras search error');
        throw error;
      }
    }
  );

export const fetchPriceRangeAction = createAsyncThunk<
  CamerasPriceRange,
  CamerasFetchParams,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'fetchCamerasPriceRange',
    async ({minPrice, maxPrice, category, type, level}, {extra: api}) => {
      try {
        const cameraMinPrice = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.camerasAmountOnPage]: 1,
            [queryParams.sortType]: String(SortType.Price),
            [queryParams.SortOrder]: String(SortOrder.Asc),
            [queryParams.minPrice]: minPrice,
            [queryParams.maxPrice]: maxPrice,
            [queryParams.type]: type,
            [queryParams.category]: category,
            [queryParams.level]: level,
          }});

        const cameraMaxPrice = await api.get<Cameras>(APIRoute.Cameras,
          {params: {
            [queryParams.camerasAmountOnPage]: 1,
            [queryParams.sortType]: String(SortType.Price),
            [queryParams.sortOrder]: String(SortOrder.Desc),
            [queryParams.minPrice]: minPrice,
            [queryParams.maxPrice]: maxPrice,
            [queryParams.type]: type,
            [queryParams.category]: category,
            [queryParams.level]: level,
          }});

        return {
          camerasMinPrice: cameraMinPrice.data.length > 0 ? Number(cameraMinPrice.data[0].price) : 0,
          camerasMaxPrice: cameraMaxPrice.data.length > 0 ? Number(cameraMaxPrice.data[0].price) : 0,
        };
      } catch(error) {
        toast.error('Cameras price range loadig error');
        throw error;
      }
    }
  );

export const postOrderAction = createAsyncThunk<void, Order,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/post Order',
    async ({camerasIds, coupon}, {extra: api, dispatch}) => {
      try {
        await api.post(APIRoute.Orders, {
          camerasIds: camerasIds,
          coupon: coupon
        });

        dispatch(changeModalState(ModalState.OrderSuccess));
        dispatch(setCamerasInBasket([]));
        dispatch(setCoupon(''));
      } catch(error) {
        toast.error('Order post error');
        throw error;
      }
    });

export const postCouponGetDiscount = createAsyncThunk<number, string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>(
    'data/post Coupon',
    async (coupon, {extra: api, dispatch}) => {
      try {
        const {data} = await api.post<number>(APIRoute.Сoupons, {coupon});
        dispatch(setCoupon(coupon));
        return data;
      } catch(error) {
        toast.error('Coupon post error');
        throw error;
      }
    });
