import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeCamera, makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';
import ProductCard from './product-card';
import { ModalState } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: ProductCard', () => {
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
          <ProductCard camera={fakeCamera}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCamera.name}`)).toBeInTheDocument();
  });
});
