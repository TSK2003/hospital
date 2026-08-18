import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Award, ShieldCheck, HeartPulse, Users, CheckCircle } from 'lucide-react';

const OverviewPage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="About Lifecare Super Specialty Hospital"
        subtitle="25+ Years of Compassionate Healing, Advanced Infrastructure, and Clinical Mastery"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Overview' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Our Legacy
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Dedicated to Humanity, Driven by Medical Excellence</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Established in 2001, Lifecare Super Specialty Hospital has grown into one of South India's most respected medical hubs, housing over 27 specialized clinical departments and state-of-the-art diagnostic facilities.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              We bring together eminent cardiologists, neurosurgeons, orthopedic joint replacement experts, and transplant physicians under one roof, backed by round-the-clock emergency, cath lab, and Level-1 trauma support.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
              alt="Hospital Overview"
              className="rounded-2xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>

        {/* Accreditations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <ShieldCheck className="w-8 h-8 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900">NABH Accredited</h3>
            <p className="text-xs text-slate-600">Certified by National Accreditation Board for Hospitals & Healthcare Providers for strict safety standards.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <Award className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">NABL Central Lab</h3>
            <p className="text-xs text-slate-600">Diagnostic lab accredited for international gold-standard accuracy in clinical pathology.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <HeartPulse className="w-8 h-8 text-red-500" />
            <h3 className="text-lg font-bold text-slate-900">24/7 Level-1 Trauma</h3>
            <p className="text-xs text-slate-600">Immediate resuscitation, emergency angioplasty, and stroke care within minutes.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverviewPage;
