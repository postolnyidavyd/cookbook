import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  const dialog = useRef(null);
  useEffect(() => {
    try {
      if (isOpen) dialog.current.showModal();
      else dialog.current.close();
    } catch {
      /**/
    }
  }, [isOpen]);
  const handleBackdropClick = (event) => {
    const dialogElement = dialog.current;
    const rectangle = dialogElement.getBoundingClientRect();
    const clickInsideDialog =
      event.clientX >= rectangle.left &&
      event.clientX <= rectangle.right &&
      event.clientY >= rectangle.top &&
      event.clientY <= rectangle.bottom;

    if (!clickInsideDialog) onClose();
  };
  return createPortal(
    <StyledModal ref={dialog} onClose={onClose} onClick={handleBackdropClick}>
      {children}
    </StyledModal>,
    document.getElementById('modal')
  );
};
const StyledModal = styled.dialog`
  border: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
    background-color: transparent;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  &::backdrop {
    background: rgba(0, 0, 0, 0.57);
  }
`;
export default Modal;
