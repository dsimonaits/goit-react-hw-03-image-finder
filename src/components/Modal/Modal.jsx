import { Component } from 'react';
import { Overlay } from './Modal.styled';
import { ModalWindow } from './Modal.styled';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }

  closeByEsc = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };

  render() {
    const {
      image: { src, alt },
    } = this.props;
    return (
      <Overlay onClick={this.closeByBackdropClick}>
        <ModalWindow>
          <img src={src} alt={alt} />
        </ModalWindow>
      </Overlay>
    );
  }
}

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
