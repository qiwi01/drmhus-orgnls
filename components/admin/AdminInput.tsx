'use client';

import { type InputHTMLAttributes, type ReactNode } from 'react';

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: ReactNode;
  fullWidth?: boolean;
}

export function AdminInput({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  id,
  ...props
}: AdminInputProps) {
  const inputId = id || `admin-input-${Math.random().toString(36).slice(2)}`;

  return (
    <div className={`admin-input-wrapper ${fullWidth ? 'w-full' : ''} ${className}`}>
      <label htmlFor={inputId} className="admin-input-label">
        {label}
      </label>
      <input
        id={inputId}
        className={`admin-input-field ${
          error ? 'admin-input-error' : ''
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {hint && <span className="admin-input-hint">{hint}</span>}
      {error && (
        <span id={`${inputId}-error`} className="admin-input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}