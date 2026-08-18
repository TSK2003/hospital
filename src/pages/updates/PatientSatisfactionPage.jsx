import React from 'react';
import PageHero from '../../components/common/PageHero';
import { qualityMetrics } from '../../data/updatesData';
import { Star, ShieldCheck, Heart, Award } from 'lucide-react';

const PatientSatisfactionPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Patient Satisfaction & Quality Metrics"
        subtitle="Empirical Proof of Clinical Safety, Compassionate Care, and High Ratings"
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'Patient Satisfaction' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
            <span className="text-4xl font-extrabold text-emerald-600 block">{qualityMetrics.satisfactionRate}</span>
            <span className="text-xs font-semibold text-slate-700">Patient Satisfaction Score</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
            <span className="text-4xl font-extrabold text-blue-600 block">{qualityMetrics.infectionRate}</span>
            <span className="text-xs font-semibold text-slate-700">Hospital Acquired Infection Rate</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
            <span className="text-4xl font-extrabold text-sky-600 block">{qualityMetrics.avgERWaitTime}</span>
            <span className="text-xs font-semibold text-slate-700">Avg ER Triage Time</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-1">
            <span className="text-4xl font-extrabold text-purple-600 block">{qualityMetrics.successfulSurgeries}</span>
            <span className="text-xs font-semibold text-slate-700">Successful Surgeries</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientSatisfactionPage;
