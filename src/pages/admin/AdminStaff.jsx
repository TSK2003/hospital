import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save
} from 'lucide-react';

const shiftOptions = [
  'Morning (07:00 - 15:00)',
  'Evening (14:00 - 22:00)',
  'Night (21:30 - 07:30)',
  'General (09:00 - 17:30)',
  'On-Call Emergency'
];

const categoryOptions = [
  'Doctor',
  'Nursing',
  'Technician',
  'OT Staff',
  'Pharmacy',
  'Administration'
];

const emptyStaff = {
  empId: '',
  name: '',
  category: 'Nursing',
  role: '',
  department: 'General Inpatient',
  assignedWard: '2nd Floor General Ward',
  shift: 'Morning (07:00 - 15:00)',
  dutyStatus: 'On Duty',
  phone: '',
  email: '',
  qualification: ''
};

const AdminStaff = () => {
  const {
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    updateStaffDutyStatus,
    updateStaffShift
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedShift, setSelectedShift] = useState('ALL');
  const [selectedDutyStatus, setSelectedDutyStatus] = useState('ALL');

  // Modals
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyStaff });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Workforce Metrics
  const totalStaff = staff.length;
  const onDutyCount = staff.filter((s) => s.dutyStatus === 'On Duty').length;
  const inSurgeryCount = staff.filter((s) => s.dutyStatus === 'In Surgery').length;
  const offDutyCount = staff.filter((s) => s.dutyStatus === 'Off Duty').length;
  const onLeaveCount = staff.filter((s) => s.dutyStatus === 'On Leave').length;

  // Filtered List
  const filteredStaff = staff.filter((s) => {
    const matchCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchShift = selectedShift === 'ALL' || s.shift === selectedShift;
    const matchStatus = selectedDutyStatus === 'ALL' || s.dutyStatus === selectedDutyStatus;
    const matchSearch =
      (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.empId || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.role || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.department || '').toLowerCase().includes(search.toLowerCase()) ||
      (s.assignedWard || '').toLowerCase().includes(search.toLowerCase());
    return matchCat && matchShift && matchStatus && matchSearch;
  });

  const openAdd = () => {
    setEditingId(null);
    setForm({
      ...emptyStaff,
      empId: `LC-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowModal(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({ ...item });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateStaff(editingId, form);
    } else {
      addStaff(form);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteStaff(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Users className="w-5 h-5 text-sky-700" />
            <span>Hospital Staff & Workforce Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage hospital medical officers, nursing staff, technicians, OT teams, duty rosters, and active shifts (Total Workforce: {staff.length})
          </p>
        </div>
        <button
          onClick={openAdd}
          className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Staff Member</span>
        </button>
      </div>

      {/* Live Workforce KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Workforce</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalStaff}</p>
          <span className="text-[10px] text-slate-400 font-medium">6 Clinical Departments</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-emerald-200 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">On Duty Now</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{onDutyCount}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Active on Floor / OPD</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-indigo-200 shadow-xs">
          <span className="text-[11px] font-semibold text-indigo-700 uppercase tracking-wider block">In Surgery (OT)</span>
          <p className="text-2xl font-bold text-indigo-700 mt-1">{inSurgeryCount}</p>
          <span className="text-[10px] text-indigo-600 font-medium">Main & Ortho OT</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Off Duty</span>
          <p className="text-2xl font-bold text-slate-700 mt-1">{offDutyCount}</p>
          <span className="text-[10px] text-slate-400 font-medium">Between Shifts</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-amber-200 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">On Leave</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">{onLeaveCount}</p>
          <span className="text-[10px] text-amber-600 font-medium">Approved Absence</span>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'ALL' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Personnel ({staff.length})
          </button>
          {categoryOptions.map((cat) => {
            const count = staff.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search, Shift, and Status Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff by name, Employee ID, designation, or ward..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-600 focus:bg-white"
            >
              <option value="ALL">All Shift Timings</option>
              {shiftOptions.map((sh) => (
                <option key={sh} value={sh}>{sh}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDutyStatus}
              onChange={(e) => setSelectedDutyStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-600 focus:bg-white"
            >
              <option value="ALL">All Duty Statuses</option>
              <option value="On Duty">On Duty Only</option>
              <option value="In Surgery">In Surgery Only</option>
              <option value="Off Duty">Off Duty Only</option>
              <option value="On Leave">On Leave Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Staff Directory Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200">
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Emp ID</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Staff Name & Role</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Category</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Assigned Ward / Dept</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Shift Roster</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Duty Status</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Contact</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((member) => {
                const isOnDuty = member.dutyStatus === 'On Duty';
                const isInSurgery = member.dutyStatus === 'In Surgery';
                const isOffDuty = member.dutyStatus === 'Off Duty';
                const isOnLeave = member.dutyStatus === 'On Leave';

                return (
                  <tr key={member.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2.5 font-bold text-sky-700 whitespace-nowrap">{member.empId}</td>
                    <td className="px-4 py-2.5">
                      <div>
                        <span className="font-bold text-slate-900 block">{member.name}</span>
                        <span className="text-[11px] text-slate-500">{member.role}</span>
                        {member.qualification && (
                          <span className="text-[10px] text-slate-400 block">{member.qualification}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded border border-slate-200">
                        {member.category}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      <div>
                        <span className="font-medium text-slate-800 block">{member.assignedWard}</span>
                        <span className="text-[10px] text-slate-400">{member.department}</span>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-slate-600">
                      <select
                        value={member.shift}
                        onChange={(e) => updateStaffShift(member.id, e.target.value)}
                        className="bg-transparent border border-transparent hover:border-slate-300 rounded px-1 py-0.5 text-xs text-slate-700 cursor-pointer"
                      >
                        {shiftOptions.map((sh) => (
                          <option key={sh} value={sh}>{sh}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2.5">
                      <select
                        value={member.dutyStatus}
                        onChange={(e) => updateStaffDutyStatus(member.id, e.target.value)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer border ${
                          isOnDuty
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                            : isInSurgery
                            ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                            : isOffDuty
                            ? 'bg-slate-100 text-slate-700 border-slate-300'
                            : 'bg-amber-100 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="On Duty">On Duty</option>
                        <option value="In Surgery">In Surgery</option>
                        <option value="Off Duty">Off Duty</option>
                        <option value="On Leave">On Leave</option>
                      </select>
                    </td>
                    <td className="px-4 py-2.5 text-slate-500 text-[11px] whitespace-nowrap">
                      <div>{member.phone}</div>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => openEdit(member)}
                          className="p-1 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded cursor-pointer"
                          title="Edit Profile"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(member.id)}
                          className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"
                          title="Remove Staff"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredStaff.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-400">
            No staff records found matching the active filters.
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-lg space-y-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Remove Staff Record?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to remove this staff member from the active hospital directory?
            </p>
            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-3.5 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded cursor-pointer"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Staff Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-5 max-w-lg w-full shadow-xl space-y-3 my-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">
                {editingId ? 'Edit Staff Profile' : 'Register New Staff Member'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    required
                    value={form.empId}
                    onChange={(e) => setForm({ ...form, empId: e.target.value })}
                    placeholder="LC-NUR-035"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Personnel Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name & Salutation</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Sister Priya Mary, Dr. Anand Varma"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation / Role</label>
                  <input
                    type="text"
                    required
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    placeholder="e.g. Staff Nurse Grade-1, ICU In-Charge"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={form.qualification || ''}
                    onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                    placeholder="e.g. BSc Nursing, MBBS, DMLT"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    placeholder="Critical Care / Emergency / Cardiology"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Ward / Wing</label>
                  <input
                    type="text"
                    value={form.assignedWard}
                    onChange={(e) => setForm({ ...form, assignedWard: e.target.value })}
                    placeholder="Critical Care ICU Block / Main OT"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shift Schedule</label>
                  <select
                    value={form.shift}
                    onChange={(e) => setForm({ ...form, shift: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  >
                    {shiftOptions.map((sh) => (
                      <option key={sh} value={sh}>{sh}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Current Duty Status</label>
                  <select
                    value={form.dutyStatus}
                    onChange={(e) => setForm({ ...form, dutyStatus: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white font-semibold"
                  >
                    <option value="On Duty">On Duty</option>
                    <option value="In Surgery">In Surgery</option>
                    <option value="Off Duty">Off Duty</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 00000"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="staff@lifecarehospital.com"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{editingId ? 'Save Changes' : 'Register Staff'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
