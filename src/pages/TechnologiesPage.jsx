import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar } from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { useAdmin } from '../context/AdminContext';

const TechnologiesPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const technologiesList = adminContext?.technologies || defaultTechnologies;
  const hospitalInfo = adminContext?.hospitalInfo || { fullName: 'Lifecare Multispeciality Hospital' };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      <PageHero
        title="Medical Equipment & Diagnostic Technology"
        subtitle={`${hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'} is equipped with advanced 3.0T MRI, 128-slice CT, digital radiography, and modern surgical systems.`}
        breadcrumb={[{ label: 'Technologies' }]}
      />

      {/* TECHNOLOGIES GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologiesList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between hover:border-sky-500 hover:shadow-md transition-all"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-sky-400 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {item.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                <Link
                  to={`/technologies/${item.slug}`}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-800 hover:underline flex items-center space-x-1"
                >
                  <span>Technical Specifications</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={onOpenAppointment}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-sky-700 hover:text-white text-slate-700 text-xs font-semibold rounded transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default TechnologiesPage;
