import cn from 'classnames';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { ReviewPost, ReviewPostKeys } from '../../types/types';

const RatingStarsTitles = [
  {title: 'Отлично', value:'5'},
  {title: 'Хорошо', value: '4'},
  {title: 'Нормально', value: '3'},
  {title: 'Плохо', value: '2'},
  {title: 'Ужасно', value: '1'}
];

type ReviewModalProps = {
  onClick: () => void;
  cameraId: number;
}

export default function ReviewModal({onClick, cameraId}: ReviewModalProps): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors } } = useForm< ReviewPost >({
      mode: 'all'
    });

  const onSubmit = (data: ReviewPost) => dispatch(postReviewAction({...data, rating: Number(data.rating), cameraId}));

  const getClassName = (inputName: ReviewPostKeys) => cn('form-review__item', {
    'is-invalid': errors[inputName]
  });


  return (
    <div className="modal__content">
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post" onSubmit={(evt) => {
          handleSubmit(onSubmit)(evt)
            .catch(() => {throw evt;});
        }}
        >
          <div className="form-review__rate">
            <fieldset className={`rate ${getClassName('rating')}`}>
              <legend className="rate__caption">Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  {RatingStarsTitles.map(({title, value}) => (
                    <React.Fragment key={value}>
                      <input
                        autoFocus
                        className="visually-hidden"
                        id={`star-${value}`}
                        type="radio"
                        value={value}
                        { ...register('rating', {
                          required: true,
                        })}
                      />
                      <label className="rate__label" htmlFor={`star-${value}`} title={title}></label>
                    </React.Fragment>
                  ))}
                </div>
                <div className="rate__progress"><span className="rate__stars">0</span> <span>/</span> <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors?.rating && <p className="rate__message">Нужно оценить товар</p>}
            </fieldset>
            <div className={`custom-input ${getClassName('userName')}`}>
              <label>
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  { ...register('userName', {
                    required: true,
                  })}
                />
              </label>
              {errors?.userName && <p className="custom-input__error">Нужно указать имя</p>}
            </div>
            <div className={`custom-input ${getClassName('advantage')}`}>
              <label>
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('advantage', {
                    required: true
                  })}
                />
              </label>
              {errors?.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
            </div>
            <div className={`custom-input ${getClassName('disadvantage')}`}>
              <label>
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('disadvantage', {
                    required: true
                  })}
                />
              </label>
              {errors?.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
            </div>
            <div className={`custom-textarea ${getClassName('review')}`}>
              <label>
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: true,
                    minLength: {
                      value: 5,
                      message: `Комментарий не менее ${5} символов`
                    },
                  })}
                >
                </textarea>
              </label>
              {errors?.disadvantage && <div className="custom-textarea__error">{errors?.review?.message ? errors.review.message : 'Нужно добавить комментарий'}</div>}
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
        </form>
      </div>
      <button
        onClick={onClick}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}

