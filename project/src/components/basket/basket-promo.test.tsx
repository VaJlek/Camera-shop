import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketPromo from './basket-promo';
import { storeForFake } from '../../tests/mocks';
import { FetchStatus } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();

describe('Component: BasketPromo', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      COUPONS: {
        coupon: '',
        discount: 0,
        couponPostStatus: FetchStatus.Idle
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketPromo />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Промокод')).toBeInTheDocument();
  });
});
