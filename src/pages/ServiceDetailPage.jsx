import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  CheckCircle2, 
  UserCheck, 
  ShieldCheck, 
  Stethoscope
} from 'lucide-react';
import { servicesList as defaultServices } from '../data/servicesData';
import { useAdmin } from '../context/AdminContext';
import PageHero from '../components/common/PageHero';

const ServiceDetailPage = ({ onOpenAppointment }) => {
  const { slug } = useParams();
  const adminContext = useAdmin();
  const servicesList = adminContext?.services || defaultServices;
  const hospitalInfo = adminContext?.hospitalInfo || { fullName: 'Lifecare Multispeciality Hospital' };

  const service = servicesList.find((s) => s.slug === slug) || servicesList[0];

  return (
    <div className="bg-slate-50 min-h-screen pb-16 space-y-8">
      
      <PageHero
        title={service.title}
        subtitle={service.shortDesc}
        breadcrumb={[
          { label: 'Departments', path: '/services/cardiology' },
          { label: service.title }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* TOP OVERVIEW & IMAGE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* About The Department (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
              <Stethoscope className="w-4 h-4" />
              <span>Department Scope & Overview</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              About {service.title}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {service.about}
            </p>
            
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded shadow-sm transition-colors flex items-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment in {service.title}</span>
              </button>
            </div>
          </div>

          {/* Department Hero Image (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={service.heroImage}
              alt={service.title}
              className="w-full h-64 sm:h-72 object-cover"
            />
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-900">NABH Accredited Clinical Standards</p>
                <p className="text-[11px] text-slate-500">24/7 Inpatient, Diagnostic & Emergency Support</p>
              </div>
            </div>
          </div>

        </div>

        {/* TREATMENTS & BENEFITS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Treatments */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-sky-700" />
              <span>Key Treatments & Procedures</span>
            </h3>
            <ul className="space-y-2.5">
              {(service.treatments || []).map((treatment, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 bg-sky-50 text-sky-800 rounded flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 border border-sky-100">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2.5 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Clinical Advantages & Care Standards</span>
            </h3>
            <ul className="space-y-2.5">
              {(service.benefits || []).map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* DOCTORS */}
        {service.doctors && service.doctors.length > 0 && (
          <section className="space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Clinical Faculty</span>
              <h2 className="text-xl font-bold text-slate-900">
                Specialists in {service.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.doctors.map((doc, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm flex items-center space-x-3.5">
                  <div className="w-12 h-12 bg-sky-50 rounded flex items-center justify-center text-sky-700 shrink-0">
                    <UserCheck className="w-6 h-6 text-sky-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{doc.name}</h4>
                    <p className="text-xs font-semibold text-sky-700">{doc.role}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{doc.qualification} • {doc.experience}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="border-b border-slate-200 pb-2">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Patient Guidance</span>
              <h2 className="text-xl font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3 pt-1">
              {service.faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <h4 className="font-bold text-xs text-slate-800 flex items-start space-x-2">
                    <span className="text-sky-700 font-extrabold">Q.</span>
                    <span>{faq.question}</span>
                  </h4>
                  <p className="text-xs text-slate-600 pl-4 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* BOTTOM APPOINTMENT CTA BOX */}
        <section className="bg-sky-900 rounded-lg p-8 text-white text-center space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">
            Need Clinical Consultation in {service.title}?
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm max-w-xl mx-auto">
            Book an instant consultation with our senior specialists at {hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'}.
          </p>
          <div>
            <button
              onClick={onOpenAppointment}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded transition-colors inline-flex items-center space-x-2 cursor-pointer shadow-sm"
            >
              <Calendar className="w-4 h-4 text-sky-700" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default ServiceDetailPage;
