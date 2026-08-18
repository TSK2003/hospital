import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { departmentsList } from '../data/departmentsData';
import { 
  Stethoscope, 
  CheckCircle, 
  Award, 
  Zap, 
  Activity, 
  HelpCircle, 
  ChevronDown, 
  Calendar, 
  PhoneCall,
  UserCheck
} from 'lucide-react';

const SpecialityDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const [openFaq, setOpenFaq] = useState(0);

  const dept = departmentsList.find(d => d.slug === slug || d.id === slug) || departmentsList[0];

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Hero Banner */}
      <PageHero
        title={`Department of ${dept.name}`}
        subtitle={dept.shortDesc}
        breadcrumb={[
          { label: 'Specialities', path: '/specialities/cardiology' },
          { label: dept.name }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Content (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Overview & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                {dept.category} Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Advanced Clinical Excellence in {dept.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {dept.description}
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={onOpenAppointment}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md flex items-center space-x-2 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment with Specialist</span>
                </button>
                <a
                  href="tel:1066"
                  className="px-6 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-bold text-sm rounded-xl border border-red-200 flex items-center space-x-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>24/7 Helpline: 1066</span>
                </a>
              </div>
            </div>

            {/* Lead Doctor Card */}
            <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center gap-6">
              <img
                src={dept.doctorImg}
                alt={dept.doctorName}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover border-4 border-white/20 shadow-lg shrink-0"
              />
              <div className="space-y-2 text-center md:text-left">
                <span className="px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  Lead Department Specialist
                </span>
                <h3 className="text-2xl font-bold">{dept.doctorName}</h3>
                <p className="text-xs font-semibold text-sky-400">{dept.doctorRole}</p>
                <p className="text-xs text-slate-300">
                  Head of clinical interventions, multidisciplinary consultations, and senior surgical procedures.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onOpenAppointment}
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-md"
                  >
                    Consult Doctor Online
                  </button>
                </div>
              </div>
            </div>

            {/* Treatments Offered */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Stethoscope className="w-5 h-5 text-blue-600" />
                <span>Treatments & Surgical Procedures</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dept.treatments?.map((treatment, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{treatment}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities & Infrastructure */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span>Dedicated Infrastructure & Facilities</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dept.facilities?.map((facility, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <Activity className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Technologies Used */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span>Cutting-Edge Medical Technology Used</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {dept.technologies?.map((tech, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-900 text-white rounded-xl text-xs font-medium flex items-center justify-between">
                    <span>{tech}</span>
                    <Zap className="w-3.5 h-3.5 text-sky-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Diseases Treated */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">Diseases & Clinical Conditions Treated</h3>
              <div className="flex flex-wrap gap-2">
                {dept.diseases?.map((dis, idx) => (
                  <span key={idx} className="px-3.5 py-1.5 bg-slate-100 text-slate-800 rounded-full text-xs font-semibold border border-slate-200">
                    {dis}
                  </span>
                ))}
              </div>
            </div>

            {/* Department FAQ */}
            {dept.faqs && dept.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <div className="space-y-3">
                  {dept.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 font-bold text-slate-800 text-xs flex items-center justify-between"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-4 h-4 text-blue-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {openFaq === idx && (
                        <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sidebar Menu (Right 4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Appointment Box */}
            <div className="bg-gradient-to-b from-blue-700 to-blue-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xl font-bold">Book {dept.name} Consultation</h3>
              <p className="text-xs text-slate-200">
                Get quick appointments with leading specialists without long waiting queues.
              </p>
              <button
                onClick={onOpenAppointment}
                className="w-full py-3 bg-white text-blue-900 font-bold text-xs rounded-xl shadow-md hover:bg-slate-100 transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Slot Now</span>
              </button>
            </div>

            {/* Other Departments Quick Links */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                All 27 Departments
              </h4>
              <div className="space-y-1 max-h-96 overflow-y-auto pr-1 text-xs">
                {departmentsList.map((d) => (
                  <Link
                    key={d.id}
                    to={`/specialities/${d.slug}`}
                    className={`flex items-center justify-between p-2.5 rounded-xl font-semibold transition-colors ${
                      d.slug === dept.slug
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{d.name}</span>
                    <UserCheck className="w-3.5 h-3.5 opacity-70" />
                  </Link>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

export default SpecialityDetailPage;
