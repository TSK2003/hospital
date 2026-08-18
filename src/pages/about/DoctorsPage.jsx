import React, { useState } from 'react';
import PageHero from '../../components/common/PageHero';
import { chiefDoctorsList } from '../../data/doctorsData';
import { departmentsList } from '../../data/departmentsData';
import { Search, Calendar } from 'lucide-react';

const DoctorsPage = ({ onOpenAppointment }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredDoctors = chiefDoctorsList.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'all' || doc.department.toLowerCase() === selectedDept.toLowerCase();
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Our Chief Doctors & Specialists Directory"
        subtitle="Consult 85+ Leading Multi-Specialty Physicians & Surgeons"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Doctors' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctor by name, qualification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full md:w-64 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Departments</option>
            {departmentsList.map((dep) => (
              <option key={dep.id} value={dep.name}>
                {dep.name}
              </option>
            ))}
          </select>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <img src={doc.image} alt={doc.name} className="w-full h-56 object-cover object-top" />
                <div className="p-5 space-y-1.5">
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider">{doc.department}</span>
                  <h3 className="text-base font-bold text-slate-900">{doc.name}</h3>
                  <p className="text-xs text-slate-500">{doc.qualification}</p>
                  <p className="text-xs font-semibold text-slate-700 pt-1">Exp: {doc.experience}</p>
                  <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg mt-2">
                    <span className="font-semibold text-slate-700 block">OPD Hours:</span>
                    {doc.timing}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={onOpenAppointment}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;
