import Basket from '../../components/basket/basket';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import { ModalState } from '../../const';
import { useAppSelector } from '../../hooks';
import { getModalState } from '../../store/app-process/selectors';

export default function BasketScreen (): JSX.Element {
  const modalState: string = useAppSelector(getModalState);

  return (
    <>
      <Header/>
      <main>
        <div className="page-content">
          <Breadcrumbs name='Корзина'/>
          <Basket />
          {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
        </div>
      </main>
      <Footer />
    </>
  );
}
