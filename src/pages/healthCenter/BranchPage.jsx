import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/common/PageHero';
import { branchesData } from '../../data/healthCenterData';
import { MapPin, Phone, Mail, Clock, CheckCircle, Calendar, PhoneCall } from 'lucide-react';

const BranchPage = ({ onOpenAppointment }) => {
  const { branchId } = useParams();
  const branchKey = branchId === 'melapalayam' ? 'melapalayam' : 'srinivasanagar';
  const branch = branchesData[branchKey];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title={branch.name}
        subtitle={branch.tagline}
        breadcrumb={[{ label: 'Health Center', path: '/health-center/srinivasanagar' }, { label: branch.name }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Main Banner Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Satellite Health Center
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">{branch.name}</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{branch.description}</p>
            
            <div className="space-y-2 text-xs text-slate-700 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.phone} | Emergency: {branch.emergency}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{branch.hours}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center space-x-3">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Branch Consultation</span>
              </button>
              <a
                href={`tel:${branch.emergency}`}
                className="px-5 py-2.5 bg-red-50 text-red-600 font-bold text-xs rounded-xl border border-red-200 flex items-center space-x-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Emergency: {branch.emergency}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img src={branch.heroImg} alt={branch.name} className="w-full h-80 object-cover rounded-2xl shadow-md" />
          </div>
        </div>

        {/* Specialties Available */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Services & Facilities Available</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branch.specialtiesAvailable.map((service, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">{service}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BranchPage;
