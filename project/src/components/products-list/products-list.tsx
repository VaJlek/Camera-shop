import { Cameras } from '../../types/types';
import ProductCard from '../product-card/product-card';

type ProductListProps = {
  cameras: Cameras;
};

export default function ProductsList ({cameras}: ProductListProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cameras.length > 0
        ?
        cameras.map((item) => (
          <ProductCard
            key={item.id}
            camera={item}
          />
        ))
        : <div><h2>По вашему запросу ничего не найдено</h2></div>}
    </div>
  );
}
