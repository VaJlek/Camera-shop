import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeCameras } from '../../tests/mocks';
import ProductList from './products-list';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: ProductList', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ProductList cameras={fakeCameras}/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('catalog__cards')).toBeInTheDocument();
  });
});
