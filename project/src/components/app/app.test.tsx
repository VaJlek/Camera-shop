import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, DEFAULT_PAGE_NUMBER, ModalState, REVIEWS_COUNT } from '../../const';
import { storeForFake, makeFakeCameras, makeFakeReviews, makeFakeCamera, makeFakePromo } from '../../tests/mocks';
import HistoryRouter from '../history-route/history-route';
import App from './app';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeCameras = makeFakeCameras();
const fakeReviews = makeFakeReviews();
const fakePromo = makeFakePromo();

const fakeStore = storeForFake({
  CAMERAS: {
    cameras: fakeCameras,
    camera: fakeCamera,
    similar: fakeCameras,
  },
  REVIEWS: {
    reviews: fakeReviews,
  },
  APP: {
    ModalState: ModalState.Closed,
    reviewsAmount: REVIEWS_COUNT,
    reviewsOnPage: fakeReviews.slice(0, 3),
  },
  PROMO: {
    promo: fakePromo,
  },
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('App Routing', () => {
  it('should render CatalogPage when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "CatalogScreen" when user navigate to "/catalog/:page"', () => {
    history.push(`${AppRoute.Catalog}/${DEFAULT_PAGE_NUMBER}`);

    render(fakeApp);

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });

  it('should render "ProductScreen" when user navigate to "/product/:id"', async () => {
    history.push(`${AppRoute.Product}/${fakeCamera.id}`);

    render(fakeApp);

    const product = await screen.findByText('Похожие товары');

    expect(product).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();
  });
});
