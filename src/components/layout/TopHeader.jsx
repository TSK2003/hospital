import React from 'react';
import { PhoneCall, Phone, Mail, Clock, HelpCircle, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

const TopHeader = ({ onOpenEnquiry }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    phone: '+91 63807 67265',
    emergencyNumber: '1066',
    email: 'info@lifecarehospital.com',
  };

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
        
        {/* Left: Emergency & Contact */}
        <div className="flex flex-wrap items-center space-x-4 sm:space-x-6">
          <a
            href={`tel:${hospitalInfo.emergencyNumber || '1066'}`}
            className="flex items-center space-x-1.5 font-bold text-red-400 hover:text-red-300 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 text-red-400" />
            <span>24/7 Emergency: {hospitalInfo.emergencyNumber || '1066'}</span>
          </a>

          <a
            href={`tel:${hospitalInfo.phone?.replace(/[^0-9+]/g, '') || '+916380767265'}`}
            className="hidden sm:flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>{hospitalInfo.phone || '+91 63807 67265'}</span>
          </a>

          <a
            href={`mailto:${hospitalInfo.email || 'info@lifecarehospital.com'}`}
            className="hidden md:flex items-center space-x-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>{hospitalInfo.email || 'info@lifecarehospital.com'}</span>
          </a>
        </div>

        {/* Right: OPD & Accreditation */}
        <div className="flex items-center space-x-4 ml-auto sm:ml-0">
          <div className="hidden lg:flex items-center space-x-1.5 text-slate-400 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>OPD: Mon - Sat 8:00 AM - 9:00 PM</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-slate-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
            <span>NABH & NABL Accredited</span>
          </div>

          <button
            onClick={onOpenEnquiry}
            className="flex items-center space-x-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded text-xs transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Quick Enquiry</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopHeader;
