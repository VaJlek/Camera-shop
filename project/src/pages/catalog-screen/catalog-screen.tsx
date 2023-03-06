import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading/loading';
import Pagination from '../../components/pagination/pagination';
import ProductsList from '../../components/products-list/products-list';
import { PRODUCTS_PER_PAGE } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCameras } from '../../store/cameras-data/selectors';

export default function CatalogScreen (): JSX.Element {

  const cameras = useAppSelector(getCameras);

  const currentPage = 1;

  const lastProductIndex = Number(currentPage) * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;

  if (!cameras) {
    return <LoadingScreen />;
  }

  return (
    <div className="wrapper">
      <Header/>
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <CatalogFilter />
                </div>
                <div className="catalog__content">
                  <CatalogSort />
                  <ProductsList cameras={cameras.slice(firstProductIndex, lastProductIndex)}/>
                  <Pagination currentPage={currentPage} camerasLength={cameras.length}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
