'use client';

import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = 'Carregando...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
      <FontAwesomeIcon
        icon={faSpinner}
        className="animate-spin text-[var(--primary-accent)] text-3xl sm:text-4xl max-w-8 max-h-8"
      />
      <p className="text-[var(--muted-text)] font-medium text-sm sm:text-base">{message}</p>
    </div>
  );
}