import BasketItem from './basket-item';
import BasketPromo from './basket-promo';

export default function Basket(): JSX.Element {
  return(
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <ul className="basket__list">
          <BasketItem />
        </ul>
        <div className="basket__summary">
          <BasketPromo />
          <div className="basket__summary-order">
            <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">111 390 ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
            <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">111 390 ₽</span></p>
            <button className="btn btn--purple" type="submit">Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
