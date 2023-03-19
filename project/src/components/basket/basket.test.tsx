import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import Basket from './basket';

const history = createMemoryHistory();

describe('Component: Basket', () => {
  it('should render basket correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Basket />
      </HistoryRouter>,
    );

    expect(screen.getByText('Корзина')).toBeInTheDocument();
  });
});
