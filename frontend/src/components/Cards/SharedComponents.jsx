import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Card = styled.article`
  position: relative;
  background-color: #d4d9ca; /* Світло-зелений */
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease;

  cursor: pointer;
  &:hover {
    transform: translateY(-4px);
  }
`;
export const CardLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  height: 100%;
`;
export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 66.67%; /* Співвідношення 3:2 */
  overflow: hidden;
`;
export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.05); // Збільшення зображення при наведенні
  }
`;
export const ActionButtons = styled.div`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
export const IconButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;
export const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
`;
export const MetaInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.25rem;
  font-size: 0.9rem;
`;

export const MetaItemWrapper = styled.div`
  color: #757575;
  font-size: 0.875rem;
  width: auto;
  height: auto;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  gap: 0.25rem;
`;
