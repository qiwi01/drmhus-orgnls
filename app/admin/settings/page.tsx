'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { getSettings, setSettings } from '@/lib/admin';

export default function SettingsPage() {
  const router = useRouter();
  const [settings, setSettingsState] = useState<any>(getSettings());
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setSettingsState((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      setSettings(settings);
      setSuccess(true);
      setSaving(false);
      setTimeout(() => router.push('/admin/settings'), 1500);
    } catch {
      setError('Failed to save settings. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <main className="admin-dashboard-main">
        <div className="admin-dashboard-content">
          <div className="admin-section-header">
            <div>
              <h1 className="admin-section-title">Website Settings</h1>
              <p className="admin-section-description">
                Edit your website content and store information.
              </p>
            </div>
          </div>
          <div className="admin-notification info">
            <span className="admin-notification-close">x</span>
            Settings page is working. Form will appear here.
          </div>
        </div>
      </main>
    </div>
  );
}
