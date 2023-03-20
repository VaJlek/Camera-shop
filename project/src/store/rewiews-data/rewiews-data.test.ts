import { FetchStatus } from '../../const';
import { makeFakeReviews } from '../../tests/mocks';
import { fetchReviewsAction, postReviewAction } from '../api-actions';
import { Reviews } from '../../types/types';
import { reviewsData, ReviewsData } from './rewiews-data';

const FakeReviews : Reviews = makeFakeReviews();

describe('Reducer: cameras', () => {
  let state: ReviewsData;

  beforeEach(() => {
    state = {
      reviews: [],
      reviewPostStatus: FetchStatus.Idle,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchReviewsAction test', () => {

    it('should update reviews, reviewPostStatus by load review', () => {
      expect(reviewsData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: FakeReviews }))
        .toEqual({
          reviews: FakeReviews,
          reviewPostStatus: FetchStatus.Idle,
        });
    });
  });

  describe('postReviewAction test', () => {

    it('should update reviewPostStatus by posting review', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.pending.type }))
        .toEqual({
          reviews: [],
          reviewPostStatus: FetchStatus.Loading,
        });
    });

    it('should update reviewPostStatus by success posting review', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.fulfilled.type }))
        .toEqual({
          reviews: [],
          reviewPostStatus: FetchStatus.Success,
        });
    });


    it('should update reviewPostStatus by rejected posting review', () => {
      expect(reviewsData.reducer(state, { type: postReviewAction.rejected.type }))
        .toEqual({
          reviews: [],
          reviewPostStatus: FetchStatus.Rejected,
        });
    });
  });

});
