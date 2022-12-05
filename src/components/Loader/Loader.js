import { InfinitySpin } from 'react-loader-spinner';
import { LoaderOverlay } from './Loader.styled';

function Loader() {
  return (
    <LoaderOverlay>
      <InfinitySpin color="#3f51b5" />
    </LoaderOverlay>
  );
}

export default Loader;
