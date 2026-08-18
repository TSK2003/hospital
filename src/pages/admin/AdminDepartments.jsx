import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Layers3, Plus, Pencil, Trash2, X, Save, Search } from 'lucide-react';

const AdminDepartments = () => {
  const { services, addService, updateService, deleteService } = useAdmin();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', shortDesc: '', about: '', heroImage: '' });
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = services.filter((s) => s.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { setEditingId(null); setForm({ title: '', slug: '', shortDesc: '', about: '', heroImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80' }); setShowForm(true); };
  const openEdit = (item) => { setEditingId(item.id); setForm({ ...item }); setShowForm(true); };

  const handleSave = (e) => {
    e.preventDefault();
    const slug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editingId) { updateService(editingId, { ...form, slug }); }
    else { addService({ ...form, slug, treatments: [], benefits: [], doctors: [], faqs: [] }); }
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <Layers3 className="w-5 h-5 text-sky-700" />
            <span>Clinical Departments & Services</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage hospital medical specialties and clinical content (Total: {services.length})</p>
        </div>
        <button onClick={openAdd} className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer">
          <Plus className="w-4 h-4" /><span>Add Department</span>
        </button>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search clinical departments..."
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((svc) => (
          <div key={svc.id} className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 space-y-2.5 hover:border-sky-500 transition-all flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-sm text-slate-900">{svc.title}</h3>
                <div className="flex items-center space-x-1">
                  <button onClick={() => openEdit(svc)} className="p-1 text-slate-500 hover:text-sky-700 hover:bg-slate-100 rounded cursor-pointer"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => setDeleteConfirm(svc.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{svc.shortDesc}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-medium text-sky-700">/services/{svc.slug}</span>
              {svc.treatments && <span>{svc.treatments.length} treatments</span>}
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-lg border border-slate-200">No matching departments found</div>}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-sm w-full shadow-lg space-y-3 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Delete Department?</h3>
            <p className="text-xs text-slate-500">This will remove the department from the website navigation and services directory.</p>
            <div className="flex justify-end space-x-2 pt-2">
              <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded">Cancel</button>
              <button onClick={() => { deleteService(deleteConfirm); setDeleteConfirm(null); }} className="px-3.5 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white font-bold rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-lg p-5 max-w-lg w-full shadow-xl space-y-3 my-4 max-h-[90vh] overflow-y-auto border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">{editingId ? 'Edit Department' : 'Add New Department'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              {[
                { key: 'title', label: 'Department Name', placeholder: 'Cardiology', required: true },
                { key: 'slug', label: 'URL Slug', placeholder: 'cardiology (auto-generated if blank)' },
                { key: 'heroImage', label: 'Department Image URL', placeholder: 'https://...' },
              ].map((f) => (
                <div key={f.key}>
                  <label className="block font-semibold text-slate-700 mb-1">{f.label}</label>
                  <input type="text" required={f.required} value={form[f.key] || ''} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    placeholder={f.placeholder} className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white" />
                </div>
              ))}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea rows={2} value={form.shortDesc || ''} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
                  placeholder="Summary overview of the department..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed About Content</label>
                <textarea rows={3} value={form.about || ''} onChange={(e) => setForm({ ...form, about: e.target.value })}
                  placeholder="Comprehensive clinical scope and overview..." className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none" />
              </div>
              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer">
                  <Save className="w-3.5 h-3.5" /><span>{editingId ? 'Save Changes' : 'Add Department'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDepartments;
