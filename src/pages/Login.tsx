import React, { useState } from 'react';
import { User, Lock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-sm scale-110"
        style={{
          backgroundImage: 'url("https://wallpapercave.com/wp/wp2060641.jpg")'
        }}
      />
      
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md backdrop-blur-lg bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl">
          {/* Company Name */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white tracking-tight">Preserve Life</h1>
          </div>
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-sky-400 rounded-full overflow-hidden mb-4 ring-4 ring-white/50">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">Admin Login</h2>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 text-white placeholder-white/70 backdrop-blur-sm border border-white/10"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-white/50 focus:outline-none transition-all duration-200 text-white placeholder-white/70 backdrop-blur-sm border border-white/10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-white/90">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded bg-white/10 border-white/10 text-sky-500 focus:ring-white/50" />
                <span>Remember me</span>
              </label>
              <a href="#" className="hover:text-white font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2 group backdrop-blur-sm border border-white/10"
            >
              <span>Sign In</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </form>

          <div className="text-center text-sm text-white/70 mt-6">
            <p>Sign in options</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;