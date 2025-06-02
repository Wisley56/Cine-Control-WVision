'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string; // <--- Adicionar esta linha
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '', // <--- Adicionar e inicializar
}: ButtonProps) {
  const baseClasses = 'font-semibold py-2 px-4 rounded-lg shadow transition-all duration-150 ease-in-out';

  const variantClasses = clsx({
    'bg-[var(--primary-accent)] text-[var(--background)] hover:bg-[var(--primary-accent-hover)]': variant === 'primary',
    'bg-[var(--secondary-accent)] text-[var(--foreground)] hover:bg-[var(--secondary-accent-hover)]': variant === 'secondary',
    'bg-[var(--danger-accent)] text-white hover:bg-[var(--danger-accent-hover)]': variant === 'danger',
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, className)} // <--- Mesclar className aqui
    >
      {children}
    </button>
  );
}