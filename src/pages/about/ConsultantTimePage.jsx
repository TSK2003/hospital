import React, { useState } from 'react';
import PageHero from '../../components/common/PageHero';
import { chiefDoctorsList } from '../../data/doctorsData';
import { Clock, Calendar } from 'lucide-react';

const ConsultantTimePage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Consultant OPD Timetable"
        subtitle="Weekly Outpatient Consultation Schedule across All Departments"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Consultant Time' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 uppercase tracking-wider font-bold">
                <th className="p-4">Doctor Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Qualification</th>
                <th className="p-4">OPD Days & Timings</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chiefDoctorsList.map((doc) => (
                <tr key={doc.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center space-x-3">
                    <img src={doc.image} alt={doc.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="p-4 font-semibold text-blue-600">{doc.department}</td>
                  <td className="p-4 text-slate-600">{doc.qualification}</td>
                  <td className="p-4 text-slate-700 font-medium">
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{doc.timing}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={onOpenAppointment}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] rounded-lg shadow-sm"
                    >
                      Book Slot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultantTimePage;
