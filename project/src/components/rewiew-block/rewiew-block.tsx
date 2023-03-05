import { Reviews } from '../../types/types';
import ReviewCard from '../review-card/review-card';


type ReviewBlockProps = {
  reviews: Reviews | null;
}

export default function ReviewBlock({reviews}: ReviewBlockProps): JSX.Element {

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {reviews?.map((item) => (
              <ReviewCard
                key={item.id}
                review={item}
              />
            ))}
          </ul>
          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
