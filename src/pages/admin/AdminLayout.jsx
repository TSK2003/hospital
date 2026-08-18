import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Building2,
  UserRound,
  Layers3,
  MapPin,
  FileText,
  Cpu,
  CalendarCheck,
  Sparkles,
  Award,
  LogOut,
  Menu,
  X,
  HeartHandshake,
  ExternalLink,
  BedDouble,
  Users
} from 'lucide-react';

import AdminDashboard from './AdminDashboard';
import AdminHospitalInfo from './AdminHospitalInfo';
import AdminDoctors from './AdminDoctors';
import AdminDepartments from './AdminDepartments';
import AdminBranches from './AdminBranches';
import AdminBlog from './AdminBlog';
import AdminTechnologies from './AdminTechnologies';
import AdminAppointments from './AdminAppointments';
import AdminHeroSection from './AdminHeroSection';
import AdminWhyChooseUs from './AdminWhyChooseUs';
import AdminBeds from './AdminBeds';
import AdminStaff from './AdminStaff';

const sidebarLinks = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/beds', label: 'Bed & Ward Management', icon: BedDouble },
  { to: '/admin/staff', label: 'Staff & Workforce', icon: Users },
  { to: '/admin/appointments', label: 'Booked Appointments', icon: CalendarCheck },
  { to: '/admin/doctors', label: 'Doctors Directory', icon: UserRound },
  { to: '/admin/departments', label: 'Departments', icon: Layers3 },
  { to: '/admin/branches', label: 'Branch Campuses', icon: MapPin },
  { to: '/admin/technologies', label: 'Equipment & Tech', icon: Cpu },
  { to: '/admin/blog', label: 'Health Articles', icon: FileText },
  { to: '/admin/hospital-info', label: 'Hospital Profile', icon: Building2 },
  { to: '/admin/hero-section', label: 'Landing Hero Content', icon: Sparkles },
  { to: '/admin/why-choose-us', label: 'Feature Highlights', icon: Award },
];

const AdminLayout = () => {
  const { isAuthenticated, logout, hospitalInfo } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin-panel-login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/admin-panel-login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex text-slate-800">
      
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-sky-700 rounded flex items-center justify-center text-white">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide uppercase">{hospitalInfo.name || 'LIFECARE'}</p>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Hospital ERP Admin</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-2.5 space-y-0.5">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-2.5 px-3 py-2 rounded text-xs font-medium transition-colors group ${
                      isActive
                        ? 'bg-sky-700 text-white font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-3 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 rounded text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* SIDEBAR OVERLAY (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Management Portal
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <NavLink
              to="/"
              target="_blank"
              className="px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-50 border border-sky-200 rounded transition-colors flex items-center space-x-1"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3" />
            </NavLink>
            <div className="w-7 h-7 bg-slate-900 rounded flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Routes>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="beds" element={<AdminBeds />} />
            <Route path="staff" element={<AdminStaff />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="hospital-info" element={<AdminHospitalInfo />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="departments" element={<AdminDepartments />} />
            <Route path="branches" element={<AdminBranches />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="technologies" element={<AdminTechnologies />} />
            <Route path="hero-section" element={<AdminHeroSection />} />
            <Route path="why-choose-us" element={<AdminWhyChooseUs />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
