import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/index';
import cn from 'classnames';
import { fetchCamerasBySearchAction } from '../../store/api-actions';
import { getCamerasByName } from '../../store/cameras-data/selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

export default function SearchForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [listOpend, setListOpened] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const camerasByName = useAppSelector(getCamerasByName);

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputValue(String(evt.target.value));

    if (evt.target.value) {
      dispatch(fetchCamerasBySearchAction(String(evt.target.value)));
      setListOpened(true);
    }

    if (!evt.target.value) {
      setListOpened(false);
    }
  };

  const handleCloseBtnClick = () => {
    setInputValue('');
    setListOpened(false);
  };

  const getFormClassName = () :string => cn('form-search', {
    'list-opened': listOpend
  });

  return (
    <div className={getFormClassName()}>
      <form >
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchChange}
            value={inputValue}
          />
        </label>
        <ul className="form-search__select-list scroller">
          {camerasByName?.map((camera) => (
            <Link key={camera.name} tabIndex={0} to={`${AppRoute.Product}/${camera.id}`}>
              <li
                className="form-search__select-item"
              >
                {camera.name}
              </li>
            </Link>
          ))}
        </ul>
      </form>
      <button
        className="form-search__reset"
        type="reset"
        onClick={handleCloseBtnClick}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}
