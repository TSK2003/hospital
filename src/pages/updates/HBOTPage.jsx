import React from 'react';
import PageHero from '../../components/common/PageHero';
import { hbotInfo } from '../../data/updatesData';
import { Zap, CheckCircle, Calendar } from 'lucide-react';

const HBOTPage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title={hbotInfo.title}
        subtitle={hbotInfo.tagline}
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'HBOT' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-xs font-bold uppercase tracking-wider">
              Hyperbaric Medicine
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Accelerated Cellular Regeneration</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{hbotInfo.overview}</p>
            <div className="pt-2">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book HBOT Consultation</span>
              </button>
            </div>
          </div>
          <div className="lg:col-span-5">
            <img src={hbotInfo.img} alt="HBOT Chamber" className="w-full h-80 object-cover rounded-2xl shadow-md" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Approved Medical Indications for HBOT</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hbotInfo.applications.map((app, idx) => (
              <div key={idx} className="p-4 bg-cyan-50/50 rounded-xl border border-cyan-100 flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800">{app}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HBOTPage;
