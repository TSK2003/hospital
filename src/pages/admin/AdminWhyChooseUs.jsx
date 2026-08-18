import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Award, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

const AdminWhyChooseUs = () => {
  const { whyChooseUs, setWhyChooseUs } = useAdmin();
  const [items, setItems] = useState([...whyChooseUs]);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setWhyChooseUs([...items]);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { title: 'New Clinical Advantage', desc: 'Description of hospital capability...', icon: 'Award' }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const iconOptions = ['Stethoscope', 'ShieldCheck', 'Cpu', 'Award', 'HeartHandshake', 'Building2', 'Activity', 'Clock'];

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Award className="w-5 h-5 text-sky-700" />
          <span>Why Choose Us Feature Cards</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize the institutional clinical trust highlights displayed on the landing page.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Feature Card #{idx + 1}</span>
              <button type="button" onClick={() => removeItem(idx)} className="p-1 text-slate-400 hover:text-red-600 rounded">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Feature Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(idx, 'title', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Icon Representation</label>
                <select
                  value={item.icon}
                  onChange={(e) => updateItem(idx, 'icon', e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white"
                >
                  {iconOptions.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
                </select>
              </div>
            </div>
            <div className="text-xs">
              <label className="block font-semibold text-slate-700 mb-1">Description</label>
              <textarea
                rows={2}
                value={item.desc}
                onChange={(e) => updateItem(idx, 'desc', e.target.value)}
                className="w-full p-2 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
              />
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full py-2.5 bg-white hover:bg-slate-50 border border-dashed border-slate-300 rounded-lg text-xs font-semibold text-slate-600 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-sky-700" />
          <span>Add New Feature Card</span>
        </button>

        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setItems([...whyChooseUs])}
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
            <span>{saved ? 'Saved Successfully' : 'Save Feature Highlights'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWhyChooseUs;
