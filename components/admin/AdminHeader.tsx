'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { logoutAdmin, isAdminAuthenticated } from '@/lib/admin';

export function AdminHeader() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(null);

  useEffect(() => {
    if (isAdminAuthenticated()) {
      const session = JSON.parse(
        localStorage.getItem('drmhus_admin_session') || '{}'
      ) as { name: string; avatar: string };
      setUser(session);
    }
  }, []);

  const handleLogout = () => {
    logoutAdmin();
    setUser(null);
    router.push('/admin/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-left">
        <button 
          onClick={() => router.push('/admin/dashboard')}
          className="admin-back-btn"
          aria-label="Back to dashboard"
        >
          <span aria-hidden="true">←</span> Back
        </button>
      </div>
      <div className="admin-header-center">
        <h1 className="admin-title">{typeof window !== 'undefined' ? (() => {
          const path = window.location.pathname;
          if (path.includes('/products')) return 'Product Management';
          if (path.includes('/settings')) return 'Website Settings';
          return 'Admin Dashboard';
        })() : ''}</h1>
      </div>
      <div className="admin-header-right">
        {user && (
          <div className="admin-user-menu">
            <img src={user.avatar} alt={user.name} className="admin-user-avatar" />
            <span className="admin-user-name">{user.name}</span>
            <button 
              onClick={handleLogout}
              className="admin-logout-btn"
              aria-label="Logout"
            >
              <span aria-hidden="true">✕</span> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}