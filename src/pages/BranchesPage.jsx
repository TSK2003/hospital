import React from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { branchesList as defaultBranches } from '../data/branchesData';
import { useAdmin } from '../context/AdminContext';

const BranchesPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || defaultBranches;
  const hospitalInfo = adminContext?.hospitalInfo || { name: 'Lifecare', fullName: 'Lifecare Multispeciality Hospital' };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      <PageHero
        title="Our Hospital Branches"
        subtitle="Locate your nearest Lifecare Multispeciality Hospital branch for outpatient consultations, 24/7 emergency care, and diagnostic services."
        breadcrumb={[{ label: 'Branches' }]}
      />

      {/* BRANCHES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {branchesList.map((branch) => (
            <div
              key={branch.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col hover:border-sky-500 hover:shadow-md transition-all"
            >
              {/* Branch Image */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img
                  src={branch.image}
                  alt={branch.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-slate-900/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded uppercase tracking-wider">
                  {branch.tagline}
                </div>
              </div>

              {/* Branch Details */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-slate-900">
                    {branch.name}
                  </h3>

                  <div className="space-y-2 text-xs">
                    {/* Address */}
                    <div className="flex items-start space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <span>{branch.address}</span>
                    </div>

                    {/* Mobile Number */}
                    <div className="flex items-center space-x-2 text-slate-800 font-semibold">
                      <Phone className="w-4 h-4 text-sky-700 shrink-0" />
                      <a href={`tel:${branch.mobile}`} className="hover:text-sky-700">
                        {branch.mobile}
                      </a>
                      {branch.altPhone && <span className="text-slate-400 font-normal">({branch.altPhone})</span>}
                    </div>

                    {/* Hours */}
                    <div className="flex items-start space-x-2 text-slate-600">
                      <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <span>{branch.hours}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {branch.features.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-medium rounded border border-slate-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
                  <a
                    href={branch.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-1/2 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded transition-colors flex items-center justify-center space-x-1.5 border border-slate-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                    <span>Google Maps</span>
                  </a>

                  <button
                    onClick={() => onOpenAppointment(branch.id)}
                    className="w-full sm:w-1/2 py-2.5 px-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded shadow-sm transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BranchesPage;
