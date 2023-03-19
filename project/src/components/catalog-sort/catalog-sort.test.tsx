import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import CatalogSort from './catalog-sort';

const history = createMemoryHistory();

describe('Component: CatalogSort', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <CatalogSort />
      </HistoryRouter>,
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
