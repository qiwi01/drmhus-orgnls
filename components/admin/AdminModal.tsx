'use client';

import { type ReactNode, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: AdminModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-width-[400px]',
    md: 'max-width-[600px]',
    lg: 'max-width-[800px]',
  };

  return (
    <AnimatePresence>
      <div className="admin-modal-overlay" onClick={onClose}>
        <motion.div
          className={`admin-modal ${sizes[size]}`}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="admin-modal-header">
            <h2 className="admin-modal-title">{title}</h2>
            <button onClick={onClose} className="admin-modal-close" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="admin-modal-body">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}