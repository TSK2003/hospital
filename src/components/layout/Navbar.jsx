import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Menu, 
  X, 
  HeartHandshake, 
  ChevronRight,
  Phone,
  Calendar
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { branchesList as defaultBranches } from '../../data/branchesData';
import { useAdmin } from '../../context/AdminContext';

const Navbar = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'LIFECARE',
    tagline: 'Multispeciality Hospital',
    phone: '+91 63807 67265'
  };
  const servicesList = adminContext?.services || defaultServices;
  const branchesList = adminContext?.branches || defaultBranches;

  const [isSticky, setIsSticky] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [branchesDropdownOpen, setBranchesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setServicesDropdownOpen(false);
    setBranchesDropdownOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`w-full z-40 transition-all duration-200 ${
        isSticky
          ? 'sticky top-0 shadow-sm bg-white border-b border-slate-200'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* HOSPITAL LOGO */}
          <Link
            to="/"
            onClick={() => {
              setServicesDropdownOpen(false);
              setBranchesDropdownOpen(false);
              window.scrollTo(0, 0);
            }}
            className="flex items-center space-x-3 group py-1"
          >
            <div className="w-10 h-10 bg-sky-700 rounded-lg flex items-center justify-center text-white shadow-sm">
              <HeartHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 uppercase">
                  {hospitalInfo.name || 'LIFECARE'}
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-600"></span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase block -mt-0.5">
                {hospitalInfo.tagline || 'Multispeciality Hospital'}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION MENU */}
          <nav className="hidden lg:flex items-center space-x-1">
            
            {/* 1. Home */}
            <Link
              to="/"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                location.pathname === '/'
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            {/* 2. Departments Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center space-x-1 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  servicesDropdownOpen || location.pathname.startsWith('/services')
                    ? 'text-sky-700 bg-sky-50'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
                }`}
              >
                <span>Departments</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${servicesDropdownOpen ? 'rotate-180 text-sky-700' : 'text-slate-400'}`} />
              </button>

              {servicesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-80 z-50 animate-in fade-in duration-150">
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-2.5 max-h-[75vh] overflow-y-auto">
                    <div className="px-3 py-2 bg-slate-50 rounded mb-1.5 flex items-center justify-between border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Clinical Departments</span>
                      <span className="text-[10px] font-semibold text-sky-700">{servicesList.length} Specialties</span>
                    </div>
                    <div className="space-y-0.5">
                      {servicesList.map((service) => (
                        <Link
                          key={service.id}
                          to={`/services/${service.slug}`}
                          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors group"
                        >
                          <span className="truncate">{service.title}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Technology */}
            <Link
              to="/technologies"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                location.pathname.startsWith('/technologies')
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
              }`}
            >
              Technology
            </Link>

            {/* 4. Branches */}
            <div
              className="relative"
              onMouseEnter={() => setBranchesDropdownOpen(true)}
              onMouseLeave={() => setBranchesDropdownOpen(false)}
            >
              <button
                onClick={() => setBranchesDropdownOpen(!branchesDropdownOpen)}
                className={`flex items-center space-x-1 px-3.5 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                  branchesDropdownOpen || location.pathname.startsWith('/branches')
                    ? 'text-sky-700 bg-sky-50'
                    : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
                }`}
              >
                <span>Branches</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${branchesDropdownOpen ? 'rotate-180 text-sky-700' : 'text-slate-400'}`} />
              </button>

              {branchesDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 w-64 z-50 animate-in fade-in duration-150">
                  <div className="bg-white rounded-lg shadow-lg border border-slate-200 p-2.5">
                    <div className="space-y-1">
                      {branchesList.map((branch) => (
                        <Link
                          key={branch.id}
                          to="/branches"
                          className="block px-3 py-2 text-xs text-slate-700 hover:text-sky-700 hover:bg-sky-50 rounded transition-colors"
                        >
                          <span className="font-semibold block">{branch.name}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{branch.mobile}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Health Blog */}
            <Link
              to="/blog"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                location.pathname.startsWith('/blog')
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
              }`}
            >
              Health Blog
            </Link>

            {/* 6. Contact Us */}
            <Link
              to="/contact"
              className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-colors ${
                location.pathname.startsWith('/contact')
                  ? 'text-sky-700 bg-sky-50'
                  : 'text-slate-700 hover:text-sky-700 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>

          </nav>

          {/* RIGHT ACTION BUTTONS (CLEAN & SINGLE PRIMARY CTA) */}
          <div className="hidden sm:flex items-center space-x-4 shrink-0">
            <a
              href={`tel:${hospitalInfo.phone?.replace(/[^0-9+]/g, '') || '+916380767265'}`}
              className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 hover:text-sky-700 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-sky-700" />
              <span>{hospitalInfo.phone || '+91 63807 67265'}</span>
            </a>

            <button
              onClick={onOpenAppointment}
              className="flex items-center space-x-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-md shadow-sm transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-slate-900 rounded-md hover:bg-slate-100"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 text-sm font-semibold">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Home
          </Link>
          <div>
            <button
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
            >
              <span>Departments & Specialties</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServicesOpen && (
              <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-md mt-1 max-h-48 overflow-y-auto font-normal text-xs">
                {servicesList.map((service) => (
                  <Link
                    key={service.id}
                    to={`/services/${service.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-2 py-1 text-slate-600 hover:text-sky-700"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/technologies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Technology
          </Link>
          <Link
            to="/branches"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Branches
          </Link>
          <Link
            to="/blog"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Health Blog
          </Link>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-md"
          >
            Contact Us
          </Link>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-2.5 bg-sky-700 text-white font-bold rounded-md shadow-sm flex items-center justify-center space-x-2 text-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
