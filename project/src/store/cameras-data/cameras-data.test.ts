import { FetchStatus } from '../../const';
import { makeFakeCamera, makeFakeCameras } from '../../tests/mocks';
import { fetchCameraAction, fetchCamerasAction, fetchSimilarCamerasAction } from '../api-actions';
import { Camera, Cameras } from '../../types/types';
import { camerasData, CamerasData } from './cameras-data';

const fakeCameras: Cameras = makeFakeCameras();
const fakeCamera: Camera = makeFakeCamera();

describe('Reducer: cameras-data', () => {
  let state: CamerasData;

  beforeEach(() => {
    state = {
      cameras: [],
      camerasFetchStatus: FetchStatus.Idle,
      camerasTotalCount: 0,
      camera: undefined,
      cameraFetchStatus: FetchStatus.Idle,
      similar: [],
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(camerasData.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchCamerasAction test', () => {

    it('should update camerasFetchStatus by loading cameras', () => {
      expect(camerasData.reducer(state, { type: fetchCamerasAction.pending.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Loading,
          camerasTotalCount: 0,
          camera: undefined,
          cameraFetchStatus: FetchStatus.Idle,
          similar: [],
        });
    });

    it('should update camerasFetchStatus by fetchCamerasAction rejected', () => {
      expect(camerasData.reducer(state, { type: fetchCamerasAction.rejected.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Rejected,
          camerasTotalCount: 0,
          camera: undefined,
          cameraFetchStatus: FetchStatus.Idle,
          similar: [],
        });
    });
  });

  describe('fetchProductAction test', () => {

    it('should update cameraFetchStatus by loading camera', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.pending.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          camera: undefined,
          cameraFetchStatus: FetchStatus.Loading,
          similar: [],
        });
    });

    it('should update camera and cameraFetchStatus by load camera', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.fulfilled.type, payload: fakeCamera }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          camera: fakeCamera,
          cameraFetchStatus: FetchStatus.Success,
          similar: [],
        });
    });


    it('should update cameraFetchStatus by fetchCameraAction rejected', () => {
      expect(camerasData.reducer(state, { type: fetchCameraAction.rejected.type }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          camera: undefined,
          cameraFetchStatus: FetchStatus.Rejected,
          similar: [],
        });
    });
  });

  describe('fetchSimilarAction test', () => {
    it('should update similar by load similar cameras', () => {
      expect(camerasData.reducer(state, { type: fetchSimilarCamerasAction.fulfilled.type, payload: fakeCameras }))
        .toEqual({
          cameras: [],
          camerasFetchStatus: FetchStatus.Idle,
          camerasTotalCount: 0,
          camera: undefined,
          cameraFetchStatus: FetchStatus.Idle,
          similar: fakeCameras,
        });
    });
  });
});
