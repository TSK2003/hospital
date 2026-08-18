import React, { useState, useEffect } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Download, 
  ShieldCheck,
  Stethoscope,
  Heart,
  Check,
  Printer,
  FileText,
  CreditCard,
  Send,
  MessageSquare,
  AlertCircle,
  QrCode
} from 'lucide-react';
import { branchesList as fallbackBranches } from '../../data/branchesData';
import { chiefDoctorsList as fallbackDoctors } from '../../data/doctorsData';
import { servicesList as fallbackServices } from '../../data/servicesData';
import { useAdmin } from '../../context/AdminContext';

const AppointmentModal = ({ isOpen, onClose, initialData = {} }) => {
  const adminContext = useAdmin();
  const branchesList = adminContext?.branches || fallbackBranches;
  const chiefDoctorsList = adminContext?.doctors || fallbackDoctors;
  const servicesList = adminContext?.services || fallbackServices;
  const appointments = adminContext?.appointments || [];
  const addAppointment = adminContext?.addAppointment;
  const hospitalInfo = adminContext?.hospitalInfo || { 
    name: 'Lifecare', 
    fullName: 'Lifecare Multispeciality Hospital',
    phone: '+91 63807 67265'
  };

  // Helper to filter doctors based on selected department
  const filterDoctorsByDept = (deptName) => {
    if (!deptName) return chiefDoctorsList;
    const lowerDept = deptName.toLowerCase();
    
    const matched = chiefDoctorsList.filter((doc) => {
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

    if (matched.length > 0) return matched;

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

    return chiefDoctorsList;
  };

  // Check if a specific time slot is already booked for the chosen doctor on the chosen date
  const isSlotBooked = (doctorName, date, slot) => {
    return appointments.some((apt) => {
      const docMatch = (apt.doctorName || '').toLowerCase().trim() === (doctorName || '').toLowerCase().trim();
      const dateMatch = (apt.date || '').trim() === (date || '').trim();
      const timeMatch = (apt.time || apt.timeSlot || '').toLowerCase().trim() === slot.toLowerCase().trim();
      const active = (apt.status || 'confirmed').toLowerCase() !== 'cancelled';
      return docMatch && dateMatch && timeMatch && active;
    });
  };

  // State
  const [isSuccess, setIsSuccess] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState(null);
  const [emailDispatched, setEmailDispatched] = useState(false);

  // Determine if department/doctor was already passed from homepage
  const hasPreSelectedDetails = Boolean(initialData?.department || initialData?.doctorName);

  const [formData, setFormData] = useState({
    patientName: '',
    mobileNumber: '',
    email: '',
    age: '',
    gender: 'Male',
    department: initialData?.department || (servicesList[0]?.title || 'Cardiology & Cardiac Sciences'),
    doctorName: initialData?.doctorName || (chiefDoctorsList[0]?.name || 'Chief Consultant'),
    date: initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '09:30 AM',
    consultationFee: 500,
    paymentMethod: 'Pay at Hospital Desk / Cashless',
    symptomsNotes: '',
    branchName: 'Main Tertiary Hospital Campus'
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'
  ];

  // Sync when initialData changes
  useEffect(() => {
    if (isOpen) {
      const dept = initialData?.department || servicesList[0]?.title || 'Cardiology & Cardiac Sciences';
      const availableDocs = filterDoctorsByDept(dept);
      const doc = initialData?.doctorName || (availableDocs[0]?.name || chiefDoctorsList[0]?.name);
      const date = initialData?.date || new Date(Date.now() + 86400000).toISOString().split('T')[0];

      // Find first available slot that is NOT booked
      let availableSlot = '09:30 AM';
      for (const slot of timeSlots) {
        if (!isSlotBooked(doc, date, slot)) {
          availableSlot = slot;
          break;
        }
      }

      setFormData((prev) => ({
        ...prev,
        department: dept,
        doctorName: doc,
        date: date,
        timeSlot: availableSlot,
        patientName: '',
        mobileNumber: '',
        email: '',
        consultationFee: 500,
        paymentMethod: 'Pay at Hospital Desk / Cashless',
        symptomsNotes: ''
      }));
      setIsSuccess(false);
      setSuccessReceipt(null);
      setEmailDispatched(false);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const currentAvailableDoctors = filterDoctorsByDept(formData.department);

  const handleDepartmentChange = (newDept) => {
    const available = filterDoctorsByDept(newDept);
    const firstDoc = available[0]?.name || 'Specialist Doctor';
    
    // Auto-pick non-conflicting time slot
    let availableSlot = '09:30 AM';
    for (const slot of timeSlots) {
      if (!isSlotBooked(firstDoc, formData.date, slot)) {
        availableSlot = slot;
        break;
      }
    }

    setFormData({
      ...formData,
      department: newDept,
      doctorName: firstDoc,
      timeSlot: availableSlot
    });
  };

  const handleDoctorChange = (newDoctor) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(newDoctor, formData.date, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(newDoctor, formData.date, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      doctorName: newDoctor,
      timeSlot: availableSlot
    });
  };

  const handleDateChange = (newDate) => {
    let availableSlot = formData.timeSlot;
    if (isSlotBooked(formData.doctorName, newDate, availableSlot)) {
      for (const slot of timeSlots) {
        if (!isSlotBooked(formData.doctorName, newDate, slot)) {
          availableSlot = slot;
          break;
        }
      }
    }

    setFormData({
      ...formData,
      date: newDate,
      timeSlot: availableSlot
    });
  };

  // Generate Unique Sequential Token ID (LC001, LC002, ...)
  const generateAppointmentToken = () => {
    const existingCount = appointments.length;
    const lastStored = parseInt(localStorage.getItem('lifecare_last_apt_num') || '0', 10);
    const nextNum = Math.max(existingCount, lastStored) + 1;
    localStorage.setItem('lifecare_last_apt_num', nextNum.toString());
    return `LC${String(nextNum).padStart(3, '0')}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guard: ensure selected slot is not already booked
    if (isSlotBooked(formData.doctorName, formData.date, formData.timeSlot)) {
      alert(`The time slot ${formData.timeSlot} on ${formData.date} has just been reserved for ${formData.doctorName}. Please select another available time slot.`);
      return;
    }

    const token = generateAppointmentToken();
    const receiptObj = {
      appointmentId: token,
      token: token,
      patientName: formData.patientName || 'General Patient',
      mobileNumber: formData.mobileNumber,
      email: formData.email,
      department: formData.department,
      doctorName: formData.doctorName,
      date: formData.date,
      time: formData.timeSlot,
      timeSlot: formData.timeSlot,
      fee: formData.consultationFee || 500,
      consultationFee: formData.consultationFee || 500,
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'Paid',
      branchName: formData.branchName,
      age: formData.age || 'Adult',
      gender: formData.gender,
      notes: formData.symptomsNotes || 'Routine Consultation',
      bookingTime: new Date().toLocaleString(),
      status: 'confirmed'
    };

    if (addAppointment) {
      addAppointment(receiptObj);
    }

    setSuccessReceipt(receiptObj);
    setIsSuccess(true);
  };

  // Actions
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    if (!successReceipt) return;
    const slipText = `
=====================================================
          LIFECARE MULTISPECIALITY HOSPITAL
           OFFICIAL OPD CONSULTATION TOKEN
=====================================================
TOKEN NUMBER      : ${successReceipt.token}
STATUS            : CONFIRMED (PAID)
-----------------------------------------------------
PATIENT NAME      : ${successReceipt.patientName}
PHONE NUMBER      : ${successReceipt.mobileNumber}
EMAIL             : ${successReceipt.email || 'N/A'}
-----------------------------------------------------
CLINICAL DEPT     : ${successReceipt.department}
SPECIALIST DOCTOR : ${successReceipt.doctorName}
APPOINTMENT DATE  : ${successReceipt.date}
CONSULTATION TIME : ${successReceipt.time}
CAMPUS            : ${successReceipt.branchName}
-----------------------------------------------------
CONSULTANCY FEE   : Rs. ${successReceipt.fee} (PAID)
PAYMENT MODE      : ${successReceipt.paymentMethod}
BOOKING TIME      : ${successReceipt.bookingTime}
-----------------------------------------------------
EMERGENCY HOTLINE : 1066
RECEPTION DESK    : ${hospitalInfo.phone || '+91 63807 67265'}
=====================================================
Please arrive 15 minutes prior to your scheduled OPD time.
    `;
    const element = document.createElement("a");
    const file = new Blob([slipText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Lifecare_Appointment_Slip_${successReceipt.token}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendEmail = () => {
    setEmailDispatched(true);
    setTimeout(() => {
      alert(`Official Appointment Slip & Token #${successReceipt.token} has been dispatched to ${successReceipt.email || successReceipt.mobileNumber}!`);
    }, 400);
  };

  // WhatsApp Message Action
  const handleSendWhatsApp = () => {
    if (!successReceipt) return;
    const text = encodeURIComponent(
      `Hello Lifecare Hospital, I have booked an appointment.\n\n*Token ID:* ${successReceipt.token}\n*Patient:* ${successReceipt.patientName}\n*Doctor:* ${successReceipt.doctorName} (${successReceipt.department})\n*Date & Time:* ${successReceipt.date} at ${successReceipt.time}\n*Fee:* Rs. ${successReceipt.fee} (Paid)\n*Campus:* ${successReceipt.branchName}`
    );
    window.open(`https://wa.me/916380767265?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200 my-4 transition-all">
        
        {/* MODAL HEADER */}
        <div className="bg-[#0c2a4d] p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-sky-600/30 border border-sky-400/40 flex items-center justify-center text-sky-300">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {isSuccess ? 'Appointment Confirmed & Token Generated' : 'Book Specialist Consultation'}
              </h3>
              <p className="text-xs text-sky-200">
                {hospitalInfo.fullName || 'Lifecare Multispeciality Hospital'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="p-6">
          
          {/* VIEW A: CONFIRMED RECEIPT VIEW (WITH PDF, PRINT, EMAIL & WHATSAPP) */}
          {isSuccess && successReceipt && (
            <div className="space-y-5">
              
              <div className="text-center space-y-1.5">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">
                  Appointment Confirmed
                </h4>
                <p className="text-xs text-slate-500">
                  Your token has been generated in the hospital OPD queue.
                </p>
              </div>

              {/* Official Printable Appointment Slip */}
              <div className="bg-[#f8fafc] rounded-xl border border-slate-200 p-5 space-y-4 shadow-xs">
                
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Token ID</span>
                    <span className="text-2xl font-extrabold text-sky-700">{successReceipt.token}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Consultancy Fee</span>
                    <span className="text-sm font-extrabold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      ₹{successReceipt.fee} (Paid)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Patient Name</span>
                    <span className="font-bold text-slate-800">{successReceipt.patientName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Contact Phone</span>
                    <span className="font-bold text-slate-800">{successReceipt.mobileNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Department</span>
                    <span className="font-bold text-slate-800">{successReceipt.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Specialist Doctor</span>
                    <span className="font-bold text-sky-700">{successReceipt.doctorName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Appointment Date & Time</span>
                    <span className="font-bold text-slate-800">{successReceipt.date} • {successReceipt.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Payment Mode</span>
                    <span className="font-bold text-slate-800">{successReceipt.paymentMethod}</span>
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS (PDF, PRINT, EMAIL & WHATSAPP) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                
                {/* 1. Download PDF / Slip */}
                <button
                  onClick={handleDownloadPDF}
                  className="py-2 px-2 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded border border-sky-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  title="Download Slip File"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Slip</span>
                </button>

                {/* 2. Print Slip */}
                <button
                  onClick={handlePrint}
                  className="py-2 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded border border-slate-300 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  title="Print Official Slip"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>

                {/* 3. Send Email */}
                <button
                  onClick={handleSendEmail}
                  className={`py-2 px-2 font-bold text-xs rounded border transition-colors flex items-center justify-center space-x-1 cursor-pointer ${
                    emailDispatched
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  }`}
                  title="Send Slip to Email"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{emailDispatched ? 'Email Sent ✓' : 'Send Email'}</span>
                </button>

                {/* 4. WhatsApp Share */}
                <button
                  onClick={handleSendWhatsApp}
                  className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                  title="Open WhatsApp Confirmation"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

              </div>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-md transition-colors cursor-pointer"
                >
                  Done / Close
                </button>
              </div>

            </div>
          )}

          {/* VIEW B: BOOKING FORM */}
          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* IF PRE-SELECTED FROM HOMEPAGE: SHOW LOCKED CONFIRMATION BANNER */}
              {hasPreSelectedDetails ? (
                <div className="bg-[#f0f7ff] border border-sky-200 rounded-lg p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center space-x-1.5">
                      <Check className="w-4 h-4 text-sky-700" />
                      <span>Confirmed Appointment Details</span>
                    </div>
                    <span className="text-[10px] text-sky-700 font-semibold bg-sky-100 px-2 py-0.5 rounded">
                      Pre-Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Department</span>
                      <span className="font-bold text-slate-900">{formData.department}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Specialist Doctor</span>
                      <span className="font-bold text-sky-800">{formData.doctorName}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Preferred Date</span>
                      <span className="font-bold text-slate-900">{formData.date}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* IF OPENED GENERICALLY: SELECT DEPARTMENT -> DYNAMICALLY FILTERED DOCTOR -> DATE */
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Department / Problem *
                    </label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    >
                      {servicesList.map((s) => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Specialist Doctor *
                    </label>
                    <select
                      value={formData.doctorName}
                      onChange={(e) => handleDoctorChange(e.target.value)}
                      className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    >
                      {currentAvailableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.name}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Appointment Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleDateChange(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full h-8 px-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
                    />
                  </div>
                </div>
              )}

              {/* REAL-TIME TIME SLOT PICKER WITH DOCTOR CONFLICT LOCKING */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-700" />
                    <span>Choose Consultation Time Slot *</span>
                  </label>
                  <span className="text-[10px] text-slate-400">
                    Real-time slot availability for {formData.doctorName}
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {timeSlots.map((slot) => {
                    const booked = isSlotBooked(formData.doctorName, formData.date, slot);
                    const isSelected = formData.timeSlot === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={booked}
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`py-1.5 px-1 rounded text-[11px] font-semibold transition-all text-center relative ${
                          booked
                            ? 'bg-red-50 text-red-400 border border-red-200 cursor-not-allowed line-through opacity-70'
                            : isSelected
                            ? 'bg-sky-700 text-white font-bold shadow-xs border border-sky-700 cursor-pointer'
                            : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border border-slate-200 cursor-pointer'
                        }`}
                        title={booked ? `Slot reserved for another patient` : `Select ${slot}`}
                      >
                        {slot.replace(':00', '')}
                      </button>
                    );
                  })}
                </div>
                {isSlotBooked(formData.doctorName, formData.date, formData.timeSlot) && (
                  <p className="text-[11px] text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Selected time slot is currently booked. Please select another slot.</span>
                  </p>
                )}
              </div>

              {/* PATIENT DETAILS */}
              <div className="space-y-3 pt-2 border-t border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center justify-between">
                  <span>Patient Contact Information</span>
                  <span className="text-[10px] text-slate-400 font-normal">* Required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Patient Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Karthick S"
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-sky-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Mobile Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-sky-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        placeholder="patient@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-sky-600"
                      />
                    </div>
                  </div>

                  {/* Payment Mode Selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Payment Mode *
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full h-8 px-2 bg-slate-50 border border-slate-300 rounded text-xs font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-sky-600"
                    >
                      <option value="Pay at Hospital Desk / Cashless">Pay at Hospital Desk (Cash/Card/TPA)</option>
                      <option value="Instant UPI / Google Pay / PhonePe">Instant UPI / Google Pay (QR Code)</option>
                      <option value="Credit / Debit Card">Credit / Debit Card</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* CONSULTANCY FEE SUMMARY BAR */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-800 block">Outpatient Consultancy Fee:</span>
                  <span className="text-[10px] text-slate-500">Includes primary consultation & vital signs screening</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold text-emerald-700">₹{formData.consultationFee}</span>
                  <span className="text-[10px] font-semibold text-emerald-600 block">Instant OPD Queue Token</span>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded-md transition-colors shadow-sm cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm Appointment & Generate Token (₹{formData.consultationFee})</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default AppointmentModal;
