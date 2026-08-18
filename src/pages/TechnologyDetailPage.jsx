import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Activity
} from 'lucide-react';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { useAdmin } from '../context/AdminContext';
import PageHero from '../components/common/PageHero';

const TechnologyDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const technologiesList = adminContext?.technologies || defaultTechnologies;

  const tech = technologiesList.find((t) => t.slug === slug) || technologiesList[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      <PageHero
        title={tech.name}
        subtitle={`${tech.category} • Advanced Diagnostic & Medical Infrastructure`}
        breadcrumb={[
          { label: 'Technologies', path: '/technologies' },
          { label: tech.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* OVERVIEW & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-block px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-bold rounded uppercase tracking-wider">
              {tech.category}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {tech.name}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {tech.description}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded shadow-sm transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Diagnostic Test</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={tech.image}
              alt={tech.name}
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>

        </div>

        {/* FEATURES & BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Key Features */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-sky-700" />
              <span>Key Technical Features</span>
            </h3>
            <ul className="space-y-2.5">
              {(tech.features || []).map((feat, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical Benefits */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Patient & Diagnostic Advantages</span>
            </h3>
            <ul className="space-y-2.5">
              {(tech.benefits || []).map((ben, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{ben}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* USAGE & SAFETY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Machine Usage */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <Activity className="w-4 h-4 text-sky-700" />
              <span>Clinical Indications & Applications</span>
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {tech.usage}
            </p>
          </div>

          {/* Safety Information */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 border-b border-slate-200 pb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safety & Radiation Standards</span>
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {tech.safetyInfo}
            </p>
          </div>

        </div>

        {/* BOTTOM CTA */}
        <div className="bg-sky-900 rounded-lg p-8 text-white text-center space-y-3">
          <h3 className="text-xl font-bold">
            Schedule Diagnostic Imaging or Test
          </h3>
          <p className="text-slate-200 text-xs max-w-lg mx-auto">
            Get scanned on our state-of-the-art diagnostic equipment with rapid turn-around report generation.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAppointment}
              className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded transition-colors inline-flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-sky-700" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnologyDetailPage;
