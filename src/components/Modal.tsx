import React from "react";

interface ModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <img
        src={imageUrl}
        alt="Full-size Cat"
        className="max-w-full max-h-full cursor-pointer"
      />
    </div>
  );
};

export default Modal;
