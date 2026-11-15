'use client';

import { useState, type KeyboardEvent } from 'react';

interface AdminPasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function AdminPasswordInput({
  value,
  onChange,
  label = 'Password',
}: AdminPasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !error) {
      setError('');
    }
  };

  return (
    <div className="admin-password-input">
      <label htmlFor="admin-password">{label}</label>
      <div className="admin-password-wrapper">
        <input
          id="admin-password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => {
            setError('');
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter admin password"
          autoComplete="current-password"
          aria-invalid={!!error}
          aria-describedby={error ? 'admin-password-error' : undefined}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="admin-password-toggle"
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          <span aria-hidden="true">{showPassword ? '○' : '●'}</span>
        </button>
      </div>
      {error && (
        <span id="admin-password-error" className="admin-error-message">
          {error}
        </span>
      )}
    </div>
  );
}