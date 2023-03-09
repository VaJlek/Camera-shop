import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

type BreadcrumbsProps = {
  name?: string;
};

export default function Breadcrumbs ({ name }: BreadcrumbsProps):JSX.Element {

  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <NavLink className="breadcrumbs__link" to={AppRoute.Root}>Главная
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </NavLink>
          </li>
          <li className="breadcrumbs__item">
            <NavLink className="breadcrumbs__link" to={AppRoute.Root}>Каталог
              <svg width="5" height="8" aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini"></use>
              </svg>
            </NavLink>
          </li>
          { name ?
            <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">{name}</span>
            </li>
            : ''}
        </ul>
      </div>
    </div>
  );
}
