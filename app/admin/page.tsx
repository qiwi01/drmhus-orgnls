'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminPasswordInput } from '@/components/admin/AdminPasswordInput';
import { AdminButton } from '@/components/admin/AdminButton';
import { validateAdminLogin, createAdminSession } from '@/lib/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!username.trim()) {
      setError('Username is required');
      setLoading(false);
      return;
    }

    if (!password) {
      setError('Password is required');
      setLoading(false);
      return;
    }

    if (!validateAdminLogin(username, password)) {
      setError('Invalid username or password');
      setLoading(false);
      return;
    }

    try {
      createAdminSession({
        username: username.trim(),
        name: 'Administrator',
        avatar: 'https://robohash.org/admin.png',
      });
      router.push('/admin/dashboard');
    } catch {
      setError('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <div className="admin-login-icon">📦</div>
          <h1>DRMHUS ORGNLS.</h1>
          <p>Admin Panel</p>
        </div>

        <h2 className="admin-login-title">Admin Access</h2>
        <p className="admin-login-subtitle">Sign in to manage products and website settings</p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-login-username">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              autoComplete="username"
              disabled={loading}
            />
          </div>

          <AdminPasswordInput
            value={password}
            onChange={setPassword}
            label="Password"
          />

          {error && <span className="admin-error-message">{error}</span>}

          <div className="admin-login-actions">
            <AdminButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </AdminButton>
          </div>
        </form>

        <p className="admin-login-footer">
          Default credentials: <strong>admin</strong> / <strong>admin123</strong>
        </p>
      </div>
    </div>
  );
}