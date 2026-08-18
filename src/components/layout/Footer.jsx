import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartHandshake, 
  PhoneCall, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { servicesList as defaultServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const Footer = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'LIFECARE',
    tagline: 'Multispeciality Hospital',
    fullName: 'Lifecare Multispeciality Hospital',
    description: 'Lifecare Multispeciality Hospital is a premier healthcare institution providing advanced medical care across 20+ departments including Cardiology, Neurology, Orthopaedics, Oncology, and more — with compassionate round-the-clock emergency services.',
    email: 'info@lifecarehospital.com',
    phone: '+91 98765 43210',
    emergencyNumber: '1066',
    address: 'No. 45, Hospital Road, Near High Court Junction, Main City Campus',
  };
  const servicesList = adminContext?.services || defaultServices;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
          
          {/* Col 1: About & Logo */}
          <div className="lg:col-span-2 space-y-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 bg-sky-700 rounded flex items-center justify-center text-white">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white block uppercase">
                  {hospitalInfo.name || 'LIFECARE'}
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block -mt-0.5">
                  {hospitalInfo.tagline || 'Multispeciality Hospital'}
                </span>
              </div>
            </Link>

            <p className="text-slate-400 max-w-sm leading-relaxed">
              {hospitalInfo.description}
            </p>

            <div className="pt-2 flex items-center space-x-2">
              <div className="flex items-center space-x-1.5 text-[11px] text-slate-300 font-medium bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NABH & NABL Accredited Hospital</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home Page' },
                { to: '/branches', label: 'Hospital Branches' },
                { to: '/technologies', label: 'Medical Technology' },
                { to: '/blog', label: 'Health Blog' },
                { to: '/contact', label: 'Contact Us & Emergency' },
                { to: '/admin-panel-login', label: 'Hospital Admin Portal' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Departments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Clinical Departments
            </h4>
            <ul className="space-y-2">
              {servicesList.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link to={`/services/${service.slug}`} className="text-slate-400 hover:text-white transition-colors flex items-center space-x-1">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{service.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Emergency & Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Emergency & Contact
            </h4>
            <div className="space-y-2.5">
              <a href={`tel:${hospitalInfo.emergencyNumber || '1066'}`} className="flex items-center space-x-2 text-red-400 hover:text-red-300 font-bold bg-red-950/40 p-2.5 rounded border border-red-900/50">
                <PhoneCall className="w-4 h-4 shrink-0" />
                <span>24/7 Emergency: {hospitalInfo.emergencyNumber || '1066'}</span>
              </a>

              <div className="flex items-start space-x-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.phone || '+91 98765 43210'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>{hospitalInfo.email || 'info@lifecarehospital.com'}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span className="leading-snug">{hospitalInfo.address}</span>
              </div>

              <div className="flex items-start space-x-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                <span>24/7 Emergency & Inpatient Care</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-slate-500 gap-y-2 text-[11px]">
          <div>
            © {new Date().getFullYear()} {hospitalInfo.fullName || `${hospitalInfo.name} Multispeciality Hospital`}. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Patient Charter</a>
            <Link to="/admin-panel-login" className="hover:text-sky-400 transition-colors">Staff Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
