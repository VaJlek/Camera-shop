import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { APIRoute, DEFAULT_PAGE_NUMBER } from '../const';
import { createAPI } from '../services/api';
import {
  makeFakeCamera,
  makeFakePromo,
  makeFakeReviews,
  makeFakeCameras,
  makeFakeReviewPost,
  FAKE_CAMERAS_AMOUNT,
} from '../tests/mocks';
import { State } from '../types/state';
import { Camera } from '../types/types';
import {
  fetchCameraAction,
  fetchCamerasAction,
  fetchPriceRangeAction,
  fetchPromoAction,
  fetchReviewsAction,
  fetchSimilarCamerasAction,
  postReviewAction,
} from './api-actions';
import { appProcess } from './app-process/app-process';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const fakeCameras = makeFakeCameras();

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchCamerasAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras, { 'x-total-count': FAKE_CAMERAS_AMOUNT });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({
      pageId: DEFAULT_PAGE_NUMBER,
      sortType: null,
      sortOrder: null,
      minPrice: null,
      maxPrice: null,
      category: null,
      type: null,
      level: null,
    }));

    const actions = store.getActions().map(( { type }: Action<string> ) => type );

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchPriceRangeAction when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchPriceRangeAction({
      pageId: DEFAULT_PAGE_NUMBER,
      sortType: null,
      sortOrder: null,
      minPrice: null,
      maxPrice: null,
      category: null,
      type: null,
      level: null,
    }));

    const actions = store.getActions().map(({ type }: Action<string>) => type);

    expect(actions).toEqual([
      fetchPriceRangeAction.pending.type,
      fetchPriceRangeAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    const fakePromo = makeFakePromo();

    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchCameraAction', async () => {
    const fakeCamera: Camera = makeFakeCamera();

    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}`)
      .reply(200, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(fakeCamera.id));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch fetchSimilarAction when GET /cameras/:id/similar', async () => {
    const fakeCamera: Camera = makeFakeCamera();
    const mockSimilarCameras = [makeFakeCamera(), makeFakeCamera(), makeFakeCamera()];

    mockAPI
      .onGet(`${APIRoute.Cameras}/${fakeCamera.id}/similar`)
      .reply(200, mockSimilarCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarCamerasAction(fakeCamera.id));

    const actions = store.getActions().map(( { type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchSimilarCamerasAction.pending.type,
      fetchSimilarCamerasAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /cameras/:id/reviews', async () => {
    const fakeCamera = makeFakeCamera();
    const fakeReviews = makeFakeReviews();

    mockAPI
      .onGet((`${APIRoute.Cameras}/${fakeCamera.id}/reviews?_sort=createAt&_order=desc`))
      .reply(200, { data: fakeReviews });

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(fakeCamera.id));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch postReviewAction when POST /comments/:id', async () => {
    const fakeReviewComment = makeFakeReviewPost();

    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, []);

    const store = mockStore();

    await store.dispatch(postReviewAction(fakeReviewComment));

    const actions = store.getActions().map(({ type }: Action<string> ) => type);

    expect(actions).toEqual([
      postReviewAction.pending.type,
      appProcess.actions.changeModalState.type,
      postReviewAction.fulfilled.type,
    ]);
  });
});


