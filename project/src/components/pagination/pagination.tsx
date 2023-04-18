import { Link, useParams } from 'react-router-dom';
import { AppRoute, PRODUCTS_PER_PAGE } from '../../const';
import { getCamerasTotalCount } from '../../store/cameras-data/selectors';
import { useAppSelector } from '../../hooks';

export default function Pagination(): JSX.Element {

  const currentPage = Number(useParams().page);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const numberOfPages = Math.ceil(camerasTotalCount / PRODUCTS_PER_PAGE);
  const pageNumbers = Array.from({ length: numberOfPages}, (v, k) => k + 1);


  return(
    <div className="pagination">
      <ul className="pagination__list">
        {currentPage > 1
          ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${ currentPage - 1}`}
            >Назад
            </Link>
          </li>
          : ''}
        {pageNumbers.map((number) => (
          <li className="pagination__item" key={number}>
            <Link className={`pagination__link ${number === currentPage ? 'pagination__link--active' : ''}`}
              to={`${AppRoute.Catalog}/${number}`}
            >{number}
            </Link>
          </li>
        ))}
        {currentPage !== numberOfPages
          ?
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppRoute.Catalog}/${ currentPage + 1}`}
            >Далее
            </Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}
