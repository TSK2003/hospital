import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Context
import { AdminProvider } from './context/AdminContext';

// Layout Components
import TopHeader from './components/layout/TopHeader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingActions from './components/layout/FloatingActions';
import AppointmentModal from './components/common/AppointmentModal';
import EnquiryModal from './components/common/EnquiryModal';

// Public Pages
import HomePage from './pages/HomePage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import TechnologiesPage from './pages/TechnologiesPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';
import BranchesPage from './pages/BranchesPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';

// Auto Scroll to Top Component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper to conditionally show public layout (hide on admin routes)
const PublicLayout = ({ children, onOpenAppointment, onOpenEnquiry }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname === '/admin-panel-login';

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-800 antialiased selection:bg-sky-600 selection:text-white">
      {/* Top Emergency Header */}
      <TopHeader onOpenEnquiry={onOpenEnquiry} />

      {/* Sticky Main Navbar */}
      <Navbar onOpenAppointment={() => onOpenAppointment()} />

      {/* Dynamic Route View */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenAppointment={() => onOpenAppointment()} />
    </div>
  );
};

function AppContent() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [appointmentInitialData, setAppointmentInitialData] = useState({});

  const handleOpenAppointment = (data = {}) => {
    // If passed a simple branchId string or an object with details
    if (typeof data === 'string') {
      setAppointmentInitialData({ branchId: data });
    } else if (typeof data === 'object' && data !== null) {
      setAppointmentInitialData(data);
    } else {
      setAppointmentInitialData({});
    }
    setAppointmentOpen(true);
  };

  return (
    <>
      <ScrollToTop />
      <PublicLayout
        onOpenAppointment={handleOpenAppointment}
        onOpenEnquiry={() => setEnquiryOpen(true)}
      >
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <HomePage
                onOpenAppointment={handleOpenAppointment}
                onOpenEnquiry={() => setEnquiryOpen(true)}
              />
            }
          />
          <Route
            path="/services/:slug"
            element={<ServiceDetailPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/technologies"
            element={<TechnologiesPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/technologies/:slug"
            element={<TechnologyDetailPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/branches"
            element={<BranchesPage onOpenAppointment={(branchId) => handleOpenAppointment({ branchId })} />}
          />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route
            path="/about"
            element={<AboutUsPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/about/overview"
            element={<AboutUsPage onOpenAppointment={handleOpenAppointment} />}
          />
          <Route
            path="/contact"
            element={<ContactPage onOpenAppointment={handleOpenAppointment} />}
          />

          {/* Admin Routes */}
          <Route path="/admin-panel-login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* Fallback to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onOpenAppointment={handleOpenAppointment}
                onOpenEnquiry={() => setEnquiryOpen(true)}
              />
            }
          />
        </Routes>
      </PublicLayout>

      {/* Global Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={() => {
          setAppointmentOpen(false);
          setAppointmentInitialData({});
        }}
        initialData={appointmentInitialData}
      />

      {/* Global Quick Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router>
        <AppContent />
      </Router>
    </AdminProvider>
  );
}

export default App;
