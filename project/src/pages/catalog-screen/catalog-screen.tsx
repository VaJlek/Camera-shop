import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Catalog from '../../components/catalog/catalog';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingScreen from '../../components/loading/loading';
import Modal from '../../components/modal/modal';
import { FetchStatus, ModalState } from '../../const';
import { useAppSelector } from '../../hooks';
import { getModalState } from '../../store/app-process/selectors';
import { getPromoFetchStatus } from '../../store/promo-data/selectors';

export default function CatalogScreen (): JSX.Element {

  const promoFetchStatus = useAppSelector(getPromoFetchStatus);
  const modalState: string = useAppSelector(getModalState);

  if (
    promoFetchStatus === FetchStatus.Idle ||
    promoFetchStatus === FetchStatus.Loading
  ) {
    return <LoadingScreen />;
  }


  return (
    <div className="wrapper">
      <Header/>
      <main>
        <Banner />
        <div className="page-content">
          <Breadcrumbs />
          <Catalog />
          {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
        </div>
      </main>
      <Footer/>
    </div>
  );
}
