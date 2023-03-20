import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeCamera } from '../../tests/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();
const fakeCamera = makeFakeCamera();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ProductCard camera={fakeCamera}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCamera.name}`)).toBeInTheDocument();
  });
});
