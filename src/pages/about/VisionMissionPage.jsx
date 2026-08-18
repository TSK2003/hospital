import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Eye, Target, Heart } from 'lucide-react';

const VisionMissionPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Vision & Mission"
        subtitle="Guiding Principles for Compassionate Healthcare Delivery"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Vision & Mission' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Vision Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To be globally recognized as a center of healthcare excellence, setting benchmarks in clinical mastery, medical technology, patient safety, and ethical healing for generations to come.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            To deliver affordable, accessible, and high-precision tertiary medical care through world-class specialists, advanced diagnostics, zero-infection infrastructure, and compassionate patient support.
          </p>
        </div>

      </div>
    </div>
  );
};

export default VisionMissionPage;
