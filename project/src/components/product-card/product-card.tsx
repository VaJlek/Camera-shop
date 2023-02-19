import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/types';
import RateStars from '../rate-stars/rate-stars';

type ProductProps = {
  camera: Camera;
};

export default function ProductCard ({ camera }: ProductProps): JSX.Element {
  return(
    <div className="product-card">
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
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>В корзине
        </a>
        <Link to={`${AppRoute.Product}/${camera.id}`} className="btn btn--transparent">Подробнее
        </Link>
      </div>
    </div>
  );
}
