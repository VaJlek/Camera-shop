import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogFilter from './catalog-filter';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasFetchStatus: FetchStatus.Idle,
        priceRangeFetchStatus: FetchStatus.Idle,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <CatalogFilter />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
