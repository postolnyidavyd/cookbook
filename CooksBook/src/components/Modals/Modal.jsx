import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);
  const isMousedownInDialog = useRef(false);

  useEffect(() => {
    try {
      if (isOpen) dialogRef.current.showModal();
      else dialogRef.current.close();
    } catch {
      /**/
    }
  }, [isOpen]);
  const isInsideDialog = (event) => {
    const dialogElement = dialogRef.current;
    const rectangle = dialogElement.getBoundingClientRect();

    return (
      event.clientX >= rectangle.left &&
      event.clientX <= rectangle.right &&
      event.clientY >= rectangle.top &&
      event.clientY <= rectangle.bottom
    );
  };
  const handleMouseDown = (event) => {
    isMousedownInDialog.current = isInsideDialog(event);
  };
  const handleMouseUp = (event) => {
    if(!isInsideDialog(event) && !isMousedownInDialog.current){
      onClose();
    }
    isMousedownInDialog.current = false;
  };

  return createPortal(
    <StyledModal
      ref={dialogRef}
      onClose={onClose}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
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
