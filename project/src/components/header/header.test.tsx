import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Header from './header';
import { Provider } from 'react-redux';
import { makeFakeCameras, makeFakeCamerasInBasket, storeForFake } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();
const fakeCamerasInBasket = makeFakeCamerasInBasket();

describe('Component: Header', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
        camerasInBasket: fakeCamerasInBasket
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Header />
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText('Каталог')).toBeInTheDocument();
  });
});
