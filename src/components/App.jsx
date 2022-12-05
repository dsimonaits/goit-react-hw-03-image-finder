import React, { Component } from 'react';
import Searchbar from './Searchbar';
import fetchImages from 'services/pixabay-api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Modal from './Modal/Modal';
import { AppStyled } from './App.styled';
import { Container } from './Section/Section.styled';
import { InfinitySpin } from 'react-loader-spinner';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    status: 'idle',
    currentImage: null,
    isLoading: false,
    error: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  }

  getImages = () => {
    const { query, page } = this.state;
    this.setState({ status: 'pending' });
    fetchImages(query, page)
      .then(({ data: { hits } }) => {
        if (hits.length !== 0) {
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            status: 'resolved',
            error: '',
          }));
        } else {
          this.setState({ status: 'rejected' });
        }
      })
      .catch(error => {
        this.setState({
          error: error.message,
        });
      })
      .finally(() => {
        this.setState({
          isLoading: false,
        });
      });
  };

  handleFormSubmit = query => {
    if (query.trim() !== '') {
      this.setState({ query, page: 1, images: [] });
    } else {
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

  render() {
    const { images, status, currentImage } = this.state;
    return (
      <AppStyled>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'resolved' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            <Button text="Load more" clickHandler={this.loadMore} />
            {currentImage && (
              <Modal image={currentImage} closeModal={this.closeModal} />
            )}
          </>
        )}
        {status === 'rejected' && (
          <Container>
            <p>There is no search matches!</p>
          </Container>
        )}
        {status === 'emptyQuery' && (
          <Container>
            <p>Write something first!</p>
          </Container>
        )}
        {status === 'pending' && (
          <Container>
            <InfinitySpin width="200" color="#3f51b5" />
          </Container>
        )}
      </AppStyled>
    );
  }
}
