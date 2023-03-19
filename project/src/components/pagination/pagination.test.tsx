import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { PRODUCTS_PER_PAGE } from '../../const';
import { FAKE_CAMERAS_AMOUNT } from '../../tests/mocks';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Pagination
          currentPage={1}
          camerasLength={FAKE_CAMERAS_AMOUNT}
        />
      </HistoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(`${Math.ceil(FAKE_CAMERAS_AMOUNT / PRODUCTS_PER_PAGE)}`)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
