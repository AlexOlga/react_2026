import { useEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
    }
  }, [isOpen]);
  if (!isOpen) return null;
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return;
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-y-auto rounded"
      onClick={handleOverlayClick}
    >
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl outline-none"
        ref={dialogRef}
      >
        <div className="flex items-center justify-end p-5 w-100">
          <button
            onClick={onClose}
            className="bg-blue-500 w-6 h-6 text-white rounded-xm"
          >
          x
          </button>
        </div>
        {children}
        
      </div>
    </div>,
    modalRoot
  );
};
export default Modal;
