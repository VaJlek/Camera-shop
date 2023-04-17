export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  rating: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  reviewCount: number;
};

export type Cameras = Camera[];

export type Review = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  createAt: string;
  cameraId: number;
};

export type Reviews = Review[];

export type Promo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type ReviewPost = {
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
  cameraId: number;
};

export type ReviewPostKeys = keyof ReviewPost;

export type CamerasPriceRange = {
  camerasMinPrice: number;
  camerasMaxPrice: number;
};

export type CamerasFetchParams = {
  pageId: number;
  sortType: string | null;
  sortOrder: string | null;
  category: string | string[] | null;
  type: string | string[] | null;
  level: string | string[] | null;
  minPrice: string | string[] | null;
  maxPrice: string | string[] | null;
}
