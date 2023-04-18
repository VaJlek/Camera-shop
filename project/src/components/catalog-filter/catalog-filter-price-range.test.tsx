import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CatalogFilterPriceRange from './catalog-filter-price-range';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();

describe('Component: PriceRange', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasFetchStatus: FetchStatus.Idle,
        priceRangeFetchStatus: FetchStatus.Idle,
        priceRange: {camerasMinPrice: 0, camerasMaxPrice: 0},
        priceRangeByFilters: {camerasMinPrice: 0, camerasMaxPrice: 0},
        currentSearchParams: [],
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <CatalogFilterPriceRange />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Цена, ₽')).toBeInTheDocument();
  });
});
