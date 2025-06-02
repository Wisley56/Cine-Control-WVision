'use client';

import { ReactNode, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[var(--background)]/80" 
    >
      <div className="bg-[var(--card-background)] rounded-lg shadow-lg p-6 max-w-lg w-full relative border border-[var(--border-color)]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[var(--muted-text)] hover:text-[var(--foreground)] text-2xl leading-none p-1 rounded-full transition-colors duration-150"
          aria-label="Fechar modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}