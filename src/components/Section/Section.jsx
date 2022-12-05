import PropTypes from 'prop-types';
import { Container } from './Section.styled';

const Section = ({ title, children }) => {
  return (
    <Container>
      {title && <h2>{title}</h2>}
      {children}
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
};

export default Section;
