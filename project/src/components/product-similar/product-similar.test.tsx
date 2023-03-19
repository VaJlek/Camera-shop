import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import { makeFakeCameras } from '../../tests/mocks';
import ProductSimilar from './product-similar';

const history = createMemoryHistory();
const fakeCameras = makeFakeCameras();

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ProductSimilar similarCameras={fakeCameras}/>
      </HistoryRouter>,
    );

    expect(screen.getByText(`${fakeCameras[0].name}`)).toBeInTheDocument();
    expect(screen.getByText('Подробнее')).toBeInTheDocument();
  });
});
