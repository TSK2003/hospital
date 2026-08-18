import React from 'react';
import PageHero from '../../components/common/PageHero';
import { hospitalUpdatesList } from '../../data/updatesData';

const HospitalUpdatesPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Hospital News & Updates"
        subtitle="Latest Infrastructure Additions, Clinical Milestones, and Accreditations"
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'Hospital Updates' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitalUpdatesList.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm space-y-4 p-6">
              <img src={item.img} alt={item.title} className="w-full h-48 object-cover rounded-2xl" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                  <span className="text-blue-600 uppercase">{item.category}</span>
                  <span>{item.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalUpdatesPage;
