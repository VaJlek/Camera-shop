import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import ProductSimilar from '../../components/product-similar/product-similar';
import Product from '../../components/product/product';
import ReviewBlock from '../../components/rewiew-block/rewiew-block';
import { ModalState } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getModalState } from '../../store/app-process/selectors';
import { getCamera, getSimilar } from '../../store/cameras-data/selectors';
import { getReviews } from '../../store/rewiews-data/selectors';
import { Camera } from '../../types/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function ProductScreen (): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCameraAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
  }, [dispatch, id]);

  const camera: Camera | undefined = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilar);
  const reviews = useAppSelector(getReviews);
  const modalState: string = useAppSelector(getModalState);

  if (!camera) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs name={camera.name}/>
          <Product camera={camera}/>
          {similarCameras.length > 0 && <ProductSimilar similarCameras={similarCameras}/>}
          <ReviewBlock reviews={reviews}/>
        </div>
        {modalState !== ModalState.Closed && <Modal modalState={modalState}/>}
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </>
  );
}
