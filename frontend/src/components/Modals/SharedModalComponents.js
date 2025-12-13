import styled from 'styled-components';

export const Paragraph = styled.p`
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: none;
  text-align: center;
  margin-top: 1rem;
`;
export const Heading = styled.h3`
  padding:${({$padding})=> $padding || ""};
  text-align: center;
  font-size: 36px;
  font-style: normal;
  font-weight: 600;
  margin-bottom: 3.25rem;
`;
export const ControlElementRow = styled.div`
  margin-top: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 0.75rem; 
`;