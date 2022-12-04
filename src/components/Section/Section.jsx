import PropTypes from 'prop-types';
import { Container } from './Section.styled';

const Section = ({ title, border, children }) => {
  return (
    <Container border={border}>
      {title && <h2>{title}</h2>}
      {children}
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  border: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Section;
