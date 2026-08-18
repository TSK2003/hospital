import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { UserRound, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react';

const emptyDoctor = {
  name: '', qualification: '', department: '', branchId: '', experience: '',
  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
  bio: '', timing: 'Mon - Sat: 09:00 AM - 01:00 PM',
};

const AdminDoctors = () => {
  const { doctors, addDoctor, updateDoctor, deleteDoctor, branches } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyDoctor });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filteredDoctors = doctors.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.department.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyDoctor });
    setShowForm(true);
  };

  const openEdit = (doc) => {
    setEditingId(doc.id);
    setForm({ ...doc });
    setShowForm(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      updateDoctor(editingId, form);
    } else {
      addDoctor(form);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    deleteDoctor(id);
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <UserRound className="w-5 h-5 text-sky-700" />
            <span>Doctors Directory Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage doctor profiles, specialties, and consultation hours (Total: {doctors.length})</p>
        </div>
        <button onClick={openAdd} className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by doctor name or clinical department..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-slate-50 text-left border-b border-slate-200">
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Doctor</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Department</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Qualification</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Experience</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase">Timing</th>
                <th className="px-4 py-2.5 font-bold text-slate-600 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-4 py-2.5">
                    <div className="flex items-center space-x-2.5">
                      <img src={doc.image} alt={doc.name} className="w-8 h-8 rounded object-cover border border-slate-200" />
                      <span className="font-semibold text-slate-900">{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-sky-700 font-medium">{doc.department}</td>
                  <td className="px-4 py-2.5 text-slate-600">{doc.qualification}</td>
                  <td className="px-4 py-2.5 text-slate-600">{doc.experience}</td>
                  <td className="px-4 py-2.5 text-slate-500">{doc.timing}</td>
                  <td className="px-4 py-2.5 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <button onClick={() => openEdit(doc)} className="p-1 text-slate-600 hover:text-sky-700 hover:bg-slate-100 rounded" title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteConfirm(doc.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredDoctors.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-400">No matching doctors found</div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-lg space-y-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Delete Doctor Profile?</h3>
            <p className="text-xs text-slate-500">Are you sure you want to delete this doctor from the directory?</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} className="px-3.5 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-5 max-w-lg w-full shadow-xl space-y-3 my-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Doctor Profile' : 'Add New Doctor'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {[
                { key: 'name', label: 'Doctor Full Name', placeholder: 'Dr. Rajesh Sharma' },
                { key: 'qualification', label: 'Qualification', placeholder: 'MD (Cardiology), DM, Fellowship' },
                { key: 'department', label: 'Department / Specialty', placeholder: 'Cardiology' },
                { key: 'experience', label: 'Clinical Experience', placeholder: '15+ Years' },
                { key: 'timing', label: 'Consultation Hours', placeholder: 'Mon - Sat: 09:00 AM - 01:00 PM' },
                { key: 'image', label: 'Profile Photo URL', placeholder: 'https://...' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input
                    type="text" required={f.key === 'name'}
                    value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              ))}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Branch</label>
                <select
                  value={form.branchId || ''} onChange={(e) => setForm({ ...form, branchId: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white"
                >
                  <option value="">All Branches / Main Campus</option>
                  {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Doctor Bio</label>
                <textarea rows={2} value={form.bio || ''} onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  placeholder="Specialist profile summary..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" /><span>{editingId ? 'Save Changes' : 'Add Doctor'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
