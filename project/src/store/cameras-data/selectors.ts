import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera, Cameras, PriceRange,  } from '../../types/types';

export const getCameras = (state: State): Cameras | [] => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): string => state[NameSpace.Cameras].camerasFetchStatus;
export const getCarrentSearchParams = (state: State): [string, string][] => state[NameSpace.Cameras].carrentSearchParams;

export const getCamerasTotalCount = (state: State): number => state[NameSpace.Cameras].camerasTotalCount;

export const getCamera = (state: State): Camera | undefined => state[NameSpace.Cameras].product;
export const getCameraFetchStatus = (state: State): string => state[NameSpace.Cameras].productFetchStatus;

export const getSimilar = (state: State): Cameras | [] => state[NameSpace.Cameras].similar;
export const getCamerasByName = (state: State): Cameras | [] => state[NameSpace.Cameras].camerasByName;
export const getPriceRange = (state: State): PriceRange => state[NameSpace.Cameras].priceRange;
export const getPriceRangeFetchStatus = (state: State): string => state[NameSpace.Cameras].priceRangeFetchStatus;

