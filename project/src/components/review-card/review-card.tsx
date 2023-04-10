import dayjs from 'dayjs';
import { Review } from '../../types/types';
import RateStars from '../rate-stars/rate-stars';

type ReviewCardProps = {
  review: Review;
}

export default function ReviewCard({review}: ReviewCardProps): JSX.Element {

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{dayjs(review.createAt).locale('ru').format('D MMMM')}</time>
      </div>
      <div className="rate review-card__rate">
        <RateStars
          rating={review.rating}
        />
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}
