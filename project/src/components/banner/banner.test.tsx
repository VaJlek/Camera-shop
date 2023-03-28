import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakePromo, storeForFake } from '../../tests/mocks';
import Banner from './banner';

const history = createMemoryHistory();
const fakePromo = makeFakePromo();

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      PROMO: {
        promo: fakePromo,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Banner />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakePromo.name}`)).toBeInTheDocument();
  });
});
