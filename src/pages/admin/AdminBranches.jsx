import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { MapPin, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react';

const AdminBranches = () => {
  const { branches, addBranch, updateBranch, deleteBranch } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', tagline: '', address: '', mobile: '', email: '', hours: '', image: '', mapUrl: '', features: [] });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [featuresText, setFeaturesText] = useState('');

  const filtered = branches.filter((b) => b.name.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditingId(null); setForm({ name: '', tagline: '', address: '', mobile: '', email: '', hours: '', image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1000&q=80', mapUrl: '', features: [] }); setFeaturesText(''); setShowForm(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ ...item }); setFeaturesText((item.features || []).join(', ')); setShowForm(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const features = featuresText.split(',').map((f) => f.trim()).filter(Boolean);
    if (editingId) { updateBranch(editingId, { ...form, features }); }
    else { addBranch({ ...form, features }); }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-sky-700" />
            <span>Hospital Branch Campuses</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage hospital location addresses, phone numbers, and facilities (Total: {branches.length})</p>
        </div>
        <button onClick={openAdd} className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /><span>Add Branch</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hospital branch locations..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((branch) => (
          <div key={branch.id} className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden hover:border-sky-500 transition-all flex flex-col justify-between">
            <div className="h-36 w-full bg-slate-900 overflow-hidden">
              <img src={branch.image} alt={branch.name} className="h-full w-full object-cover" />
            </div>
            <div className="p-4 space-y-2 flex-grow">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm text-slate-900">{branch.name}</h3>
                <div className="flex items-center space-x-1 shrink-0">
                  <button onClick={() => openEdit(branch)} className="p-1 text-slate-500 hover:text-sky-700 hover:bg-slate-100 rounded cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(branch.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{branch.address}</p>
              <p className="text-xs font-semibold text-sky-700">{branch.mobile}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {(branch.features || []).slice(0, 3).map((f, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded border border-slate-200">{f}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-lg border border-slate-200">No matching branches found</div>}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-lg space-y-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Delete Branch Location?</h3>
            <p className="text-xs text-slate-500">This will remove the branch campus from public listings.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={() => { deleteBranch(deleteConfirm); setDeleteConfirm(null); }} className="px-3.5 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-5 max-w-lg w-full shadow-xl space-y-3 my-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Branch Location' : 'Add New Branch'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {[
                { key: 'name', label: 'Branch Campus Name', placeholder: 'Lifecare Hospital - Main Campus', required: true },
                { key: 'tagline', label: 'Tagline', placeholder: '24/7 Emergency, ICU & Trauma Center' },
                { key: 'mobile', label: 'Mobile / Telephone', placeholder: '+91 98765 43210' },
                { key: 'email', label: 'Email Address', placeholder: 'campus@lifecarehospital.com' },
                { key: 'hours', label: 'Working Hours', placeholder: '24 Hours / 7 Days a Week' },
                { key: 'image', label: 'Branch Photo URL', placeholder: 'https://...' },
                { key: 'mapUrl', label: 'Google Maps Link', placeholder: 'https://maps.google.com/...' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input type="text" required={f.required} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white" />
                </div>
              ))}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Postal Address</label>
                <textarea rows={2} value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Complete street address, landmark, pincode..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Facilities / Key Features (comma separated)</label>
                <input type="text" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Level-1 Trauma, Cath Lab, 3.0T MRI, 24/7 Pharmacy"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" /><span>{editingId ? 'Save Changes' : 'Add Branch'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBranches;
