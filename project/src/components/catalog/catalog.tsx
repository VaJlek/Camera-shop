import { useEffect} from 'react';
import { generatePath, Navigate, useParams, useSearchParams } from 'react-router-dom';
import { queryParams, FetchStatus, AppRoute, PRODUCTS_PER_PAGE, DEFAULT_PAGE_NUMBER } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import { fetchCamerasAction, fetchPriceRangeAction } from '../../store/api-actions';
import { getSortOrder, getSortType } from '../../store/app-process/selectors';
import { getCameras, getCamerasFetchStatus, getCamerasTotalCount, getCurrentSearchParams } from '../../store/cameras-data/selectors';
import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import LoadingScreen from '../loading/loading';
import Pagination from '../pagination/pagination';
import ProductsList from '../products-list/products-list';

export default function Catalog(): JSX.Element {
  const [searchParams, setsearhParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const currentPage = Number(useParams().page);
  const sortType = useAppSelector(getSortType);
  const sortOrder = useAppSelector(getSortOrder);
  const carrentSearchParams = useAppSelector(getCurrentSearchParams);
  const camerasTotalCount = useAppSelector(getCamerasTotalCount);
  const pagesAmount = Math.ceil(camerasTotalCount / PRODUCTS_PER_PAGE);

  useEffect(() => {
    carrentSearchParams?.length > 0 && setsearhParams(carrentSearchParams);
  }, [currentPage, carrentSearchParams, setsearhParams, sortOrder, sortType]);

  useEffect(() => {
    const camerasFetchParams = {
      pageId: currentPage,
      sortType: sortType,
      sortOrder: sortOrder,
      minPrice: [],
      maxPrice: [],
      category: searchParams.getAll(queryParams.category),
      type: searchParams.getAll(queryParams.type),
      level: searchParams.getAll(queryParams.level)
    };
    dispatch(fetchPriceRangeAction(camerasFetchParams));
  }, [currentPage, carrentSearchParams, dispatch, searchParams, sortOrder, sortType]);


  useEffect(() => {
    const camerasFetchParams = {
      pageId: currentPage,
      sortType: sortType,
      sortOrder: sortOrder,
      minPrice: searchParams.getAll(queryParams.minPrice),
      maxPrice: searchParams.getAll(queryParams.maxPrice),
      category: searchParams.getAll(queryParams.category),
      type: searchParams.getAll(queryParams.type),
      level: searchParams.getAll(queryParams.level)
    };
    dispatch(fetchCamerasAction(camerasFetchParams));
  }, [dispatch, currentPage, sortType, sortOrder, searchParams]);

  const cameras = useAppSelector(getCameras);
  const camerasFetchStatus = useAppSelector(getCamerasFetchStatus);

  if (
    camerasFetchStatus === FetchStatus.Idle ||
    camerasFetchStatus === FetchStatus.Loading
  ) {
    return <LoadingScreen />;
  }

  return (
    (pagesAmount < currentPage && camerasTotalCount !== 0)
      ? <Navigate to={generatePath(AppRoute.CatalogPage, { page: String(DEFAULT_PAGE_NUMBER) })}/>
      :
      <section className="catalog">
        {camerasFetchStatus === FetchStatus.Rejected
          ?
          <div className="container">
            <h1 className="title title--h2">Не удалось загрузить каталог</h1>
          </div>
          :
          <div className="container">
            <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
            <div className="page-content__columns">
              <CatalogFilter />
              <div className="catalog__content">
                <CatalogSort />
                <ProductsList cameras={cameras}/>
                <Pagination />
              </div>
            </div>
          </div>}
      </section>
  );
}
