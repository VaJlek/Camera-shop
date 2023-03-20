import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import { ModalState } from '../../const';
import { makeFakeCamera, storeForFake } from '../../tests/mocks';
import Modal from './modal';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();

describe('Component: Modal', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      APP: {
        modalState: ModalState.ReviewForm,
        selectidCard: fakeCamera,
      },
      CAMERAS: {
        camera: fakeCamera,
      }
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Modal modalState={ModalState.ReviewForm}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
