import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CalendarCheck, Search, Eye, CheckCircle2, XCircle, Printer, Download, Trash2 } from 'lucide-react';

const AdminAppointments = () => {
  const { appointments, updateAppointmentStatus, deleteAppointment } = useAdmin();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewModal, setViewModal] = useState(null);

  const filtered = appointments.filter((a) => {
    const aptId = a.appointmentId || a.token || '';
    const patient = a.patientName || '';
    const doctor = a.doctorName || '';
    const matchSearch = patient.toLowerCase().includes(search.toLowerCase()) ||
      aptId.toLowerCase().includes(search.toLowerCase()) ||
      doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || (a.status || 'confirmed').toLowerCase() === filterStatus.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <CalendarCheck className="w-5 h-5 text-sky-700" />
            <span>Patient Appointments Registry</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Real-time tracking of booked outpatient consultations across all clinical departments (Total: {appointments.length})</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by patient name, token ID, or specialist doctor..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600" 
          />
        </div>
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-300 rounded text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-600"
        >
          <option value="all">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200">
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Token ID</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Patient Name</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Specialist Doctor</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Department / Campus</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Date & Time Slot</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Consultancy Fee</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Status</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((apt, idx) => {
                const id = apt.appointmentId || apt.token || `LC${String(idx + 1).padStart(3, '0')}`;
                const time = apt.time || apt.timeSlot || '09:30 AM';
                const fee = apt.fee || apt.consultationFee || 500;
                const status = (apt.status || 'confirmed').toLowerCase();

                return (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-sky-700">{id}</td>
                    <td className="px-4 py-2.5">
                      <div className="font-semibold text-slate-800">{apt.patientName}</div>
                      <div className="text-[10px] text-slate-400">{apt.mobileNumber}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="font-medium text-slate-800">{apt.doctorName}</div>
                      <div className="text-[10px] text-sky-700">{apt.department}</div>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600 max-w-[160px] truncate">
                      {apt.branchName || 'Main Campus'}
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="font-semibold text-slate-800">{apt.date}</div>
                      <div className="text-[10px] text-slate-500 font-medium">{time}</div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="font-bold text-emerald-700">₹{fee}</span>
                      <span className="text-[10px] text-emerald-600 block">({apt.paymentStatus || 'Paid'})</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                        status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-sky-100 text-sky-700'
                      }`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button 
                          onClick={() => setViewModal(apt)} 
                          className="p-1 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded cursor-pointer" 
                          title="View Full Slip"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {status === 'confirmed' && (
                          <>
                            <button 
                              onClick={() => updateAppointmentStatus(id, 'completed')} 
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer" 
                              title="Mark as Completed"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => updateAppointmentStatus(id, 'cancelled')} 
                              className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer" 
                              title="Cancel Booking"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-500">No appointments recorded.</p>
            <p>When patients book consultations on the website, they appear here in real time.</p>
          </div>
        )}
      </div>

      {/* View Detail Modal / Printable Official Slip */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Appointment Token Slip #{viewModal.appointmentId || viewModal.token}
                </h3>
                <span className="text-[11px] text-slate-400">Lifecare Multispeciality Hospital</span>
              </div>
              <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded uppercase ${
                (viewModal.status || 'confirmed').toLowerCase() === 'cancelled' ? 'bg-red-100 text-red-700' :
                (viewModal.status || 'confirmed').toLowerCase() === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                'bg-sky-100 text-sky-800'
              }`}>
                {viewModal.status || 'Confirmed'}
              </span>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 grid grid-cols-2 gap-3 text-xs border border-slate-200">
              {[
                ['Token ID', viewModal.appointmentId || viewModal.token],
                ['Patient Name', viewModal.patientName],
                ['Contact Phone', viewModal.mobileNumber],
                ['Email', viewModal.email || '—'],
                ['Department', viewModal.department || 'General Medicine'],
                ['Specialist Doctor', viewModal.doctorName],
                ['Appointment Date', viewModal.date],
                ['Time Slot', viewModal.time || viewModal.timeSlot],
                ['Consultancy Fee', `₹${viewModal.fee || viewModal.consultationFee || 500} (Paid)`],
                ['Payment Mode', viewModal.paymentMethod || 'Hospital OPD Desk / UPI'],
                ['Campus', viewModal.branchName || 'Main Tertiary Campus'],
                ['Booking Time', viewModal.bookingTime || 'Just Now'],
              ].map(([label, val]) => (
                <div key={label}>
                  <span className="text-slate-400 block text-[11px] font-medium">{label}:</span>
                  <span className="font-semibold text-slate-800">{val || '—'}</span>
                </div>
              ))}
            </div>

            {viewModal.notes && (
              <div className="p-3 bg-sky-50 rounded border border-sky-200 text-xs text-sky-900">
                <span className="font-bold block text-[11px]">Symptoms / Medical Notes:</span>
                <p className="mt-0.5">{viewModal.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button 
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded flex items-center space-x-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Slip</span>
              </button>

              <button 
                onClick={() => setViewModal(null)} 
                className="px-5 py-2 text-xs bg-sky-700 hover:bg-sky-800 text-white font-bold rounded cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;
