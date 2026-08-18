import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ChevronRight, 
  Heart,
  Activity, 
  ShieldCheck, 
  Sparkles, 
  Stethoscope, 
  UserCheck, 
  Clock, 
  PhoneCall,
  Quote,
  Star,
  Cpu,
  BedDouble,
  Search,
  Check,
  ArrowRight
} from 'lucide-react';

import { servicesList as defaultServices } from '../data/servicesData';
import { branchesList as defaultBranches } from '../data/branchesData';
import { chiefDoctorsList as defaultDoctors } from '../data/doctorsData';
import { useAdmin } from '../context/AdminContext';

const clinicalHighlights = [
  { number: '50+', label: 'Specialist Doctors', subtext: 'Senior Board Consultants' },
  { number: '20+', label: 'Clinical Departments', subtext: 'Super-Specialized Care' },
  { number: '36', label: 'Inpatient Beds & ICUs', subtext: 'Level-3 ICU & CCU Suites' },
  { number: '24/7', label: 'Emergency Trauma', subtext: 'Continuous Casualty Care' },
];

const clinicalSpecialties = [
  {
    title: "Cardiology & Cardiac Sciences",
    desc: "24/7 Primary Angioplasty, Fractional Flow Reserve (FFR), pacemaker implantation, and dedicated Cardiac Intensive Care Unit.",
    icon: Heart,
    slug: "cardiology",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "6 Specialists",
    keyProcedures: ["Coronary Angioplasty", "Echocardiography", "Structural Heart"]
  },
  {
    title: "Neurology & Neuro-Surgery",
    desc: "Hyperacute stroke thrombolysis, neuro-critical ICU, robotic spine surgery, epilepsy monitoring, and neuro-rehabilitation.",
    icon: Activity,
    slug: "neurology",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "5 Specialists",
    keyProcedures: ["Stroke Thrombolysis", "Brain Tumor Resection", "Spine Decompression"]
  },
  {
    title: "Orthopaedics & Joint Replacement",
    desc: "Robotic total knee and hip replacements, arthroscopic sports reconstruction, complex pelvic trauma, and pediatric orthopaedics.",
    icon: ShieldCheck,
    slug: "orthopaedics",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "7 Specialists",
    keyProcedures: ["Robotic Knee Replacement", "ACL Reconstruction", "Trauma Care"]
  },
  {
    title: "Medical & Surgical Oncology",
    desc: "Multidisciplinary tumor board, daycare chemotherapy infusion suite, radical surgical oncology, and targeted immunotherapy.",
    icon: Sparkles,
    slug: "oncology",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "4 Specialists",
    keyProcedures: ["Surgical Oncology", "Chemotherapy Infusion", "Tumor Screening"]
  },
  {
    title: "Laparoscopic & GI Surgery",
    desc: "Single-incision laparoscopic surgeries, bariatric metabolic surgery, GI cancer resections, and laser proctology procedures.",
    icon: Stethoscope,
    slug: "general-surgery",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "6 Specialists",
    keyProcedures: ["Laparoscopic Surgery", "Hernia Repair", "GI Endoscopy"]
  },
  {
    title: "General Medicine & Diabetology",
    desc: "Advanced multi-organ failure management, continuous renal replacement, diabetic complication control, and executive health checkups.",
    icon: UserCheck,
    slug: "general-medicine",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    doctorsCount: "8 Specialists",
    keyProcedures: ["Critical Care ICU", "Diabetes Control", "Master Health Checks"]
  }
];

const technologiesShowcase = [
  {
    id: "mri",
    name: "3.0T High-Field Silent MRI",
    tagline: "Ultra-High Resolution Neuro & Musculoskeletal Diagnostic Imaging",
    specs: ["70cm Wide Bore for Patient Comfort", "Acoustic Noise Reduction", "Sub-Millimeter Vascular Imaging"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ct",
    name: "128-Slice Dual Source CT",
    tagline: "Ultra-Fast Cardiac Coronary Angiography in Under 5 Seconds",
    specs: ["Low-Dose Radiation Protocol", "Instant 3D Vascular Reconstruction", "Whole-Body Trauma Protocol"],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "cathlab",
    name: "Flat-Panel Digital Cath Lab",
    tagline: "Precision Interventional Cardiology & Neuro-Vascular Suite",
    specs: ["Real-time 3D Roadmapping", "Integrated Intravascular Ultrasound (IVUS)", "Fractional Flow Reserve (FFR)"],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ot",
    name: "Modular Laminar Airflow OTs",
    tagline: "Class 100 HEPA Filtration with Infection Environmental Control",
    specs: ["Anti-Static Seamless Flooring", "Integrated Surgical Video Consoles", "Advanced Anaesthesia Workstations"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  }
];

const insuranceProviders = [
  "Star Health",
  "MediAssist TPA",
  "ICICI Lombard",
  "HDFC ERGO",
  "Care Health",
  "Max Bupa (Niva Bupa)",
  "Vidal Health TPA",
  "Paramount TPA",
  "MD India Healthcare",
  "Bajaj Allianz"
];

const patientReviews = [
  {
    name: "V. Raghavan",
    location: "Main City Campus",
    treatment: "Emergency Cardiac Angioplasty",
    comment: "I was brought in with severe chest pain during midnight casualty. Dr. Arun Sharma and the emergency Cath Lab team completed the angioplasty within 45 minutes of arrival. The level of speed, clinical competence, and nursing care saved my life.",
    rating: 5,
    date: "Treated February 2026"
  },
  {
    name: "Dr. K. Sumathi",
    location: "City Campus",
    treatment: "Robotic Bilateral Knee Replacement",
    comment: "As a retired medical educator, I evaluated several hospitals before choosing Lifecare. The robotic precision surgery performed by Dr. Rajesh Kannan allowed me to take my first steps pain-free on Day 2. The physiotherapists were exceptional.",
    rating: 5,
    date: "Treated January 2026"
  },
  {
    name: "P. Muthukumar",
    location: "Main City Campus",
    treatment: "Acute Ischemic Stroke Recovery",
    comment: "The rapid stroke thrombolysis protocol administered by Dr. Sarah Jenkins reversed my mother's speech loss within 3 hours. The neurological CCU monitoring and post-stroke rehabilitation team are truly world class.",
    rating: 5,
    date: "Treated March 2026"
  }
];

const HomePage = ({ onOpenAppointment, onOpenEnquiry }) => {
  const adminContext = useAdmin();
  const [selectedTech, setSelectedTech] = useState(0);

  const servicesList = adminContext?.services || defaultServices;
  const branchesList = adminContext?.branches || defaultBranches;
  const doctorsList = adminContext?.doctors || defaultDoctors;
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'Lifecare',
    fullName: 'Lifecare Multispeciality Hospital',
    phone: '+91 63807 67265',
    emergencyNumber: '1066'
  };

  // Smart doctor filtering function based on department
  const filterDoctorsByDept = (deptName) => {
    if (!deptName) return doctorsList;
    const lowerDept = deptName.toLowerCase();
    
    const directMatches = doctorsList.filter((doc) => {
      const docDept = (doc.department || doc.specialty || '').toLowerCase();
      const docBio = (doc.bio || '').toLowerCase();
      return docDept.includes(lowerDept) || lowerDept.includes(docDept) ||
        (lowerDept.includes('cardio') && docDept.includes('cardio')) ||
        (lowerDept.includes('neuro') && docDept.includes('neuro')) ||
        (lowerDept.includes('ortho') && docDept.includes('ortho')) ||
        ((lowerDept.includes('oncol') || lowerDept.includes('cancer')) && (docDept.includes('oncol') || docDept.includes('cancer'))) ||
        ((lowerDept.includes('surg') || lowerDept.includes('gastro')) && (docDept.includes('surg') || docDept.includes('gastro'))) ||
        ((lowerDept.includes('pediatric') || lowerDept.includes('child') || lowerDept.includes('newborn')) && (docDept.includes('pediatric') || docDept.includes('child') || docBio.includes('pediatric') || docDept.includes('neuro') || docDept.includes('surg'))) ||
        ((lowerDept.includes('medicine') || lowerDept.includes('diabetes')) && (docDept.includes('medicine') || docDept.includes('diabet')));
    });

    if (directMatches.length > 0) return directMatches;

    // Service doctors fallback
    const serviceObj = servicesList.find((s) => s.title.toLowerCase() === lowerDept || s.slug === lowerDept);
    if (serviceObj && serviceObj.doctors && serviceObj.doctors.length > 0) {
      return serviceObj.doctors.map((d, idx) => ({
        id: `svc-doc-${idx}`,
        name: d.name,
        department: d.role || deptName,
        qualification: d.qualification,
        experience: d.experience
      }));
    }

    return doctorsList;
  };

  // Quick Hero Booking Widget state
  const initialDept = servicesList[0]?.title || 'Cardiology & Cardiac Sciences';
  const [bookingDept, setBookingDept] = useState(initialDept);
  const [availableDocs, setAvailableDocs] = useState(() => filterDoctorsByDept(initialDept));
  const [bookingDoctor, setBookingDoctor] = useState(() => availableDocs[0]?.name || doctorsList[0]?.name);
  const [bookingDate, setBookingDate] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  // When booking department changes: dynamically filter available doctors
  const handleDepartmentSelectChange = (newDept) => {
    setBookingDept(newDept);
    const filtered = filterDoctorsByDept(newDept);
    setAvailableDocs(filtered);
    if (filtered.length > 0) {
      setBookingDoctor(filtered[0].name);
    } else {
      setBookingDoctor('');
    }
  };

  const handleHeroBookingSubmit = (e) => {
    e.preventDefault();
    onOpenAppointment({
      department: bookingDept,
      doctorName: bookingDoctor,
      date: bookingDate
    });
  };

  return (
    <div className="bg-[#f4f7fb] text-slate-800 antialiased space-y-0 selection:bg-sky-700 selection:text-white">
      
      {/* 1. HERO SECTION (RICH HIGH-CONTRAST DEEP CLINICAL NAVY & SAPPHIRE) */}
      <section className="bg-gradient-to-r from-[#0a1f38] via-[#0c2a4d] to-[#08182b] text-white border-b border-slate-800 pt-12 pb-20 lg:pt-16 lg:pb-24 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Heading, Scope & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-sky-950/80 border border-sky-400/30 text-sky-300 rounded-full text-xs font-semibold shadow-xs">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>NABH & NABL Accredited Multispeciality Hospital</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
                Advanced Multispeciality Healthcare & Clinical Excellence
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'} delivers comprehensive medical care across 20+ clinical departments, backed by 50+ senior board-certified specialists, 24/7 emergency trauma services, and modern diagnostic infrastructure.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenAppointment()}
                  className="px-7 py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs sm:text-sm rounded-md shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Doctor Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${hospitalInfo.emergencyNumber || '1066'}`}
                  className="px-5 py-3.5 bg-red-600/25 hover:bg-red-600/35 text-red-300 hover:text-white font-bold text-xs sm:text-sm rounded-md border border-red-500/40 transition-colors flex items-center space-x-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>24/7 Emergency: {hospitalInfo.emergencyNumber || '1066'}</span>
                </a>
              </div>

              {/* 4 Statistics Metrics */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-700/80">
                {clinicalHighlights.map((stat, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {stat.number}
                    </div>
                    <div className="text-xs font-bold text-sky-400">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-300">
                      {stat.subtext}
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: High Quality Hospital Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-xl overflow-hidden shadow-2xl border-2 border-slate-700 bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85"
                  alt="Lifecare Multispeciality Hospital"
                  className="w-full h-80 sm:h-[400px] object-cover brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-slate-700 text-xs font-bold text-white">
                  Main Tertiary Hospital Campus
                </div>
              </div>
            </div>

          </div>

          {/* Rapid Appointment Selector Box (High-Contrast White Card with Dynamic Filtering) */}
          <div className="bg-white text-slate-800 rounded-xl border border-slate-200 shadow-xl p-5 sm:p-6">
            <form onSubmit={handleHeroBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              
              {/* 1. Department / Patient Requirement */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-sky-700" />
                  <span>Clinical Department</span>
                </label>
                <select
                  value={bookingDept}
                  onChange={(e) => handleDepartmentSelectChange(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                >
                  {servicesList.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                </select>
              </div>

              {/* 2. Doctor: DYNAMICALLY FILTERED to only show doctors available for the chosen department */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                  <UserCheck className="w-3.5 h-3.5 text-sky-700" />
                  <span>Available Specialist Doctor</span>
                </label>
                <select
                  value={bookingDoctor}
                  onChange={(e) => setBookingDoctor(e.target.value)}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                >
                  {availableDocs.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.department || d.specialty || 'Specialist'})
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. Date */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-sky-700" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full h-11 px-3 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:ring-2 focus:ring-sky-600 focus:outline-none"
                />
              </div>

              {/* 4. Action */}
              <div>
                <button
                  type="submit"
                  className="w-full h-11 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded shadow-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Book Appointment</span>
                </button>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* 2. 4-PILLAR CLINICAL HUB (SOFT ICE-SLATE BACKGROUND FOR CONTRAST) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-red-500 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">24/7 Emergency & Trauma</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous casualty services, emergency resuscitation, on-duty critical care doctors, and ICU ambulances.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <a href={`tel:${hospitalInfo.emergencyNumber || '1066'}`} className="text-xs font-bold text-red-600 hover:underline inline-flex items-center space-x-1">
                <span>Emergency: {hospitalInfo.emergencyNumber || '1066'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-sky-600 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Super-Specialist Doctors</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Over 50+ experienced consultants across major clinical departments with regular outpatient clinics.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <button onClick={() => onOpenAppointment()} className="text-xs font-bold text-sky-700 hover:underline inline-flex items-center space-x-1 cursor-pointer">
                <span>Find a Doctor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <BedDouble className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Inpatient & ICU Beds</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Level-3 ICU, Cardiac Care Unit (CCU), Deluxe Private Suites, Semi-Private, and general wards.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link to="/contact" className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center space-x-1">
                <span>Admissions Desk</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-indigo-600 hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Diagnostics & Imaging</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                3.0T Silent MRI, 128-slice CT scan, digital flat-panel Cath Lab, and automated pathology lab.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4">
              <Link to="/technologies" className="text-xs font-bold text-indigo-700 hover:underline inline-flex items-center space-x-1">
                <span>View Technology</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CENTRES OF CLINICAL EXCELLENCE (CRISP WHITE WITH ACCENT BORDERS) */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">Clinical Specializations</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                Centres of Clinical Excellence
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Specialized departments delivering comprehensive outpatient, surgical, and inpatient care.
              </p>
            </div>
            <Link to="/technologies" className="text-xs font-bold text-sky-700 hover:underline flex items-center space-x-1">
              <span>View All Specialties</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicalSpecialties.map((dept, idx) => (
              <div
                key={idx}
                className="bg-[#f8fafc] rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Fixed verified image */}
                <div className="h-48 overflow-hidden bg-slate-200 relative">
                  <img
                    src={dept.image}
                    alt={dept.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-bold text-white">
                    {dept.doctorsCount}
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">
                      {dept.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {dept.desc}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-200">
                    <div className="flex flex-wrap gap-1.5">
                      {dept.keyProcedures.map((proc, pidx) => (
                        <span key={pidx} className="px-2.5 py-1 bg-white text-slate-700 border border-slate-200 rounded text-[10px] font-semibold">
                          {proc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between border-t border-slate-200 text-xs">
                    <Link
                      to={`/services/${dept.slug}`}
                      className="font-bold text-sky-700 hover:underline flex items-center space-x-1"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      onClick={() => onOpenAppointment({ department: dept.title })}
                      className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded text-xs transition-colors cursor-pointer"
                    >
                      Book OPD
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. ADVANCED MEDICAL INFRASTRUCTURE (DEEP NAVY SHOWCASE FOR MAXIMUM CONTRAST) */}
      <section className="py-20 bg-[#0a1e34] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="border-b border-slate-700 pb-4">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Hospital Technology</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5">
              Advanced Diagnostic & Surgical Infrastructure
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Equipped with latest generation diagnostic scanners and sterile modular laminar airflow operating theatres.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Tech Selector */}
            <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
              {technologiesShowcase.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTech(idx)}
                  className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                    selectedTech === idx
                      ? 'bg-slate-800 border-sky-500 text-white shadow-lg'
                      : 'bg-slate-900/60 border-slate-700/80 hover:bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="text-sm font-bold text-white">{t.name}</div>
                    <div className="text-xs text-slate-400 line-clamp-1">{t.tagline}</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${selectedTech === idx ? 'text-sky-400' : 'text-slate-500'}`} />
                </button>
              ))}
            </div>

            {/* Selected Preview */}
            <div className="lg:col-span-7 bg-slate-800/90 p-6 sm:p-8 rounded-xl border border-slate-700 space-y-5 flex flex-col justify-between shadow-xl">
              <div className="h-64 sm:h-72 rounded-lg overflow-hidden bg-slate-900 border border-slate-700">
                <img
                  src={technologiesShowcase[selectedTech].image}
                  alt={technologiesShowcase[selectedTech].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-bold text-white">
                  {technologiesShowcase[selectedTech].name} — {technologiesShowcase[selectedTech].tagline}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {technologiesShowcase[selectedTech].specs.map((spec, sidx) => (
                    <div key={sidx} className="flex items-center space-x-1.5 text-xs text-sky-200 font-medium">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DOCTORS / SPECIALISTS (CRISP WHITE SECTION) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <div className="text-xs font-bold text-sky-700 uppercase tracking-wider">Medical Faculty</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5">
                Senior Medical Specialists
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Consult with our experienced medical faculty across multiple clinical disciplines.
              </p>
            </div>
            <button
              onClick={() => onOpenAppointment()}
              className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-md shadow-xs transition-colors cursor-pointer"
            >
              Book Appointment
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorsList.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                className="bg-[#f8fafc] rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-600 transition-all flex flex-col justify-between"
              >
                <div className="h-60 bg-slate-200 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-xs font-bold text-sky-700">{doc.department || doc.specialty}</p>
                    <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 text-[11px]">{doc.timing || doc.availableDays || 'Mon - Sat'}</span>
                    <button
                      onClick={() => onOpenAppointment({ doctorName: doc.name, department: doc.department || doc.specialty })}
                      className="font-bold text-sky-700 hover:underline cursor-pointer"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. CASHLESS INSURANCE */}
      <section className="py-14 bg-[#f0f5fa] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Cashless Hospitalization & TPA Insurance Desk</h3>
              <p className="text-xs text-slate-500">Cashless admission facilities with leading insurance providers & corporate TPAs.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Insurance Desk Available 24/7
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2.5 pt-1">
            {insuranceProviders.map((ins, idx) => (
              <div key={idx} className="px-4 py-2 bg-white border border-slate-200 rounded-md text-xs font-semibold text-slate-700 shadow-2xs">
                {ins}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PATIENT TESTIMONIALS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Patient Feedback & Recovery Experiences
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Verified clinical reviews from patients treated at our hospital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {patientReviews.map((rev, idx) => (
              <div key={idx} className="bg-[#f8fafc] p-7 rounded-xl border border-slate-200 shadow-xs space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-200">
                  <div className="text-sm font-bold text-slate-900">{rev.name}</div>
                  <div className="text-xs font-semibold text-sky-700">{rev.treatment}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{rev.location} • {rev.date}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. HOSPITAL BRANCHES */}
      <section className="py-20 bg-[#f4f7fb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Hospital Campuses</h2>
              <p className="text-xs text-slate-500 mt-0.5">Four convenient healthcare branch locations across the city.</p>
            </div>
            <Link to="/branches" className="text-xs font-bold text-sky-700 hover:underline flex items-center space-x-1">
              <span>View All Branches</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branchesList.slice(0, 4).map((b) => (
              <div key={b.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-sky-600 transition-all flex flex-col justify-between">
                <div className="h-44 bg-slate-100 overflow-hidden">
                  <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-slate-900">{b.name}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{b.address}</p>
                  <p className="text-xs font-bold text-sky-700">{b.mobile}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
