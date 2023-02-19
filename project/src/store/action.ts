import { createAction } from '@reduxjs/toolkit';
import { Camera, Cameras, Promo } from '../types/types';

export const loadPromo = createAction('loadPromo', (value: Promo) => ({ payload: value }));

export const loadCameras = createAction('loadCameras', (value: Cameras) => ({ payload: value }));

export const loadCamera = createAction('loadCamera', (value: Camera) => ({ payload: value }));
