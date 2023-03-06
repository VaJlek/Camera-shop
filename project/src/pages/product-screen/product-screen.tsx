import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductSimilar from '../../components/product-similar/product-similar';
import Product from '../../components/product/product';
import ReviewBlock from '../../components/rewiew-block/rewiew-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCameraAction, fetchReviewsAction, fetchSimilarCamerasAction } from '../../store/api-actions';
import { getCamera, getSimilar } from '../../store/cameras-data/selectors';
import { getReviews } from '../../store/rewiews-data/selectors';
import { Camera } from '../../types/types';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function ProductScreen (): JSX.Element {

  const {id} = useParams();
  const dispatch = useAppDispatch();

  const camera: Camera | undefined = useAppSelector(getCamera);
  const similarCameras = useAppSelector(getSimilar);
  const reviews = useAppSelector(getReviews);

  useEffect(() => {
    dispatch(fetchCameraAction(Number(id)));
    dispatch(fetchReviewsAction(Number(id)));
    dispatch(fetchSimilarCamerasAction(Number(id)));
  }, [dispatch, id]);

  console.log(camera);

  if (!camera) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <Header />
      <main>
        <div className="page-content">
          <Breadcrumbs />
          <Product camera={camera}/>
          <ProductSimilar similarCameras={similarCameras}/>
          <ReviewBlock reviews={reviews}/>
        </div>
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
