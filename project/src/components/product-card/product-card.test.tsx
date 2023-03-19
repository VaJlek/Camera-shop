import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeProduct } from '../../tests/mocks';
import ProductCard from './product-card';

const history = createMemoryHistory();
const fakeProduct = makeFakeProduct();

describe('Component: ProductCard', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ProductCard camera={fakeProduct}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeProduct.name}`)).toBeInTheDocument();
  });
});
