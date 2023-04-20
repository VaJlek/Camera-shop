import { InfinitySpin } from 'react-loader-spinner';

function LoadingScreen(): JSX.Element {
  return (
    <InfinitySpin
      width='200'
      color="blue"
    />
  );
}

export default LoadingScreen;
