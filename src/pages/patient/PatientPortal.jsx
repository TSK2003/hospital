import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { 
  User, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Download, 
  Printer, 
  FileText, 
  HeartHandshake, 
  LogOut, 
  Phone, 
  ShieldCheck, 
  Stethoscope, 
  BedDouble, 
  AlertCircle,
  ChevronRight,
  MessageSquare
} from 'lucide-react';

const PatientPortal = ({ onOpenAppointment }) => {
  const navigate = useNavigate();
  const { appointments, hospitalInfo, beds } = useAdmin();

  // Active patient session (demo)
  const patientData = {
    name: 'Karthick S',
    phone: '+91 63807 67265',
    email: 'karthick@example.com',
    age: '28 Yrs',
    bloodGroup: 'O+ Positive',
    uhid: 'UHID-LC-88492'
  };

  // Find appointments related to this patient or fallback to recent demo appointments
  const patientAppointments = appointments.length > 0 ? appointments : [
    {
      appointmentId: 'LC001',
      token: 'LC001',
      patientName: 'Karthick S',
      doctorName: 'Dr. Arun Sharma',
      department: 'Cardiology & Cardiac Sciences',
      date: '2026-08-19',
      time: '10:30 AM',
      fee: 500,
      paymentMethod: 'Instant UPI (Paid)',
      status: 'confirmed',
      branchName: 'Main Tertiary Hospital Campus'
    }
  ];

  const [activeSlip, setActiveSlip] = useState(patientAppointments[0] || null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSlip = (apt) => {
    const text = `
=====================================================
          LIFECARE MULTISPECIALITY HOSPITAL
           OFFICIAL OPD PATIENT TOKEN SLIP
=====================================================
TOKEN NUMBER      : ${apt.appointmentId || apt.token}
PATIENT UHID      : ${patientData.uhid}
PATIENT NAME      : ${apt.patientName || patientData.name}
PHONE NUMBER      : ${apt.mobileNumber || patientData.phone}
-----------------------------------------------------
CLINICAL DEPT     : ${apt.department}
SPECIALIST DOCTOR : ${apt.doctorName}
APPOINTMENT DATE  : ${apt.date}
TIME SLOT         : ${apt.time || apt.timeSlot}
CAMPUS LOCATION   : ${apt.branchName || 'Main Campus'}
-----------------------------------------------------
CONSULTANCY FEE   : Rs. ${apt.fee || 500} (PAID)
PAYMENT MODE      : ${apt.paymentMethod || 'UPI / Desk'}
STATUS            : CONFIRMED (ACTIVE OPD QUEUE)
-----------------------------------------------------
24/7 HELPLINE     : 1066
RECEPTION DESK    : ${hospitalInfo?.phone || '+91 63807 67265'}
=====================================================
Please report to OPD Reception 15 minutes before slot time.
    `;
    const element = document.createElement("a");
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Patient_Slip_${apt.appointmentId || apt.token}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleWhatsApp = (apt) => {
    const text = encodeURIComponent(
      `Hello Lifecare Hospital, I am inquiring about my appointment Token #${apt.appointmentId || apt.token} for ${apt.patientName || patientData.name} with ${apt.doctorName} on ${apt.date} at ${apt.time || apt.timeSlot}.`
    );
    window.open(`https://wa.me/916380767265?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 pb-16">
      
      {/* PORTAL TOP BAR */}
      <header className="bg-[#0c2a4d] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-sky-600 flex items-center justify-center text-white font-bold">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-bold text-base tracking-tight uppercase">
                {hospitalInfo?.name || 'LIFECARE'} PATIENT PORTAL
              </span>
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-sky-900 text-sky-200 text-[10px] font-bold rounded">
              OPD Self-Service
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              to="/"
              className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded transition-colors"
            >
              Public Website
            </Link>
            <button
              onClick={() => navigate('/login')}
              className="px-3 py-1.5 bg-red-600/80 hover:bg-red-600 text-white text-xs font-semibold rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Switch / Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* PATIENT HEADER BANNER */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xl border border-sky-200">
              <User className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl font-bold text-slate-900">{patientData.name}</h1>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                  Verified Patient
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {patientData.uhid} • Phone: {patientData.phone} • Blood Group: <span className="font-semibold text-red-600">{patientData.bloodGroup}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenAppointment && onOpenAppointment()}
            className="px-5 py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-lg shadow-sm transition-colors flex items-center space-x-2 cursor-pointer self-start sm:self-auto"
          >
            <Calendar className="w-4 h-4" />
            <span>Book New Consultation</span>
          </button>
        </div>

        {/* 2-COLUMN DASHBOARD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Active Appointments & Tokens */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-sky-700" />
                  <span>My Booked Consultations & Active Tokens ({patientAppointments.length})</span>
                </h2>
                <span className="text-[11px] text-slate-500 font-medium">Real-Time OPD Queue</span>
              </div>

              <div className="p-4 space-y-3">
                {patientAppointments.map((apt, idx) => {
                  const id = apt.appointmentId || apt.token || `LC00${idx + 1}`;
                  const isCurrent = activeSlip && (activeSlip.appointmentId === id || activeSlip.token === id);

                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isCurrent 
                          ? 'bg-sky-50/70 border-sky-500 shadow-xs' 
                          : 'bg-white border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="px-2.5 py-0.5 bg-[#0c2a4d] text-white font-bold text-xs rounded">
                            Token #{id}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase text-[10px]">
                            {apt.status || 'Confirmed'}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-500">
                            Fee: ₹{apt.fee || 500} (Paid)
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mt-1">
                          {apt.doctorName}
                        </h3>
                        <p className="text-xs text-sky-700 font-medium">
                          {apt.department} • <span className="text-slate-600">{apt.branchName || 'Main Campus'}</span>
                        </p>
                        <p className="text-xs text-slate-500 flex items-center space-x-2 mt-1">
                          <span className="font-semibold text-slate-700">{apt.date}</span>
                          <span>•</span>
                          <span className="font-semibold text-slate-700">{apt.time || apt.timeSlot}</span>
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setActiveSlip(apt)}
                          className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded cursor-pointer"
                        >
                          View Slip
                        </button>
                        <button
                          onClick={() => handleDownloadSlip(apt)}
                          className="px-3 py-1.5 bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded flex items-center space-x-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Slip</span>
                        </button>
                        <button
                          onClick={() => handleWhatsApp(apt)}
                          className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded cursor-pointer"
                          title="WhatsApp Query"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Live Bed Availability Preview for Patients */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <BedDouble className="w-4 h-4 text-sky-700" />
                  <span>Hospital Inpatient & Emergency Bed Status</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Live Updates
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-lg font-bold text-slate-800">36</div>
                  <div className="text-[10px] text-slate-500 font-medium">Total Beds</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-lg font-bold text-emerald-700">12</div>
                  <div className="text-[10px] text-emerald-600 font-medium">Available Now</div>
                </div>
                <div className="p-3 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="text-lg font-bold text-sky-700">Level-3 ICU</div>
                  <div className="text-[10px] text-sky-600 font-medium">2 Beds Vacant</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="text-lg font-bold text-slate-800">Casualty</div>
                  <div className="text-[10px] text-slate-500 font-medium">24/7 Open</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Selected Token Slip View & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">
            
            {activeSlip ? (
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OPD Slip</span>
                    <h3 className="text-base font-bold text-slate-900">Token #{activeSlip.appointmentId || activeSlip.token}</h3>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">
                    {activeSlip.status || 'Confirmed'}
                  </span>
                </div>

                <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2 text-xs border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Specialist Doctor</span>
                    <span className="font-bold text-sky-800 text-sm">{activeSlip.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Department</span>
                    <span className="font-semibold text-slate-800">{activeSlip.department}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/80">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Date</span>
                      <span className="font-semibold text-slate-800">{activeSlip.date}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Time Slot</span>
                      <span className="font-semibold text-slate-800">{activeSlip.time || activeSlip.timeSlot}</span>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Consultancy Fee</span>
                      <span className="font-bold text-emerald-700">₹{activeSlip.fee || 500}</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Paid via UPI
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrint}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-300 flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print</span>
                  </button>
                  <button
                    onClick={() => handleDownloadSlip(activeSlip)}
                    className="flex-1 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded flex items-center justify-center space-x-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-xs text-slate-400">
                Select an appointment to view slip
              </div>
            )}

            {/* Emergency & Reception Help Card */}
            <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
              <div className="flex items-center space-x-2 text-red-400">
                <Phone className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">24/7 Patient Assistance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Need urgent triage or ambulance support? Our emergency casualty team is active round the clock.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <a
                  href="tel:1066"
                  className="text-xs font-bold text-red-400 hover:underline"
                >
                  Hotline: 1066
                </a>
                <a
                  href={`tel:${hospitalInfo?.phone?.replace(/[^0-9+]/g, '') || '+916380767265'}`}
                  className="text-xs text-slate-300 hover:text-white"
                >
                  {hospitalInfo?.phone || '+91 63807 67265'}
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
};

export default PatientPortal;
