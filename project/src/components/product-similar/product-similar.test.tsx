import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeCameras, makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';
import ProductSimilar from './product-similar';
import { FetchStatus, ModalState } from '../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        selectedCameraId: undefined,
        ModalState : ModalState.Closed,
      },
      CAMERAS: {
        priceRangeFetchStatus: FetchStatus.Idle,
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <ProductSimilar similarCameras={fakeCameras}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCameras[0].name}`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
