import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ text, clickHandler }) => {
  return <Btn onClick={clickHandler}>{text}</Btn>;
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  clickHandler: PropTypes.func.isRequired,
};
