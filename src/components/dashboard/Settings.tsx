import React, { useState } from 'react';
import { Bell, Lock, User, Globe, Moon, Sun, Palette, Shield, Mail } from 'lucide-react';

const settingsSections = [
  {
    id: 'profile',
    icon: User,
    title: 'Profile Settings',
    description: 'Update your personal information and preferences',
  },
  {
    id: 'security',
    icon: Lock,
    title: 'Security',
    description: 'Manage your account security and authentication',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    description: 'Configure how you receive notifications',
  },
  {
    id: 'appearance',
    icon: Palette,
    title: 'Appearance',
    description: 'Customize the look and feel of your dashboard',
  },
];

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [theme, setTheme] = useState('dark');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    updates: false,
    marketing: false,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <section.icon className="h-5 w-5" />
                <span>{section.title}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <div className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">
                      Profile Picture
                    </label>
                    <div className="flex items-center space-x-4">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face"
                        alt=""
                        className="h-20 w-20 rounded-full"
                      />
                      <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
                        Change Photo
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <div className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">Security Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-white/70 mb-4">Two-Factor Authentication</h3>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10">
                      Enable 2FA
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white/70 mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Current Password"
                      />
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="New Password"
                      />
                      <input
                        type="password"
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
                        placeholder="Confirm New Password"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings */}
          {activeSection === 'notifications' && (
            <div className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        {key === 'email' && <Mail className="h-5 w-5 text-white/70" />}
                        {key === 'push' && <Bell className="h-5 w-5 text-white/70" />}
                        {key === 'updates' && <Globe className="h-5 w-5 text-white/70" />}
                        {key === 'marketing' && <Shield className="h-5 w-5 text-white/70" />}
                        <span className="text-white capitalize">{key} Notifications</span>
                      </div>
                      <button
                        onClick={() => setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          value ? 'bg-green-400' : 'bg-white/10'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            value ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <div className="rounded-lg backdrop-blur-lg bg-white/10 border border-white/10">
              <div className="p-6">
                <h2 className="text-lg font-medium text-white mb-6">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-white/70 mb-4">Theme</h3>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          theme === 'light'
                            ? 'bg-white/20 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }`}
                      >
                        <Sun className="h-5 w-5" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'bg-white/20 text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/15'
                        }`}
                      >
                        <Moon className="h-5 w-5" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;