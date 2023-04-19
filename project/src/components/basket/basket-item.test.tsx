import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import BasketItem from './basket-item';
import { makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';
import { ModalState } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeCamerasInBasket = makeFakeCamerasInBasket();


describe('Component: BasketItem', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState: ModalState.Closed,
      },
      CAMERAS: {
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <BasketItem
            camerasInBasket={fakeCamerasInBasket}
            camera={fakeCamerasInBasket[0].camera}
            amount={fakeCamerasInBasket[0].amount}
            idx={fakeCamerasInBasket[0].id}
          />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamerasInBasket[0].camera.name}`)).toBeInTheDocument();
  });
});
