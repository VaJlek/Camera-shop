import { useState } from 'react';
import { PRODUCTS_ON_SLIDER } from '../../const';
import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';


type ProductSimilarProps = {
  similarCameras: Cameras | null;
}

export default function ProductSimilar({ similarCameras }: ProductSimilarProps): JSX.Element {

  const [firstCardIndex, setfirstCardIndex] = useState(0);

  const lastCardIndex = firstCardIndex + PRODUCTS_ON_SLIDER;

  const handleSliderNextClick = () => {
    setfirstCardIndex(firstCardIndex + 1);
  };

  const handleSliderPrevClick = () => {
    setfirstCardIndex(firstCardIndex - 1);
  };

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <div className="product-similar__slider-list">
              {similarCameras?.slice(firstCardIndex, lastCardIndex).map((similarCamera) => (
                <ProductCard
                  key={similarCamera.id}
                  camera={similarCamera}
                  isActive={similarCameras.includes(similarCamera)}
                />
              ))}
            </div>
            <button
              onClick={handleSliderPrevClick}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled={firstCardIndex === 0}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              onClick={handleSliderNextClick}
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
              disabled={lastCardIndex === similarCameras?.length}
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
