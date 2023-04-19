import cn from 'classnames';
import { useEffect, useState } from 'react';
import { ModalState, Tab } from '../../const';
import { Camera } from '../../types/types';
import RateStars from '../rate-stars/rate-stars';
import { useAppDispatch } from '../../hooks';
import { changeModalState, setSelectedCamera } from '../../store/app-process/app-process';

type ProductProps = {
  camera: Camera;
}

export default function Product({camera}: ProductProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState(Tab.Specification);

  useEffect(() => {
    setActiveTab(Tab.Specification);
  }, [camera]);

  const getClassName = (className: string, tabName: string) => cn(className, {
    'is-active': activeTab === tabName
  });

  const HandleClickBuyButton = () => {
    dispatch(setSelectedCamera(camera));
    dispatch(changeModalState(ModalState.BasketAddItem));
  };


  return (
    <div className="page-content__section">
      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x}`}
              />
              <img
                src={camera.previewImg}
                srcSet={`${camera.previewImg2x} 2x`}
                width="560"
                height="480"
                alt={camera.name}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{camera.name}</h1>
            <div className="rate product__rate">
              <RateStars rating={camera.rating} />
              <p className="visually-hidden">Рейтинг: {camera.rating}</p>
              <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
            </div>
            <p className="product__price"><span className="visually-hidden">Цена:</span>{camera.price} ₽</p>
            <button
              onClick={HandleClickBuyButton}
              className="btn btn--purple"
              type="button"
            >
              <svg width="24" height="16" aria-hidden="true">
                <use xlinkHref="#icon-add-basket"></use>
              </svg>Добавить в корзину
            </button>
            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  onClick={() => setActiveTab(Tab.Specification)}
                  className={getClassName('tabs__control', Tab.Specification)}
                  type="button"
                >
                  Характеристики
                </button>
                <button
                  onClick={() => setActiveTab(Tab.Description)}
                  className={getClassName('tabs__control', Tab.Description)}
                  type="button"
                >
                  Описание
                </button>
              </div>
              <div className="tabs__content">
                <div className={getClassName('tabs__element', Tab.Specification)}>
                  <ul className="product__tabs-list">
                    <li className="item-list"><span className="item-list__title">Артикул:</span>
                      <p className="item-list__text"> {camera.vendorCode}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Категория:</span>
                      <p className="item-list__text">{camera.category}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                      <p className="item-list__text">{camera.type}</p>
                    </li>
                    <li className="item-list"><span className="item-list__title">Уровень:</span>
                      <p className="item-list__text">{camera.level}</p>
                    </li>
                  </ul>
                </div>
                <div className={getClassName('tabs__element', Tab.Description)}>
                  <div className="product__tabs-text">
                    <p>{camera.description}</p>
                    <p>Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству аналоговой съёмки, заказав этот чудо-аппарат. Кто знает, может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь к&nbsp;наградам всех престижных кинофестивалей.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
