import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Building2, Save, RotateCcw } from 'lucide-react';

const AdminHospitalInfo = () => {
  const { hospitalInfo, updateHospitalInfo } = useAdmin();
  const [form, setForm] = useState({ ...hospitalInfo });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateHospitalInfo(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Building2 className="w-5 h-5 text-sky-700" />
          <span>Hospital Profile Settings</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Edit global hospital branding, emergency contact details, and main campus address.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {[
            { key: 'name', label: 'Hospital Brand Name', placeholder: 'LIFECARE' },
            { key: 'tagline', label: 'Hospital Tagline', placeholder: 'Multispeciality Hospital' },
            { key: 'fullName', label: 'Full Official Entity Name', placeholder: 'Lifecare Multispeciality Hospital' },
            { key: 'email', label: 'Primary Contact Email', placeholder: 'info@lifecarehospital.com' },
            { key: 'phone', label: 'Main Desk Phone', placeholder: '+91 98765 43210' },
            { key: 'emergencyNumber', label: '24/7 Emergency Hotline Number', placeholder: '1066' },
            { key: 'whatsappNumber', label: 'WhatsApp Contact Number (digits only)', placeholder: '919876543210' },
          ].map((f) => (
            <div key={f.key}>
              <label className="block font-semibold text-slate-700 mb-1">{f.label}</label>
              <input
                type="text"
                value={form[f.key] || ''}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                placeholder={f.placeholder}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white"
              />
            </div>
          ))}
        </div>

        <div className="text-xs">
          <label className="block font-semibold text-slate-700 mb-1">Main Campus Address</label>
          <textarea
            rows={2}
            value={form.address || ''}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            placeholder="Main hospital street address, landmark, city, and pincode..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
          />
        </div>

        <div className="text-xs">
          <label className="block font-semibold text-slate-700 mb-1">About / Overview Paragraph</label>
          <textarea
            rows={3}
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Official institutional overview displayed in footer and about sections..."
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setForm({ ...hospitalInfo })}
            className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold flex items-center space-x-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 cursor-pointer shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? 'Saved Successfully' : 'Save Hospital Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHospitalInfo;
