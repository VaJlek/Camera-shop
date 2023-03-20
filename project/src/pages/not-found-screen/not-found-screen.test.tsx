import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRoute from '../../components/history-route/history-route';
import { makeFakeCameras, storeForFake } from '../../tests/mocks';
import { Provider } from 'react-redux';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        camerasByName: fakeCameras,
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
