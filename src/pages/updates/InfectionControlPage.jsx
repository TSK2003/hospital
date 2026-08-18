import React from 'react';
import PageHero from '../../components/common/PageHero';
import { qualityMetrics } from '../../data/updatesData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const InfectionControlPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Infection Control & ICU Hygiene Protocols"
        subtitle="Zero-Infection Operating Theatres and Rigorous WHO Safety Mandates"
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'Infection Control' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-slate-900">Hospital Infection Control (HIC) Committee Standards</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {qualityMetrics.protocols.map((proto, idx) => (
              <div key={idx} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-start space-x-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-slate-800 leading-relaxed">{proto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfectionControlPage;
