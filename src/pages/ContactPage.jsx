import React from 'react';
import { 
  MapPin, 
  Phone, 
  PhoneCall, 
  Mail, 
  Clock, 
  Building2, 
  Calendar,
  CheckCircle2
} from 'lucide-react';
import PageHero from '../components/common/PageHero';
import { useAdmin } from '../context/AdminContext';

const ContactPage = ({ onOpenAppointment }) => {
  const adminContext = useAdmin();
  const hospitalInfo = adminContext?.hospitalInfo || {
    name: 'Lifecare',
    fullName: 'Lifecare Multispeciality Hospital',
    phone: '+91 98765 43210',
    emergencyNumber: '1066',
    email: 'info@lifecarehospital.com',
    address: 'No. 45, Hospital Road, Near High Court Junction, Main City Campus, Pin: 627001',
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 space-y-8">
      
      <PageHero
        title="Contact Us & Emergency Desk"
        subtitle="Get in touch with our 24/7 hospital help desk, acute trauma unit, or schedule a doctor consultation."
        breadcrumb={[{ label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT SIDE: Contact Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-5">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Hospital Desk</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Get in Touch</h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              {/* Emergency Hotline */}
              <a
                href={`tel:${hospitalInfo.emergencyNumber || '1066'}`}
                className="flex items-start space-x-3 p-3.5 bg-red-50 text-red-700 rounded border border-red-200 font-bold hover:bg-red-100 transition-colors"
              >
                <PhoneCall className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-red-600 font-bold">
                    24/7 Emergency & ICU Hotline
                  </span>
                  <span className="text-sm font-extrabold">{hospitalInfo.emergencyNumber || '1066'} / {hospitalInfo.phone || '+91 98765 43210'}</span>
                </div>
              </a>

              {/* Phone */}
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                <Phone className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Mobile Number</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.phone || '+91 98765 43210'}</span>
                </div>
              </div>

              {/* Landline */}
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                <Building2 className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Help Desk Landline</span>
                  <span className="font-semibold text-slate-900">0462 - 2501066 / 2502233</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                <Mail className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Email Address</span>
                  <span className="font-semibold text-slate-900">{hospitalInfo.email || 'info@lifecarehospital.com'}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Hospital Main Address</span>
                  <span className="font-medium text-slate-800 leading-snug">
                    {hospitalInfo.address}
                  </span>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded border border-slate-200">
                <Clock className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Working Hours</span>
                  <span className="font-medium text-slate-800">
                    24/7 Emergency & ICU | OPD: Mon - Sat 08:00 AM - 09:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: BOOKING & MAP (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* BOOK APPOINTMENT CARD */}
            <div className="bg-sky-900 rounded-lg p-6 sm:p-7 text-white space-y-4">
              <div className="space-y-2">
                <span className="px-2.5 py-0.5 bg-sky-800 border border-sky-700 text-sky-200 text-[11px] font-semibold uppercase tracking-wider rounded inline-block">
                  Online Scheduling
                </span>

                <h3 className="text-xl sm:text-2xl font-bold">
                  Book Doctor Consultation
                </h3>

                <p className="text-slate-200 text-xs leading-relaxed max-w-lg">
                  Skip waiting queues. Select your preferred branch, medical specialist, date, and time slot with instant SMS & WhatsApp confirmations.
                </p>
              </div>

              <div className="space-y-1.5 pt-1 text-xs text-sky-100">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                  <span>Instant SMS and WhatsApp appointment slip</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                  <span>Consultation at all 4 hospital branch locations</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs rounded transition-colors flex items-center space-x-2 cursor-pointer shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-sky-700" />
                  <span>Book Appointment Now</span>
                </button>
              </div>
            </div>

            {/* GOOGLE MAP EMBED */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 min-h-[260px]">
              <iframe
                title="Lifecare Multispeciality Hospital Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.5135!2d77.7289!3d8.7289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDMnNDQuMCJOIDc3wrA0Myc0NC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="w-full h-full min-h-[260px] border-0"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
