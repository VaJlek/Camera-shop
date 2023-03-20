import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera, makeFakeCameras, makeFakePromo, storeForFake } from '../../tests/mocks';
import HistoryRoute from '../../components/history-route/history-route';
import { FetchStatus, ModalState } from '../../const';
import CatalogScreen from './catalog-screen';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeCameras = makeFakeCameras();
const fakePromo = makeFakePromo();

describe('Component: CatalogScreen', () => {
  it('should render correctly', () => {

    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        camera: fakeCamera,
      },
      APP: {
        ModalState: ModalState.Closed,
      },
      PROMO: {
        promo: fakePromo,
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <CatalogScreen />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();

  });

});
