import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketPromo from './basket-promo';

const history = createMemoryHistory();

describe('Component: BasketPromo', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BasketPromo />
      </HistoryRouter>,
    );

    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });
});
