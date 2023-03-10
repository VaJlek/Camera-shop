import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Camera, Cameras } from '../../types/types';

export const getCameras = (state: State): Cameras | [] => state[NameSpace.Cameras].cameras;
export const getCamerasFetchStatus = (state: State): string => state[NameSpace.Cameras].camerasFetchStatus;

export const getCamerasTotalCount = (state: State): number => state[NameSpace.Cameras].camerasTotalCount;

export const getCamera = (state: State): Camera | undefined => state[NameSpace.Cameras].camera;
export const getCameraFetchStatus = (state: State): string => state[NameSpace.Cameras].cameraFetchStatus;

export const getSimilar = (state: State): Cameras | [] => state[NameSpace.Cameras].similar;
