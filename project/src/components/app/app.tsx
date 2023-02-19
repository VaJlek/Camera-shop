import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import BasketScreen from '../../pages/basket-screen/basket-screen';
import CatalogScreen from '../../pages/catalog-screen/catalog-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ProductScreen from '../../pages/product-screen/product-screen';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={<Navigate to={ AppRoute.Catalog } />}
          />
          <Route
            path={AppRoute.Catalog}
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
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
