'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminButton } from '@/components/admin/AdminButton';
import { AdminBadge } from '@/components/admin/AdminBadge';
import { getProducts, type Product, deleteProduct } from '@/lib/admin';

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setProducts(getProducts());
    setLoading(false);
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this product?')) return;
    setDeletingId(id);
    try {
      deleteProduct(id);
      setProducts(getProducts());
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <AdminHeader />
        <div className="admin-dashboard-main">
          <div className="admin-dashboard-content">
            <div className="admin-loading">
              <div className="admin-loading-spinner"></div>
              <p>Loading products...</p>
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
          <div className="admin-section-header">
            <div>
              <h1 className="admin-section-title">Products</h1>
              <p className="admin-section-description">
                Manage your store products. Add, edit, or remove items.
              </p>
            </div>
            <AdminButton
              variant="primary"
              onClick={() => router.push('/admin/products/new')}
            >
              ＋ Add New Product
            </AdminButton>
          </div>

          {products.length === 0 ? (
            <div className="admin-product-empty">
              <p>No products yet.</p>
              <p className="admin-product-add-link">
                <a href="/admin/products/new">Add your first product →</a>
              </p>
            </div>
          ) : (
            <div className="admin-products">
              <table className="admin-product-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Sizes</th>
                    <th>Tag</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="admin-product-image"
                        />
                      </td>
                      <td className="admin-product-name">{product.name}</td>
                      <td className="admin-product-price">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td>
                        <span
                          className={`admin-product-stock ${
                            product.stock <= 5
                              ? 'low'
                              : product.stock <= 10
                              ? 'medium'
                              : 'high'
                          }`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                      <td className="admin-product-sizes">{product.sizes.join(', ')}</td>
                      <td>
                        <span className="admin-badge" style={{ background: 'rgba(17,17,119,0.1)', color: '#111111', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: '700' }}>
                          {product.tag}
                        </span>
                      </td>
                      <td>
                        <div className="admin-product-actions">
                          <button
                            className="admin-btn-edit"
                            onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          >
                            Edit
                          </button>
                          <button
                            className="admin-btn-delete"
                            onClick={(e) => handleDelete(product.id, e)}
                            disabled={deletingId === product.id}
                          >
                            {deletingId === product.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}