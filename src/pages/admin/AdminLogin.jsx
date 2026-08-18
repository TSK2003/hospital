import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  Eye, 
  EyeOff, 
  LogIn, 
  AlertCircle, 
  HeartHandshake, 
  Lock, 
  User, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight,
  Stethoscope,
  Building2,
  Calendar
} from 'lucide-react';

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState('admin'); // 'admin' or 'patient'
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [patientPhone, setPatientPhone] = useState('+91 63807 67265');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  // If already logged in as admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Admin Manual Login
  const handleAdminSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/admin/dashboard');
      } else {
        setError('Invalid username or password. Use admin / admin123');
      }
      setLoading(false);
    }, 400);
  };

  // 1-Click Instant Demo Admin Login
  const handleInstantAdminLogin = () => {
    setUsername('admin');
    setPassword('admin123');
    setLoading(true);
    setTimeout(() => {
      login('admin', 'admin123');
      navigate('/admin/dashboard');
    }, 300);
  };

  // 1-Click Instant Demo Patient Login
  const handleInstantPatientLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate('/patient/portal');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#081628] via-[#0c2a4d] to-[#061729] flex flex-col justify-between p-4 sm:p-6 text-white antialiased">
      
      {/* Top Navbar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link to="/" className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-md">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <span className="font-heading font-extrabold text-base tracking-tight uppercase block leading-none">
              LIFECARE
            </span>
            <span className="text-[10px] text-sky-300 font-semibold tracking-wider uppercase">
              Multispeciality Hospital
            </span>
          </div>
        </Link>

        <Link
          to="/"
          className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md transition-colors"
        >
          Back to Website
        </Link>
      </div>

      {/* Main Center Card */}
      <div className="w-full max-w-lg mx-auto my-auto">
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
          
          {/* Top Brand Header */}
          <div className="p-6 text-center border-b border-slate-800 bg-slate-950/60">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-950/80 border border-sky-500/30 text-sky-300 rounded-full text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Unified Hospital Access Portal</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Hospital Portal Sign In
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Select your role to access your dedicated management or patient workspace
            </p>
          </div>

          {/* DUAL ROLE TABS: ADMIN vs PATIENT */}
          <div className="grid grid-cols-2 p-1.5 bg-slate-950 border-b border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('admin');
                setError('');
              }}
              className={`py-3 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-sky-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Admin / ERP Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('patient');
                setError('');
              }}
              className={`py-3 rounded-lg transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                activeTab === 'patient'
                  ? 'bg-sky-700 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Patient OP Portal</span>
            </button>
          </div>

          <div className="p-6">
            
            {/* 1. ADMIN ERP LOGIN FORM */}
            {activeTab === 'admin' && (
              <div className="space-y-4">
                
                {/* 1-Click Demo Admin Button */}
                <div className="p-3.5 bg-sky-950/50 border border-sky-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>Instant Demo Access</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      Full ERP Access
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleInstantAdminLogin}
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>🚀 1-Click Demo Admin Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Or Enter Credentials</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded-lg">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="admin"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                        className="w-full pl-9 pr-10 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-sky-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer border border-slate-700"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In to Admin ERP</span>
                  </button>
                </form>

              </div>
            )}

            {/* 2. PATIENT OP PORTAL LOGIN */}
            {activeTab === 'patient' && (
              <div className="space-y-4">
                
                {/* 1-Click Demo Patient Button */}
                <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Instant Demo Patient Access</span>
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">
                      Token & Slip Viewer
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleInstantPatientLogin}
                    disabled={loading}
                    className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-xs rounded-lg transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>🚀 1-Click Demo Patient Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-800"></div>
                  <span className="flex-shrink mx-3 text-slate-500 text-[10px] uppercase tracking-wider font-semibold">Or Enter Patient Phone Number</span>
                  <div className="flex-grow border-t border-slate-800"></div>
                </div>

                <form onSubmit={handleInstantPatientLogin} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-1">
                      Registered Mobile Number
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={patientPhone}
                        onChange={(e) => setPatientPhone(e.target.value)}
                        required
                        placeholder="+91 63807 67265"
                        className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white placeholder-slate-500 text-xs font-medium focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer border border-slate-700"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    <span>Access My Patient Dashboard</span>
                  </button>
                </form>

              </div>
            )}

          </div>

          <div className="p-4 bg-slate-950 text-center border-t border-slate-800 text-[11px] text-slate-400">
            Lifecare Healthcare Systems • 24/7 Casualty Support Hotline: <span className="text-red-400 font-bold">1066</span>
          </div>

        </div>
      </div>

      <div className="text-center text-xs text-slate-500 py-2">
        © 2026 Lifecare Multispeciality Hospital & Research Center. All rights reserved.
      </div>

    </div>
  );
};

export default AdminLogin;
