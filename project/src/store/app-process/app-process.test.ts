import { ModalState, REVIEWS_COUNT } from '../../const';
import { makeFakeCamera } from '../../tests/mocks';
import { AppProcess, appProcess, changeModalState, setReviewsAmount, setSelectedCamera } from './app-process';
import { Camera } from '../../types/types';

const fakeCamera: Camera = makeFakeCamera();

describe('Reducer: app-process', () => {
  let state: AppProcess;

  beforeEach(() => {
    state = {
      modalState: ModalState.Closed,
      selectedCameraId: undefined,
      reviewsAmount: REVIEWS_COUNT,
      reviewsOnPage: [],
      sortType: null,
      sortOrder: null,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(appProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('changeModalState test', () => {

    it('should update ModalStates by changeModalState', () => {
      expect(appProcess.reducer(state, changeModalState(ModalState.ReviewForm)))
        .toEqual({
          modalState: ModalState.ReviewForm,
          selectedCameraId: undefined,
          reviewsAmount: REVIEWS_COUNT,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });

  describe('setSelectedCamera test', () => {

    it('should update selectedCamera by setSelectedCamera', () => {
      expect(appProcess.reducer(state, setSelectedCamera(fakeCamera)))
        .toEqual({
          modalState: ModalState.Closed,
          selectedCameraId: fakeCamera,
          reviewsAmount: REVIEWS_COUNT,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });

  describe('setReviewsAmount test', () => {
    const fakeReviewsAmount = REVIEWS_COUNT + REVIEWS_COUNT;

    it('should update selectedCamera by setSelectedCamera', () => {
      expect(appProcess.reducer(state, setReviewsAmount(fakeReviewsAmount)))
        .toEqual({
          modalState: ModalState.Closed,
          selectedCameraId: undefined,
          reviewsAmount: fakeReviewsAmount,
          reviewsOnPage: [],
          sortType: null,
          sortOrder: null,
        });
    });
  });
});
