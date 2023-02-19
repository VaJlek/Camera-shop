import { Link } from 'react-router-dom';
import Header from '../../components/header/header';

export default function NotFoundScreen (): JSX.Element {
  return(
    <>
      <Header/>
      <h1 className="user-page__head">404. Page not found</h1>
      <Link to="/" className="sign-in__link">Вернуться на главную</Link>
    </>
  );
}
