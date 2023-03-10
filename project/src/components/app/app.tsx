import { HelmetProvider } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute, DEFAULT_PAGE_NUMBER } from '../../const';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Navigate to={ `${AppRoute.Catalog }/${DEFAULT_PAGE_NUMBER}` }/>}
        />
        <Route
          path={`${AppRoute.Catalog}/:page`}
          element={<CatalogScreen />}
        />
        <Route
          path={`${AppRoute.Product}/:id`}
          element={<ProductScreen />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketScreen />}
        />
        <Route
          path='*'
          element={<NotFoundScreen />}
        />
        <Route
          path={AppRoute.NotFound}
          element={<NotFoundScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
