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
  Orders = '/orders',
  Сoupons = '/coupons'
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Promo = 'PROMO',
  App = 'APP',
  Reviews = 'REVIEWS',
  Order = 'ORDER',
  Coupons = 'COUPONS'
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
  BasketAddItem = 'basketAddItem',
  BasketDelItem = 'basketDelItem',
  BasketSuccess = 'basketSuccess',
  OrderSuccess = 'orderSuccess'
}

export const queryParams: {[key:string]: string} = {
  camerasAmountOnPage: '_limit',
  firstCameraOnPage: '_start',
  seachByName: 'name_like',
  sortType: '_sort',
  sortOrder: '_order',
  type: 'type',
  category: 'category',
  level: 'level',
  minPrice: 'price_gte',
  maxPrice: 'price_lte'
} as const;

export const enum SortType {
  Price = 'price',
  Rating = 'rating'
}

export const enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export const FilterNames: {
  [key: string]: {
    [key: string]: string;
  };
} =
  {
    category: {
      photocamera: 'Фотоаппарат',
      videocamera: 'Видеокамера',
    },
    type: {
      digital: 'Цифровая',
      film: 'Плёночная',
      snapshot: 'Моментальная',
      collection: 'Коллекционная'
    },
    level: {
      zero: 'Нулевой',
      nonProfessional: 'Любительский',
      professional: 'Профессиональный'
    }
  } as const;

export const FilterTitles : {
    [key: string]: string;
  } =
    {
      category: 'Категория',
      type: 'Тип камеры',
      level: 'Уровень',
    } as const;

export const Coupons : {
    [key: string]: string;
  } =
    {
      'camera-333': 'camera-333',
      'camera-444': 'camera-444',
      'camera-555': 'camera-555',
    } as const;

