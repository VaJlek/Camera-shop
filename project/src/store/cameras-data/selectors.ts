import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Cameras, CamerasPriceRange } from '../../types/types';

export const getCameras = (state: State): Cameras | [] => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): string => state[NameSpace.Cameras].camerasFetchStatus;

export const getCamerasTotalCount = (state: State): number => state[NameSpace.Cameras].camerasTotalCount;

export const getCamera = (state: State) => state[NameSpace.Cameras].camera;
export const getCameraFetchStatus = (state: State): string => state[NameSpace.Cameras].cameraFetchStatus;

export const getSimilar = (state: State): Cameras | [] => state[NameSpace.Cameras].similar;
export const getCamerasByName = (state: State): Cameras | [] => state[NameSpace.Cameras].camerasByName;

export const getCurrentSearchParams = (state: State): [string, string][] => state[NameSpace.Cameras].currentSearchParams;

export const getPriceRange = (state: State): CamerasPriceRange => state[NameSpace.Cameras].priceRange;
export const getPriceRangeFetchStatus = (state: State): string => state[NameSpace.Cameras].priceRangeFetchStatus;
