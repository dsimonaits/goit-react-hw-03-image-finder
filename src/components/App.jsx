import React, { Component } from 'react';
import Searchbar from './Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal/Modal';
import { AppStyled } from './App.styled';
import { Container } from './Section/Section.styled';
import Notification from './Notification/Notification';
import Loader from './Loader';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    totalImages: [],
    status: 'idle',
    currentImage: null,
    isLoading: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    } else {
    }
  }

  getImages = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    fetchImages(query, page, this.fetchError)
      .then(({ data: { hits, totalHits } }) => {
        if (hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            totalImages: totalHits,
            status: 'resolved',
            error: '',
          }));
        } else {
          this.setState({ status: 'rejected' });
        }
      })
      .catch(error => {
        this.setState({
          error: 'Something went wrong!',
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleFormSubmit = query => {
    if (query.trim() !== '' && query !== this.state.query) {
      this.setState({ query, page: 1, images: [] });
    }
    if (query.trim() === '') {
      this.setState({ status: 'emptyQuery' });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  openModal = data => {
    this.setState({ currentImage: data });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  fetchError = message => {
    this.setState({ error: message });
  };

  render() {
    const {
      images,
      status,
      currentImage,
      isLoading,
      error,
      totalImages,
      page,
    } = this.state;
    const maxPage = Math.ceil(totalImages / 12);
    console.log(maxPage);
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />

            {isLoading ? (
              <Loader />
            ) : (
              maxPage !== page && (
                <Button text="Load more" clickHandler={this.loadMore} />
              )
            )}

            {currentImage && (
              <Modal image={currentImage} closeModal={this.closeModal} />
            )}
          </>
        )}
        {status === 'rejected' && (
          <Container>
            <Notification
              message={'There are no results that match your search!'}
            />
          </Container>
        )}
        {status === 'emptyQuery' && (
          <Container>
            <Notification message={'Please write something first!'} />
          </Container>
        )}
        {error !== '' && (
          <Container>
            <Notification message={error} />
          </Container>
        )}
      </AppStyled>
    );
  }
}
