import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

type OrderSuccessProps = {
  onClick: () => void;
}

export default function OrderSuccess({onClick}: OrderSuccessProps): JSX.Element {
  const navigate = useNavigate();

  const handleToCatalogClick = () => {
    onClick();
    navigate(AppRoute.Root);
  };

  return (
    <div className="modal__content">
      <p className="title title--h4">
        Спасибо за покупку
      </p>
      <svg
        className="modal__icon"
        width='80'
        height='78'
        aria-hidden="true"
      >
        <use
          xlinkHref='#icon-success'
        >
        </use>
      </svg>
      <div className="modal__buttons">
        <button
          autoFocus
          onClick={handleToCatalogClick}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
      <button onClick={onClick} className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </div>
  );
}
