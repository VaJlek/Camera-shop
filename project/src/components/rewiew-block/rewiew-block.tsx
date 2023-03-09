import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ModalState, REVIEWS_COUNT } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeModalState, setReviewsAmount } from '../../store/app-process/app-process';
import { getReviewsAmount } from '../../store/app-process/selectors';
import { Reviews } from '../../types/types';
import ReviewCard from '../review-card/review-card';


type ReviewBlockProps = {
  reviews: Reviews | null;
}

export default function ReviewBlock({reviews}: ReviewBlockProps): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReviewsAmount(REVIEWS_COUNT));
  }, [dispatch, id]);

  const reviewsAmount = useAppSelector(getReviewsAmount);

  const handleShowMoreReviews = () => {
    dispatch(setReviewsAmount(reviewsAmount + REVIEWS_COUNT));
  };

  const handleClickNewReviewBtn = () => {
    dispatch(changeModalState(ModalState.ReviewForm));
  };

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={handleClickNewReviewBtn}
            >
              Оставить свой отзыв
            </button>
          </div>
          <ul className="review-block__list">
            {reviews?.slice(0, reviewsAmount).map((item) => (
              <ReviewCard
                key={item.id}
                review={item}
              />
            ))}
          </ul>
          <div className="review-block__buttons">
            <button
              onClick={handleShowMoreReviews}
              className="btn btn--purple"
              type="button"
              disabled = {reviews?.length === undefined || reviewsAmount >= reviews?.length }
            >
              Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
