import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Reviews } from '../../types/types';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getReviewPostStatus = (state: State): string => state[NameSpace.Reviews].reviewPostStatus;
