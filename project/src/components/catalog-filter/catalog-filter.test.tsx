import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import CatalogFilter from './catalog-filter';

const history = createMemoryHistory();

describe('Component: CatalogFilter', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <CatalogFilter />
      </HistoryRouter>,
    );

    expect(screen.getByText('Фильтр')).toBeInTheDocument();
  });
});
