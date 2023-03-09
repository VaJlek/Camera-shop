import { createSelector } from 'reselect';
import { NameSpace } from '../../const';
import { Camera, Reviews } from '../../types/types';
import { State } from '../../types/state';
import { getReviews } from '../rewiews-data/selectors';

export const getModalState = (state: State): string => state[NameSpace.App].modalState;
export const getSelectedCamera = (state: State): Camera | undefined => state[NameSpace.App].selectedCameraId;
export const getReviewsAmount = (state: State): number => state[NameSpace.App].reviewsAmount;
export const getSortType = (state: State): string | null => state[NameSpace.App].sortType;
export const getSortOrder = (state: State): string | null => state[NameSpace.App].sortOrder;

export const getReviewsOnPage = createSelector(
  [getReviewsAmount, getReviews],
  (reviewsAmount: number, reviews: Reviews | []) => reviews.slice(0, reviewsAmount)
);
