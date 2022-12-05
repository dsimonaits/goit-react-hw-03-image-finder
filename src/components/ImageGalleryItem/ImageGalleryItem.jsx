import { GalleryItem } from './ImageGalleryItem.styled';
import { GalleryItemImage } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ images, openModal }) => {
  return (
    <>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <GalleryItem key={id}>
            <GalleryItemImage
              onClick={() => openModal({ src: largeImageURL, alt: tags })}
              src={webformatURL}
              alt={tags}
            />
          </GalleryItem>
        );
      })}
    </>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape).isRequired,
  openModal: PropTypes.func.isRequired,
};
