import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Banner from './banner';

const history = createMemoryHistory();

describe('Component: Banner', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Banner />
      </HistoryRouter>,
    );

   expect(screen.getByText('Could not load promo')).toBeInTheDocument();
  });
});
