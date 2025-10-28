import { useEffect, useId } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonLabel?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeButtonLabel = "Close",
}: ModalProps) => {
  const modalId = useId();

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    if (modal) {
      if (isOpen) {
        modal.showModal();
      } else {
        modal.close();
      }
    }
  }, [modalId, isOpen]);

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        {showCloseButton && (
          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              {closeButtonLabel}
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
};
