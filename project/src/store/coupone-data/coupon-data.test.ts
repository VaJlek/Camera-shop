import { FetchStatus } from '../../const';
import { postCouponGetDiscount } from '../api-actions';
import { couponData, DataCoupons } from './coupon-data';

describe('Reducer: coupons', () => {
  let state: DataCoupons;

  beforeEach(() => {
    state = {
      coupon: 'camera-333',
      discount: 0,
      couponPostStatus: FetchStatus.Idle,
    };
  });


  it('without additional parameters should return initial state', () => {
    expect(couponData.reducer(state, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('postCouponGetDiscount test', () => {

    it('should update couponPostStatus by posting coupon', () => {
      expect(couponData.reducer(state, { type: postCouponGetDiscount.pending.type }))
        .toEqual({
          coupon: 'camera-333',
          discount: 0,
          couponPostStatus: FetchStatus.Loading,
        });
    });

    it('should update couponPostStatus by success posting coupon', () => {
      expect(couponData.reducer(state, { type: postCouponGetDiscount.fulfilled.type, payload: 15 }))
        .toEqual({
          coupon: 'camera-333',
          discount: 15,
          couponPostStatus: FetchStatus.Success,
        });
    });


    it('should update couponPostStatus by rejected posting coupon', () => {
      expect(couponData.reducer(state, { type: postCouponGetDiscount.rejected.type }))
        .toEqual({
          coupon: 'camera-333',
          discount: 0,
          couponPostStatus: FetchStatus.Rejected,
        });
    });
  });

});
