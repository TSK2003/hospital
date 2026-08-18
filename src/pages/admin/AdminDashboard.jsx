import React from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import {
  UserRound,
  Layers3,
  CalendarCheck,
  Cpu,
  BedDouble,
  Users,
  TrendingUp,
  ArrowRight
} from 'lucide-react';

const StatCard = ({ label, value, subtext, icon: Icon, to, highlight }) => (
  <Link
    to={to}
    className={`bg-white rounded-lg p-4 border shadow-xs transition-all flex flex-col justify-between ${
      highlight ? 'border-sky-300 bg-sky-50/20 hover:border-sky-500' : 'border-slate-200 hover:border-slate-400'
    }`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        {subtext && <p className="text-[10px] text-slate-400 font-medium mt-0.5">{subtext}</p>}
      </div>
      <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-sky-700">
      <span>Manage Module</span>
      <ArrowRight className="w-3.5 h-3.5" />
    </div>
  </Link>
);

const AdminDashboard = () => {
  const {
    doctors,
    services,
    appointments,
    technologies,
    beds,
    staff
  } = useAdmin();

  // Bed metrics
  const totalBeds = beds?.length || 0;
  const occupiedBeds = (beds || []).filter((b) => b.status === 'occupied').length;
  const availableBeds = (beds || []).filter((b) => b.status === 'available').length;
  const sanitizingBeds = (beds || []).filter((b) => b.status === 'sanitizing').length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Staff metrics
  const totalStaff = staff?.length || 0;
  const onDutyStaff = (staff || []).filter((s) => s.dutyStatus === 'On Duty').length;
  const inSurgeryStaff = (staff || []).filter((s) => s.dutyStatus === 'In Surgery').length;
  const offDutyStaff = (staff || []).filter((s) => s.dutyStatus === 'Off Duty').length;

  const stats = [
    { label: 'Bed & Inpatient Wards', value: `${occupiedBeds}/${totalBeds} Occupied`, subtext: `${availableBeds} Available (${occupancyRate}% Occupancy)`, icon: BedDouble, to: '/admin/beds', highlight: true },
    { label: 'Hospital Workforce', value: `${onDutyStaff}/${totalStaff} On Duty`, subtext: `${inSurgeryStaff} In Surgery (OT)`, icon: Users, to: '/admin/staff', highlight: true },
    { label: 'Booked Appointments', value: appointments.length, subtext: 'OPD Registrations', icon: CalendarCheck, to: '/admin/appointments' },
    { label: 'Consultant Doctors', value: doctors.length, subtext: 'Clinical Specialists', icon: UserRound, to: '/admin/doctors' },
    { label: 'Clinical Departments', value: services.length, subtext: 'Medical Services', icon: Layers3, to: '/admin/departments' },
    { label: 'Equipment & Tech', value: technologies.length, subtext: 'Diagnostic Machines', icon: Cpu, to: '/admin/technologies' },
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900">Hospital ERP Management Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Live inpatient bed occupancy, staff duty rosters, and patient appointments</p>
      </div>

      {/* Main KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* TWO COLUMN LIVE ERP MONITOR: BEDS & STAFF */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Bed Occupancy Monitor */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <BedDouble className="w-5 h-5 text-sky-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Inpatient Bed Status</h2>
            </div>
            <Link to="/admin/beds" className="text-xs font-semibold text-sky-700 hover:underline flex items-center space-x-1">
              <span>Bed Management</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded">
              <span className="text-[10px] text-rose-700 font-bold uppercase block">Occupied</span>
              <span className="text-xl font-extrabold text-rose-800">{occupiedBeds}</span>
            </div>
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">Available</span>
              <span className="text-xl font-extrabold text-emerald-800">{availableBeds}</span>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded">
              <span className="text-[10px] text-amber-700 font-bold uppercase block">Sanitizing</span>
              <span className="text-xl font-extrabold text-amber-800">{sanitizingBeds}</span>
            </div>
          </div>

          {/* Quick List of Critical Occupied Beds */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Inpatient Sample</span>
            <div className="space-y-1">
              {beds.filter((b) => b.status === 'occupied').slice(0, 3).map((b) => (
                <div key={b.id} className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 mr-2">{b.bedNumber}</span>
                    <span className="text-slate-600 font-medium">{b.patientName}</span>
                    <span className="text-[10px] text-slate-400 block">{b.ward} • {b.attendingDoctor}</span>
                  </div>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-800 text-[10px] font-bold rounded">
                    {b.patientId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Staff On-Duty Monitor */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-sky-700" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Staff Workforce</h2>
            </div>
            <Link to="/admin/staff" className="text-xs font-semibold text-sky-700 hover:underline flex items-center space-x-1">
              <span>Staff Roster</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded">
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">On Duty</span>
              <span className="text-xl font-extrabold text-emerald-800">{onDutyStaff}</span>
            </div>
            <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded">
              <span className="text-[10px] text-indigo-700 font-bold uppercase block">In Surgery</span>
              <span className="text-xl font-extrabold text-indigo-800">{inSurgeryStaff}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded">
              <span className="text-[10px] text-slate-600 font-bold uppercase block">Off Duty</span>
              <span className="text-xl font-extrabold text-slate-800">{offDutyStaff}</span>
            </div>
          </div>

          {/* Quick List of On-Duty Leads */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Key Floor In-Charges</span>
            <div className="space-y-1">
              {staff.filter((s) => s.dutyStatus === 'On Duty' || s.dutyStatus === 'In Surgery').slice(0, 3).map((s) => (
                <div key={s.id} className="p-2 bg-slate-50 rounded border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block">{s.name}</span>
                    <span className="text-[10px] text-slate-500">{s.role} • {s.assignedWard}</span>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${
                    s.dutyStatus === 'In Surgery' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {s.dutyStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments Table */}
      {appointments.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Recent Patient Bookings</h2>
            <Link to="/admin/appointments" className="text-xs font-semibold text-sky-700 hover:underline flex items-center space-x-1">
              <span>View All ({appointments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-slate-50 text-left border-b border-slate-200">
                  <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Appointment ID</th>
                  <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Patient Name</th>
                  <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Doctor</th>
                  <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Date & Time</th>
                  <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.slice(0, 5).map((apt, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-sky-700">{apt.appointmentId}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{apt.patientName}</td>
                    <td className="px-4 py-2.5 text-slate-600">{apt.doctorName}</td>
                    <td className="px-4 py-2.5 text-slate-600">{apt.date} at {apt.time}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded font-semibold text-[10px] uppercase ${
                        apt.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        apt.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-sky-100 text-sky-700'
                      }`}>
                        {apt.status || 'Confirmed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {appointments.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-8 text-center">
          <TrendingUp className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-600">No appointments recorded yet</p>
          <p className="text-xs text-slate-400 mt-0.5">Appointments booked by patients on the website will be logged here</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
