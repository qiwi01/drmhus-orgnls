'use client';

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function AdminButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: AdminButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-mono text-xs rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#111111] text-[#F5F3EE] hover:bg-[#222222] focus:ring-[#111111]',
    secondary: 'bg-[#F5F3EE] text-[#111111] hover:bg-[#E8E5DF] focus:ring-[#858585]',
    danger: 'bg-[#8B0000] text-white hover:bg-[#A00000] focus:ring-[#8B0000]',
    ghost: 'bg-transparent text-[#111111] hover:bg-[#F0F0F0] focus:ring-[#858585]',
  };

  const sizes = {
    sm: 'px-2 py-1 text-[10px]',
    md: 'px-3 py-2 text-xs',
    lg: 'px-4 py-3 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}