import React from 'react';
import PageHero from '../components/common/PageHero';
import { insurancePartners, claimProcessSteps } from '../data/insuranceData';
import { ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';

const InsurancesPage = ({ onOpenEnquiry }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Insurance Partners & Cashless Claims"
        subtitle="Empaneled with 20+ Leading Health Insurance Companies & Government TPA Schemes"
        breadcrumb={[{ label: 'Insurances' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-14">
        
        {/* Insurance Partners Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Empaneled Insurers
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Cashless Insurance Partners</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insurancePartners.map((item) => (
              <div key={item.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-lg transition-all">
                <div className="space-y-3">
                  <img src={item.logo} alt={item.name} className="w-full h-28 object-cover rounded-xl" />
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">{item.tpa}</span>
                  <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600">{item.cashless}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Process Steps */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Fast Pre-Auth Desk
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Step-by-Step Cashless Claim Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {claimProcessSteps.map((step) => (
              <div key={step.step} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 relative">
                <span className="text-3xl font-extrabold text-blue-600 block">{step.step}</span>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={onOpenEnquiry}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Verify Your Insurance Coverage Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InsurancesPage;
