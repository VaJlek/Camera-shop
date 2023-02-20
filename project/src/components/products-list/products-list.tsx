import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: Cameras;
};

export default function ProductsList ({cameras}: ProductListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => (
        <ProductCard key={camera.id} camera={camera} />
      ))}
    </div>
  );
}
