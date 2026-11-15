'use client';

import { type TextareaHTMLAttributes, type ReactNode } from 'react';

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: ReactNode;
  fullWidth?: boolean;
}

export function AdminTextarea({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  id,
  ...props
}: AdminTextareaProps) {
  const textareaId = id || `admin-textarea-${Date.now().toString(36)}`;

  return (
    <div className={`admin-input-wrapper ${fullWidth ? 'w-full' : ''} ${className}`}>
      <label htmlFor={textareaId} className="admin-input-label">
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`admin-textarea-field ${
          error ? 'admin-input-error' : ''
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
        {...props}
      />
      {hint && <span className="admin-input-hint">{hint}</span>}
      {error && (
        <span id={`${textareaId}-error`} className="admin-input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}