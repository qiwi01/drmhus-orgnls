'use client';

import { type SelectHTMLAttributes } from 'react';

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export function AdminSelect({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  options,
  id,
  ...props
}: AdminSelectProps) {
  const selectId = id || `admin-select-${Date.now().toString(36)}`;

  return (
    <div className={`admin-input-wrapper ${fullWidth ? 'w-full' : ''} ${className}`}>
      <label htmlFor={selectId} className="admin-input-label">
        {label}
      </label>
      <select
        id={selectId}
        className={`admin-select-field ${
          error ? 'admin-input-error' : ''
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <span className="admin-input-hint">{hint}</span>}
      {error && (
        <span id={`${selectId}-error`} className="admin-input-error-message">
          {error}
        </span>
      )}
    </div>
  );
}