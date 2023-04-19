import cn from 'classnames';
import { Link } from 'react-router-dom';
import { AppRoute, ModalState } from '../../const';
import { Camera, CamerasInBasket } from '../../types/types';
import RateStars from '../rate-stars/rate-stars';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCamerasInBasket } from '../../store/cameras-data/selectors';
import { changeModalState, setSelectedCamera } from '../../store/app-process/app-process';

type ProductProps = {
  camera: Camera;
  isActive?: boolean;
};

export default function ProductCard ({ camera, isActive }: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasInBasket: CamerasInBasket = useAppSelector(getCamerasInBasket);
  const cameraInBasket = camerasInBasket.filter((item) => item.id === camera.id);

  const HandleClickBuyButton = () => {
    dispatch(setSelectedCamera(camera));
    dispatch(changeModalState(ModalState.BasketAddItem));
  };

  const getBuyButton = () => cameraInBasket.length > 0
    ?
    <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" to={AppRoute.Basket}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>В корзине
    </Link>
    :
    <button
      onClick={HandleClickBuyButton}
      className="btn btn--purple product-card__btn"
      type="button"
    >
      Купить
    </button>;

  return(
    <div className={cn('product-card', {'is-active' : isActive})}>
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`}
          />
          <img
            src={camera.previewImg}
            srcSet={`${camera.previewImg2x} 2x`}
            width="280"
            height="240"
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RateStars rating={camera.rating}/>
          <p className="visually-hidden">Рейтинг: {camera.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>
          {`${camera.price} ₽ `}
        </p>

      </div>
      <div className="product-card__buttons">
<<<<<<< HEAD
        <Link className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>В корзине
        </Link>
=======
        {getBuyButton()}
>>>>>>> origin/basket
        <Link to={`${AppRoute.Product}/${camera.id}`} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}
