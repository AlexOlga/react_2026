import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const modalRoot = document.body;
const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;
  const handleEsc = (event: KeyboardEvent | globalThis.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };
  document.addEventListener('keydown', handleEsc);
  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={ handleOverlayClick}
    >
      <div
        aria-modal="true"
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl outline-none"
      >
        <div>          
          <button onClick={onClose} className=" text-xl">
            X
          </button>
        </div>

        {children}
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
