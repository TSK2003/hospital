import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const aboutMenuItems = [
  { label: 'Overview', path: '/about/overview' },
  { label: 'Vision & Mission', path: '/about/vision-mission' },
  { label: 'Management', path: '/about/management' },
  { label: 'Doctors', path: '/about/doctors' },
  { label: 'Consultant Time', path: '/about/consultant-time' },
  { label: 'Testimonials', path: '/about/testimonials' },
  { label: 'Career', path: '/about/career' },
];

export const healthCenterMenuItems = [
  { label: 'Srinivasanagar Branch', path: '/health-center/srinivasanagar' },
  { label: 'Melapalayam Branch', path: '/health-center/melapalayam' },
  { label: 'Master Health Checkup', path: '/health-center/master-health-checkup' },
];

export const updatesMenuItems = [
  { label: 'Hospital Updates', path: '/updates/hospital-updates' },
  { label: 'Recent Events', path: '/updates/recent-events' },
  { label: 'HBOT (Hyperbaric Therapy)', path: '/updates/hbot' },
  { label: 'Recent Videos', path: '/updates/videos' },
  { label: 'Jaffna Visit', path: '/updates/jaffna-visit' },
  { label: 'Colombo Visit', path: '/updates/colombo-visit' },
  { label: 'Photo Gallery', path: '/updates/gallery' },
  { label: 'News & Events', path: '/updates/news-events' },
  { label: 'Patient Satisfaction', path: '/updates/patient-satisfaction' },
  { label: 'Infection Control', path: '/updates/infection-control' },
];

const DropdownMenu = ({ items, onClose }) => {
  return (
    <div className="w-64 bg-white shadow-xl rounded-2xl border border-slate-100 py-2 transform transition-all duration-200">
      {items.map((item, idx) => (
        <Link
          key={idx}
          to={item.path}
          onClick={onClose}
          className="group flex items-center justify-between px-4 py-2.5 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/70 transition-colors"
        >
          <span>{item.label}</span>
          <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-blue-600" />
        </Link>
      ))}
    </div>
  );
};

export default DropdownMenu;
