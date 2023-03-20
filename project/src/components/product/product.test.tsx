import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Product from './product';
import { makeFakeCamera } from '../../tests/mocks';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();

describe('Component: Product', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Product camera={fakeCamera}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCamera.name}`)).toBeInTheDocument();
  });
});
