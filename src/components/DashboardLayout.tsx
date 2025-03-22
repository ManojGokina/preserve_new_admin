import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Bell,
  Menu,
  X,
  LogOut,
  UserPlus,
} from 'lucide-react';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Users', href: '/dashboard/users', icon: Users },
  { name: 'Documents', href: '/dashboard/docs', icon: FileText },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen">
      {/* Background image with blur */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat blur-2xl scale-110 -z-10"
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp2060641.jpg")'
        }}
      />
      
      {/* Overlay for better contrast */}
      <div className="fixed inset-0 bg-black/50 -z-10" />

      {/* Sidebar */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div 
          className={`fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-in-out ${
            sidebarOpen ? 'opacity-100' : 'opacity-0'
          }`} 
          onClick={() => setSidebarOpen(false)} 
        />
        <div 
          className={`fixed inset-y-0 left-0 w-64 backdrop-blur-lg bg-white/10 border-r border-white/10 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex h-16 items-center justify-between px-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white">Preserve Life</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 hover:bg-white/10 transition-colors"
            >
              <X className="h-6 w-6 text-white/70" />
            </button>
          </div>
          <nav className="mt-4 space-y-1 px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  location.pathname === item.href
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-screen flex flex-col">
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between backdrop-blur-lg bg-white/10 border-b border-white/10 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              className="rounded-lg p-1 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-white">Preserve Life</h1>
          </div>

          <div className="flex items-center gap-x-4">
            <Link
              to="/dashboard/users/new"
              className="flex items-center gap-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/10"
            >
              <UserPlus className="h-5 w-5" />
              <span className="hidden sm:inline">Add User</span>
            </Link>
            <button className="relative">
              <Bell className="h-6 w-6 text-white/70 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                3
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-2 text-sm font-medium text-white/70 hover:text-white transition-colors rounded-lg px-2 py-1 hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <main className="flex-1 py-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;