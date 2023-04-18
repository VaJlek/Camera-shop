import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogSort from './catalog-sort';
import { storeForFake } from '../../tests/mocks';
import { Provider } from 'react-redux';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        sortType: FetchStatus.Idle,
        sortOrder: FetchStatus.Idle,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <CatalogSort />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
