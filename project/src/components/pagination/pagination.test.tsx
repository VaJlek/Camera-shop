import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { PRODUCTS_PER_PAGE } from '../../const';
import { FAKE_CAMERAS_AMOUNT, storeForFake } from '../../tests/mocks';
import Pagination from './pagination';
import { Provider } from 'react-redux';

const history = createMemoryHistory();

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasTotalCount: FAKE_CAMERAS_AMOUNT,
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Pagination />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(`${Math.ceil(FAKE_CAMERAS_AMOUNT / PRODUCTS_PER_PAGE)}`)).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();
  });
});
