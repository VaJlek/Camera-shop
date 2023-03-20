import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { storeForFake, makeFakeReviewPost, makeFakeCamera } from '../../tests/mocks';
import HistoryRouter from '../history-route/history-route';
import AddReviewModal from './review-modal';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();
const fakeReviewComment = makeFakeReviewPost();

const fakeStore = storeForFake({
  REVIEWS: {
    reviewComment: fakeReviewComment,
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <AddReviewModal cameraId={fakeCamera.id} onClick={() => null}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: ReviewBlock', () => {
  it('should render correctly', async () => {

    render(fakeApp);

    const product = await screen.findByText('Оставить отзыв');

    expect(product).toBeInTheDocument();
  });
});
