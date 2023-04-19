import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCoupon, getCouponPostStatus } from '../../store/coupone-data/selectors';
import cn from 'classnames';
import { FetchStatus } from '../../const';
import { setCouponPostStatus } from '../../store/coupone-data/coupon-data';
import { postCouponGetDiscount } from '../../store/api-actions';

export default function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();
  const couponPostStatus = useAppSelector(getCouponPostStatus);
  const coupon = useAppSelector(getCoupon);
  const [couponValue, setCouponValue] = useState('');

  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!isRenderedRef.current) {
      (couponPostStatus === FetchStatus.Rejected || coupon === '') && dispatch(setCouponPostStatus(FetchStatus.Idle));
      couponPostStatus === FetchStatus.Success && setCouponValue(coupon);
      isRenderedRef.current = true;
    }
  }, [coupon, couponPostStatus, dispatch]);

  const handlePromoBtnClick = (evt: FormEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(postCouponGetDiscount(couponValue));
  };

  const handlePromoChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setCouponValue(String(evt.target.value));
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form action="#">
          <div className=
            {
              cn('custom-input',
                {
                  'is-invalid': couponPostStatus === FetchStatus.Rejected,
                  'is-valid': couponPostStatus === FetchStatus.Success
                })
            }
          >
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                onChange={handlePromoChange}
                value={couponValue}
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button
            onClick={handlePromoBtnClick}
            className="btn"
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}
