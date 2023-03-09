export const REVIEWS_COUNT = 3;
export const PRODUCTS_PER_PAGE = 9;
export const PRODUCTS_ON_SLIDER = 3;
export const DEFAULT_PAGE_NUMBER = 1;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  CatalogPage = '/catalog/:page',
  Basket = '/basket',
  Product = '/product',
  NotFound = '/404'
}

export enum APIRoute {
  Cameras = '/cameras',
  Camera = '/cameras/:id',
  Reviews = '/reviews',
  Promo = '/promo',
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  App = 'APP',
  Reviews = 'REVIEWS',
}

export const enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Rejected = 'REJECTED',
}

export enum Tab {
  Description = 'description',
  Specification = 'specification',
}

export enum ModalState {
  Closed = 'closed',
  ReviewForm = 'reviewForm',
  ReviewSuccess = 'reviewSuccess',
}
