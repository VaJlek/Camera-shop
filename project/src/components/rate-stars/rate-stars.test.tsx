import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route/history-route';
import RateStars from './rate-stars';

const history = createMemoryHistory();

describe('Component: RatingBar', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <RateStars rating={4} />
      </HistoryRouter>,
    );

    expect(screen.getByTestId('icon-4')).toBeInTheDocument();
  });
});
