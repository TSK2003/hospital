import React, { useState, useEffect } from 'react';
import { Phone, ChevronUp } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

// Real-world official WhatsApp vector icon
const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 2C8.268 2 2 8.268 2 16c0 2.766.804 5.344 2.188 7.516L2.094 30l6.703-2.063A13.914 13.914 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.43 11.43 0 0 1-5.83-1.6l-.417-.247-4.336 1.336 1.356-4.22-.27-.43A11.45 11.45 0 0 1 4.5 16C4.5 9.65 9.65 4.5 16 4.5S27.5 9.65 27.5 16 22.35 27.5 16 27.5zm6.273-8.547c-.344-.172-2.036-1.005-2.352-1.12-.315-.116-.544-.172-.773.172-.229.344-.888 1.12-1.088 1.35-.2.228-.4.257-.744.085-.344-.172-1.453-.536-2.768-1.708-1.024-.913-1.715-2.04-1.916-2.384-.2-.344-.022-.53.15-.702.155-.155.344-.4.516-.602.172-.2.229-.343.344-.572.115-.229.057-.43-.029-.602-.086-.172-.773-1.863-1.06-2.551-.28-.67-.563-.58-.773-.591l-.66-.011c-.228 0-.601.086-.916.43-.315.343-1.203 1.175-1.203 2.864 0 1.69 1.232 3.323 1.403 3.552.172.23 2.425 3.703 5.875 5.193.82.355 1.46.567 1.96.726.824.262 1.574.225 2.167.137.661-.099 2.036-.832 2.322-1.634.287-.802.287-1.49.2-.1.086-.172-.115-.287-.43-.459z"
      fill="currentColor"
    />
  </svg>
);

const FloatingActions = () => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'Lifecare Multispeciality Hospital',
    phone: '+91 63807 67265',
    whatsappNumber: '916380767265',
  };

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappMessage = encodeURIComponent(
    `Hello ${hospitalInfo.name || 'Lifecare Hospital'}, I would like to enquire about doctor appointments and medical services.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
      
      {/* 1. Scroll-To-Top Button (Appears above actions when scrolled) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-[#70b22a] hover:bg-[#5f9923] text-white rounded-full flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer ring-2 ring-white"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}

      {/* 2. Real-World WhatsApp Button (Official WhatsApp Green #25D366) */}
      <div className="relative group flex items-center justify-center">
        <a
          href={`https://wa.me/${hospitalInfo.whatsappNumber?.replace(/[^0-9]/g, '') || '916380767265'}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer ring-3 ring-white"
          title="Chat on WhatsApp"
          aria-label="WhatsApp Chat"
        >
          <WhatsAppIcon className="w-7 h-7 text-white drop-shadow-xs" />
        </a>

        {/* Hover Tooltip on Left */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Chat on WhatsApp
        </span>
      </div>

      {/* 3. Real-World Phone Call Hotline Button (Hospital Royal Blue #0b74b8) */}
      <div className="relative group flex items-center justify-center">
        <a
          href={`tel:${hospitalInfo.phone?.replace(/[^0-9+]/g, '') || '+916380767265'}`}
          className="w-13 h-13 bg-[#0b74b8] hover:bg-[#09598e] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 cursor-pointer ring-3 ring-white"
          title={`Call Hotline: ${hospitalInfo.phone || '+91 63807 67265'}`}
          aria-label="Call Hospital Hotline"
        >
          <Phone className="w-5 h-5 text-white" />
        </a>

        {/* Hover Tooltip on Left */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          Call: {hospitalInfo.phone || '+91 63807 67265'}
        </span>
      </div>

    </div>
  );
};

export default FloatingActions;
