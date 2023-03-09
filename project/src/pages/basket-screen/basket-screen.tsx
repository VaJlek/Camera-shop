import Basket from '../../components/basket/basket';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

export default function BasketScreen (): JSX.Element {
  return (
    <>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs name='Корзина'/>
          <Basket />
        </div>
      </main>
      <Footer />
    </>
  );
}
