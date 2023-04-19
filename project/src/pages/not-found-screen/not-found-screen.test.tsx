import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { makeFakeCameras, makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';
import { Provider } from 'react-redux';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <NotFoundScreen />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText('Вернуться на главную')).toBeInTheDocument();

  });

});
