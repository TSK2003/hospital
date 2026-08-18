import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Sparkles, Save, RotateCcw, Plus, Trash2 } from 'lucide-react';

const AdminHeroSection = () => {
  const { heroContent, setHeroContent } = useAdmin();
  const [form, setForm] = useState({ ...heroContent });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setHeroContent({ ...form });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateStat = (index, field, value) => {
    const newStats = [...form.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => {
    setForm({ ...form, stats: [...form.stats, { number: '0', label: 'New Metric' }] });
  };

  const removeStat = (index) => {
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-sky-700" />
          <span>Landing Page Hero Section</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Customize the landing page headline, hospital background visual, and key metric counters.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 sm:p-6 space-y-4 text-xs">
        {[
          { key: 'badge', label: 'Top Badge Label', placeholder: 'Lifecare Multispeciality Hospital' },
          { key: 'heading', label: 'Main Headline', placeholder: 'Advanced Multispeciality Healthcare & Clinical Excellence' },
          { key: 'heroImage', label: 'Hospital Background Image URL', placeholder: 'https://images.unsplash.com/...' },
          { key: 'emergencyLabel', label: 'Emergency Card Title', placeholder: '24/7 Emergency Trauma Desk' },
          { key: 'emergencyHotline', label: 'Emergency Hotline Number', placeholder: '1066' },
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

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Subheadline & Description</label>
          <textarea
            rows={3}
            value={form.description || ''}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
          />
        </div>

        {/* Stats Editor */}
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Performance Stats Counters</label>
            <button
              type="button"
              onClick={addStat}
              className="px-2.5 py-1 text-xs font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded flex items-center space-x-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              <span>Add Metric</span>
            </button>
          </div>
          <div className="space-y-2">
            {(form.stats || []).map((stat, idx) => (
              <div key={idx} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={stat.number}
                  onChange={(e) => updateStat(idx, 'number', e.target.value)}
                  placeholder="50,000+"
                  className="w-36 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600"
                />
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(idx, 'label', e.target.value)}
                  placeholder="Patients Treated"
                  className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-none focus:border-sky-600"
                />
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setForm({ ...heroContent })}
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
            <span>{saved ? 'Saved Successfully' : 'Save Hero Section'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHeroSection;
