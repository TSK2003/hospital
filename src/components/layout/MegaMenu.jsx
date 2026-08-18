import React from 'react';
import { Link } from 'react-router-dom';
import { departmentsList } from '../../data/departmentsData';
import { ChevronRight, Stethoscope, HeartPulse, Activity } from 'lucide-react';

const MegaMenu = ({ onClose }) => {
  return (
    <div className="w-full bg-white shadow-2xl rounded-2xl border border-slate-100 p-6 md:p-8 transform transition-all duration-300">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800">Medical Departments & Specialities</h3>
            <p className="text-xs text-slate-500">Explore our 27+ super specialty medical departments with expert doctors</p>
          </div>
        </div>
        <Link
          to="/specialities/cardiology"
          onClick={onClose}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <span>View All Specialities</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Grid of 27 Departments */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {departmentsList.map((dep) => (
          <Link
            key={dep.id}
            to={`/specialities/${dep.slug}`}
            onClick={onClose}
            className="group flex items-start space-x-2.5 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-sky-50 transition-all border border-transparent hover:border-blue-100"
          >
            <div className="mt-0.5 p-1.5 bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white rounded-lg transition-colors shrink-0">
              <Stethoscope className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 transition-colors leading-tight">
                {dep.name}
              </h4>
              <span className="text-[10px] text-slate-400 block mt-0.5 group-hover:text-slate-600">
                {dep.category}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-xs text-slate-600">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span>24/7 Emergency Medical Response & Cath Lab available for critical care</span>
        </div>
        <a
          href="tel:1066"
          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg border border-red-200 transition-colors"
        >
          Emergency Helpline: 1066
        </a>
      </div>
    </div>
  );
};

export default MegaMenu;
