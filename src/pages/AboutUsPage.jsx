import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';
import { 
  ShieldCheck, 
  Award, 
  Heart, 
  Activity, 
  Users, 
  Building2, 
  CheckCircle2,
  Calendar,
  ArrowRight,
  Stethoscope
} from 'lucide-react';

const AboutUsPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'Lifecare',
    fullName: 'Lifecare Multispeciality Hospital & Research Center'
  };

  return (
    <div className="bg-slate-50 text-slate-800 antialiased space-y-16 pb-20">
      
      <PageHero
        title={`About ${hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'}`}
        subtitle="Over two decades of clinical excellence, pioneering surgical technologies, and patient-first compassionate healthcare in India."
        breadcrumb={[{ label: 'About Us' }]}
      />

      {/* 1. INSTITUTIONAL LEGACY & HERO NARRATIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-slate-100 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85"
                  alt="Lifecare Multispeciality Hospital Infrastructure"
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Stat Badge */}
              <div className="absolute -bottom-5 right-4 bg-[#081628] text-white p-4 rounded-xl shadow-xl border border-slate-700 space-y-1">
                <div className="font-heading text-2xl font-extrabold text-sky-400">25+ Years</div>
                <div className="text-[11px] text-slate-300">Of Clinical Healthcare Excellence</div>
              </div>
            </div>

            {/* Right Narrative */}
            <div className="lg:col-span-7 space-y-5 text-slate-700">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>Institutional Heritage</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Pioneering Tertiary Healthcare & Research
              </h2>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                {hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'} was founded with a dedicated mission to make world-class super-specialty medical care accessible to every patient. Over the last 25 years, our institution has expanded into a premier healthcare network with 4 specialized campuses, 20+ clinical departments, and over 60 active healthcare professionals.
              </p>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                Our founders and senior faculty members are alumni of premier medical colleges including Madras Medical College and AIIMS. We have consistently set clinical benchmarks in interventional cardiology, 24/7 hyperacute stroke thrombolysis, robotic joint replacement, and comprehensive cancer therapies.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-sky-700">50,000+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Patients Treated</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-sky-700">50+</div>
                  <div className="text-[11px] text-slate-600 font-medium">Specialist Doctors</div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-heading text-xl font-extrabold text-emerald-700">99.4%</div>
                  <div className="text-[11px] text-slate-600 font-medium">Clinical Satisfaction</div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-7 py-3 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-full transition-all shadow-sm flex items-center space-x-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation with Faculty</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CORE INSTITUTIONAL PILLARS */}
      <section className="py-16 bg-[#081628] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h2 className="font-heading text-3xl font-extrabold text-white">Our Institutional Pillars</h2>
            <p className="text-xs text-slate-400">Committed to ethical, transparent, and patient-centered healthcare delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-4 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Our Mission</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To provide world-class, compassionate, and affordable healthcare to every patient with cutting-edge medical science and uncompromised ethical standards.
              </p>
            </div>

            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-4 shadow-lg">
              <div className="w-12 h-12 bg-sky-500/20 text-sky-400 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Our Vision</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                To be recognized as India's foremost multispeciality healthcare and research institution, setting the highest clinical standards in patient safety and outcomes.
              </p>
            </div>

            <div className="bg-slate-800/90 p-8 rounded-2xl border border-slate-700 space-y-4 shadow-lg">
              <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Quality & Safety</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                NABH and NABL accredited hospital protocols with zero-tolerance infection control, 24/7 clinical audits, and continuous medical staff education.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CTA STRIP */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-heading text-2xl font-bold text-slate-900">Experience Premier Tertiary Healthcare Today</h3>
        <p className="text-xs text-slate-500 max-w-lg mx-auto">Consult with our senior medical faculty at any of our four branch campuses across the city.</p>
        <div>
          <button
            onClick={onOpenAppointment}
            className="px-8 py-3.5 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-xs rounded-full transition-all shadow-md cursor-pointer"
          >
            Book An Appointment
          </button>
        </div>
      </div>

    </div>
  );
};

export default AboutUsPage;
