'use client';

import { ReactNode, useRef, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleBackgroundClick(e: React.MouseEvent) {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  }

  return (
    <div
      ref={modalRef}
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[var(--background)]/80 p-4"
    >
      <div className="bg-[var(--card-background)] rounded-lg shadow-xl p-5 sm:p-6 max-w-lg w-full relative border border-[var(--border-color)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--muted-text)] hover:text-[var(--foreground)] text-2xl leading-none p-1 rounded-full transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[var(--primary-accent)]"
          aria-label="Fechar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}