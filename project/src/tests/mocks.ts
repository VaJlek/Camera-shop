import { commerce, datatype, image, internet } from 'faker';
import { Camera, Cameras, Promo, Review, ReviewPost } from '../types/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { createAPI } from '../services/api';

export const FAKE_CAMERAS_AMOUNT = 37;

export const makeFakeCamera = (): Camera => ({
  id: datatype.number({min: 0, max: 15 }),
  name: commerce.product(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: commerce.productDescription(),
  level: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number()
});

export const makeFakeCameras = (): Cameras => ([{
  id: datatype.number({min: 0, max: 15 }),
  name: commerce.product(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  category: datatype.string(),
  description: commerce.productDescription(),
  level: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number()
}]);

export const makeFakePromo = (): Promo => ({
  id: datatype.number(),
  name: commerce.product(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
});

export const makeFakeReviews = (): Review[] => ([{
  id: datatype.uuid(),
  userName: internet.userName(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  review: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  createAt: String(datatype.datetime()),
  cameraId: datatype.number(),
}]);

export const makeFakeReviewPost = (): ReviewPost => ({
  userName: internet.userName(),
  review: datatype.string(),
  rating: datatype.number({min: 0, max: 5}),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  cameraId: datatype.number(),
});

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
export const storeForFake = configureMockStore(middlewares);
