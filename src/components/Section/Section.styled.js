import styled from 'styled-components';

export const Container = styled.section`
  border: ${props => (props.border === 'true' ? '1px solid black' : 'none')};
  width: 500px;
  /* max-height: 500px; */
  height: auto;
  padding: 5px;

  text-align: center;
  margin: 0 auto;
`;
