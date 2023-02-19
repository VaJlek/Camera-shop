type RateStarsProps = {
  rating: number;
}

export default function RateStars ({rating}: RateStarsProps): JSX.Element {
  return (
    <>
      {Array.from<number>(Array.from({ length: 5 }, (v, k) => k + 1)).map((element, index) => (
        <svg key={ element } width="17" height="16" aria-hidden="true">
          <use xlinkHref={index <= rating - 1 ? '#icon-full-star' : '#icon-star'} ></use>
        </svg>
      ))}
    </>
  );
}
