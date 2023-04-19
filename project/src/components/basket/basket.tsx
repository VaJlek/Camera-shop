import { FetchStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postOrderAction } from '../../store/api-actions';
import { getBasketValue } from '../../store/app-process/selectors';
import { getCamerasInBasket } from '../../store/cameras-data/selectors';
import { getOrderPostStatus } from '../../store/order-data/selectors';
import BasketItem from './basket-item';
import BasketPromo from './basket-promo';

export default function Basket(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket = useAppSelector(getCamerasInBasket);
  const summaryValue = useAppSelector(getBasketValue);
  const orderPostStatus = useAppSelector(getOrderPostStatus);

  const handleBasketClick = () => {
    const camerasIds = camerasInBasket.map((item) => item.id);

    dispatch(postOrderAction({
      camerasIds: camerasIds
    }));
  };

  return(
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          {camerasInBasket.map((item, idx) => (
            <BasketItem camerasInBasket={camerasInBasket} camera={item.camera} key={item.camera.name} amount={item.amount} idx={idx}/>
          ))}
        </ul>
        <div className="basket__summary">
          <BasketPromo />
          <div className="basket__summary-order">
            <p className="basket__summary-item">
              <span className="basket__summary-text">Всего:</span>
              <span className="basket__summary-value">{summaryValue}  ₽</span>
            </p>
            <p className="basket__summary-item">
              <span className="basket__summary-text">Скидка:</span>
              <span className="basket__summary-value">{summaryValue} ₽</span>
            </p>
            <p className="basket__summary-item">
              <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
              <span className="basket__summary-value basket__summary-value--total">{summaryValue} ₽</span>
            </p>
            <button
              className="btn btn--purple"
              type="submit"
              onClick={handleBasketClick}
              disabled={orderPostStatus === FetchStatus.Loading || camerasInBasket.length === 0}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
