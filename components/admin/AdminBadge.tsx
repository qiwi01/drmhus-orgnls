'use client';

import { type ReactNode } from 'react';

interface AdminBadgeProps {
  variant?: 'success' | 'warning' | 'error' | 'info';
  children: ReactNode;
}

export function AdminBadge({
  variant = 'info',
  children,
}: AdminBadgeProps) {
  const variants = {
    success: 'bg-[#006644] text-white',
    warning: 'bg-[#CC6600] text-white',
    error: 'bg-[#8B0000] text-white',
    info: 'bg-[#111111] text-[#F5F3EE]',
  };

  return (
    <span className={`admin-badge ${variants[variant]} inline-flex items-center px-2 py-1 rounded-full text-[10px] font-medium`}>
      {children}
    </span>
  );
}