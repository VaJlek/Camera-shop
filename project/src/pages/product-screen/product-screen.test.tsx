import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeCamera, makeFakeCameras, makeFakeReviews, storeForFake } from '../../tests/mocks';
import HistoryRoute from '../../components/history-route/history-route';
import { FetchStatus, ModalState, REVIEWS_COUNT } from '../../const';
import ProductScreen from './product-screen';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeCameras = makeFakeCameras();
const fakeReviews = makeFakeReviews();


describe('Component: ProductPage', () => {
  it('should render correctly', () => {

    const fakeStore = storeForFake({
      CAMERAS: {
        cameras: fakeCameras,
        camerasFetchStatus: FetchStatus.Success,
        camera: fakeCamera,
        similar: fakeCameras,
        camerasByName: fakeCameras,
      },
      REVIEWS: {
        reviews: fakeReviews,
      },
      APP: {
        ModalState: ModalState.Closed,
        reviewsAmount: REVIEWS_COUNT,
        reviewsOnPage: fakeReviews.slice(0, REVIEWS_COUNT),
      },
    });

    render(

      <HistoryRoute history={history}>
        <Provider store={fakeStore}>
          <ProductScreen />
        </Provider>
      </HistoryRoute>

    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();

  });

});
