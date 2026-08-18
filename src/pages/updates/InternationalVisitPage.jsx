import React from 'react';
import { useParams } from 'react-router-dom';
import PageHero from '../../components/common/PageHero';
import { internationalVisits } from '../../data/updatesData';
import { Globe, CheckCircle, Calendar } from 'lucide-react';

const InternationalVisitPage = ({ onOpenAppointment }) => {
  const { locationKey } = useParams();
  const dataKey = locationKey === 'colombo-visit' ? 'colombo' : 'jaffna';
  const visit = internationalVisits[dataKey];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title={visit.title}
        subtitle={visit.subtitle}
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: visit.title }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
              International Medical Desk ({visit.date})
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">{visit.title}</h2>
            <div className="space-y-3 pt-2">
              {visit.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-800 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <button
                onClick={onOpenAppointment}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Book International Tele-Consultation</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img src={visit.img} alt={visit.title} className="w-full h-80 object-cover rounded-2xl shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternationalVisitPage;
