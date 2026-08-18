import React from 'react';
import PageHero from '../../components/common/PageHero';
import { masterHealthPackages } from '../../data/healthCenterData';
import { CheckCircle, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

const MasterCheckupPage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Master Health Checkup Packages"
        subtitle="Preventive Health Diagnostic Programs for Early Detection & Wellness"
        breadcrumb={[{ label: 'Health Center', path: '/health-center/master-health-checkup' }, { label: 'Master Checkup' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {masterHealthPackages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {pkg.badge}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{pkg.testCount}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900">{pkg.title}</h3>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-2xl font-extrabold text-blue-600">{pkg.price}</span>
                    <span className="text-xs text-slate-400 line-through">{pkg.originalPrice}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-700 block">Tests & Consultations Included:</span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {pkg.tests.map((test, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 mt-6">
                <button
                  onClick={onOpenAppointment}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Package Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterCheckupPage;
