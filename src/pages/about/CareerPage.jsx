import React, { useState } from 'react';
import PageHero from '../../components/common/PageHero';
import { Briefcase, Send, CheckCircle } from 'lucide-react';

const vacancies = [
  {
    title: "Senior Staff Nurse - ICU / Cath Lab",
    department: "Nursing Services",
    exp: "3-5 Years B.Sc Nursing",
    location: "Main Hospital Campus"
  },
  {
    title: "Consultant Pulmonologist",
    department: "Pulmonology",
    exp: "MD / DNB Pulmonology",
    location: "Main Hospital Campus"
  },
  {
    title: "Dialysis Technician",
    department: "Nephrology & Dialysis",
    exp: "Diploma / B.Sc Dialysis Tech",
    location: "Melapalayam Branch"
  },
  {
    title: "Medical Record Officer (MRO)",
    department: "Administration",
    exp: "Degree with NABH Experience",
    location: "Main Hospital Campus"
  }
];

const CareerPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', role: vacancies[0].title, exp: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Careers & Work with Lifecare"
        subtitle="Join South India's Premier Medical Team and Build a Rewarding Clinical Career"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Career' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Open Vacancies */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-blue-600" />
            <span>Current Open Vacancies</span>
          </h2>
          <div className="space-y-4">
            {vacancies.map((v, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                    <span className="text-xs text-blue-600 font-semibold">{v.department}</span>
                  </div>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-[10px] font-bold">{v.location}</span>
                </div>
                <p className="text-xs text-slate-600">Qualification required: {v.exp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-xl font-bold text-slate-900">Apply for a Position</h3>
          {submitted ? (
            <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900">Application Submitted!</h4>
              <p className="text-xs text-slate-600">Our HR department will review your credentials and contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Applicant Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Applying For *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {vacancies.map((v, i) => (
                    <option key={i} value={v.title}>{v.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Years of Clinical Experience *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 4 Years in Cardiac Nursing"
                  value={formData.exp}
                  onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md flex items-center justify-center space-x-2"
              >
                <span>Submit Application</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default CareerPage;
