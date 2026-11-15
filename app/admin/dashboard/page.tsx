'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminButton } from '@/components/admin/AdminButton';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { getProducts, type Product } from '@/lib/admin';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProducts(getProducts());
    setLoading(false);
  }, []);

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminHeader />
        <div className="admin-dashboard-main">
          <div className="admin-dashboard-content">
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <p>Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <main className="admin-dashboard-main">
        <div className="admin-dashboard-content">
          <h1 className="admin-dashboard-title">Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Welcome back! Manage your store products and website content from here.
          </p>

          <div className="admin-stats">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">🛍️</div>
              <div className="admin-stat-value">{products.length}</div>
              <div className="admin-stat-label">Total Products</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">📦</div>
              <div className="admin-stat-value">
                {products.filter(p => p.stock <= 5).length}
              </div>
              <div className="admin-stat-label">Low Stock Items</div>
            </div>
            <div className="admin-stat-card">
              <div className="admin-stat-icon">🏷️</div>
              <div className="admin-stat-value">2</div>
              <div className="admin-stat-label">Product Types</div>
            </div>
          </div>

          <div className="admin-dashboard-nav">
            <div className="admin-nav-section">Main</div>
            <button
              className={`admin-nav-item ${typeof window !== 'undefined' ? (() => {
                const path = window.location.pathname;
                return path === '/admin/dashboard' ? 'active' : '';
              })() : ''}`}
              onClick={() => handleNavigate('/admin/dashboard')}
            >
              <span className="admin-nav-icon">📊</span>
              <span className="admin-nav-text">Overview</span>
            </button>

            <div className="admin-nav-section">Products</div>
            <button
              className={`admin-nav-item ${typeof window !== 'undefined' ? (() => {
                const path = window.location.pathname;
                return path === '/admin/products' ? 'active' : '';
              })() : ''}`}
              onClick={() => handleNavigate('/admin/products')}
            >
              <span className="admin-nav-icon">🛍️</span>
              <span className="admin-nav-text">All Products</span>
              <AdminBadge variant="info">{products.length}</AdminBadge>
            </button>
            <button
              className="admin-nav-item"
              onClick={() => handleNavigate('/admin/products/new')}
            >
              <span className="admin-nav-icon">＋</span>
              <span className="admin-nav-text">Add Product</span>
            </button>

            <div className="admin-nav-section">Content</div>
            <button
              className={`admin-nav-item ${typeof window !== 'undefined' ? (() => {
                const path = window.location.pathname;
                return path === '/admin/settings' ? 'active' : '';
              })() : ''}`}
              onClick={() => handleNavigate('/admin/settings')}
            >
              <span className="admin-nav-icon">🎨</span>
              <span className="admin-nav-text">Website Settings</span>
            </button>
            <button
              className="admin-nav-item"
              onClick={() => handleNavigate('/admin/settings/content')}
            >
              <span className="admin-nav-icon">📝</span>
              <span className="admin-nav-text">Content Editor</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}