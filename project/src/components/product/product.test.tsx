import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Product from './product';
import { makeFakeCamera, storeForFake } from '../../tests/mocks';
import { Provider } from 'react-redux';
import { FetchStatus } from '../../const';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();

describe('Component: Product', () => {
  it('should render correctly', () => {
    const fakeStore = storeForFake({
      CAMERAS: {
        product: fakeCamera,
        productFetchStatus: FetchStatus.Success
      },
    });

    render(
      <HistoryRouter history={history}>
        <Provider store={fakeStore}>
          <Product camera={fakeCamera}/>
        </Provider>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCamera.name}`)).toBeInTheDocument();
  });
});
