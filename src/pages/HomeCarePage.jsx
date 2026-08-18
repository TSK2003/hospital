import React from 'react';
import PageHero from '../components/common/PageHero';
import { 
  Heart, 
  Activity, 
  Stethoscope, 
  Droplets, 
  Truck, 
  UserCheck, 
  Calendar,
  PhoneCall
} from 'lucide-react';

const homeCareServices = [
  {
    id: "home-nursing",
    title: "Home Nursing Care",
    icon: Heart,
    color: "bg-blue-600",
    desc: "24/7 skilled ICU nurses & attendants for post-operative recovery, wound dressing, and catheter/tracheostomy care.",
    features: ["24/7 Shift Coverage", "IV Medication Administration", "Post-Op Wound Dressing"]
  },
  {
    id: "home-physio",
    title: "Home Physiotherapy",
    icon: Activity,
    color: "bg-emerald-600",
    desc: "Certified physical therapists visit your home for joint mobility, stroke neuro-rehabilitation, and chest physio.",
    features: ["Custom Exercise Regimen", "Stroke Rehabilitation", "Post-Joint Replacement Care"]
  },
  {
    id: "doctor-visit",
    title: "Doctor Home Visit",
    icon: Stethoscope,
    color: "bg-sky-600",
    desc: "Experienced general physicians visit elderly & bedridden patients for routine clinical checkups & prescription updates.",
    features: ["Bedside Clinical Checkup", "Prescription Revision", "Emergency Physician Callout"]
  },
  {
    id: "lab-collection",
    title: "Doorstep Lab Sample Collection",
    icon: Droplets,
    color: "bg-purple-600",
    desc: "Hygienic home phlebotomy sample collection for blood work, HbA1c, lipid profiles, and diagnostic tests with online reports.",
    features: ["Hygienic Phlebotomy", "Fast Digital Reports", "Fasting Blood Tests at Home"]
  },
  {
    id: "ambulance-service",
    title: "ACLS Ambulance Dispatch",
    icon: Truck,
    color: "bg-red-600",
    desc: "Advanced Cardiac Life Support Mobile ICUs with ventilator, defibrillator, and paramedic team on standby 24/7.",
    features: ["24/7 Emergency GPS Fleet", "Mobile ICU Ventilators", "Paramedic Care in Transit"]
  },
  {
    id: "elder-care",
    title: "Elder Care & Senior Wellness",
    icon: UserCheck,
    color: "bg-amber-600",
    desc: "Holistic companionship, vital sign monitoring, medication reminders, and monthly doctor reviews for senior citizens.",
    features: ["Monthly Physician Reviews", "Companionship & Nursing", "Vital Tracking & Medication"]
  }
];

const HomeCarePage = ({ onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Lifecare Home Care Services"
        subtitle="Bringing Hospital-Grade Medical Care, Skilled Nursing, and Doctor Visits directly to your doorstep"
        breadcrumb={[{ label: 'Home Care' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeCareServices.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 ${service.color} text-white rounded-2xl flex items-center justify-center shadow-md`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{service.desc}</p>
                  </div>

                  <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6 flex items-center gap-3">
                  <button
                    onClick={onOpenAppointment}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Service</span>
                  </button>
                  <a
                    href="tel:1066"
                    className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl border border-red-200"
                    title="Call Ambulance"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default HomeCarePage;
