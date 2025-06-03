'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'secondary' | 'danger';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: Variant;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,}: ButtonProps) {
  const baseClasses = 'font-semibold py-2 px-4 rounded-lg shadow transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50';

  const variantClasses = clsx({
    'bg-[var(--primary-accent)] text-[var(--background)] hover:bg-[var(--primary-accent-hover)] focus:ring-[var(--primary-accent)]': variant === 'primary' && !disabled,
    'bg-[var(--secondary-accent)] text-[var(--foreground)] hover:bg-[var(--secondary-accent-hover)] focus:ring-[var(--secondary-accent)]': variant === 'secondary' && !disabled,
    'bg-[var(--danger-accent)] text-white hover:bg-[var(--danger-accent-hover)] focus:ring-[var(--danger-accent)]': variant === 'danger' && !disabled,
    'bg-gray-400 text-gray-700 cursor-not-allowed opacity-70': disabled, 
  });

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(baseClasses, variantClasses, className)}
      disabled={disabled}
    >
      {children}
    </button>
  );
}