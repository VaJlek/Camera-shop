import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketItem from './basket-item';

const history = createMemoryHistory();

describe('Component: BasketItem', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BasketItem/>
      </HistoryRouter>,
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
  });
});
