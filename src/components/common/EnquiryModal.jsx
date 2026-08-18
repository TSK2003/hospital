import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Medical Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200">
        <div className="bg-slate-900 p-5 text-white flex justify-between items-center">
          <div>
            <span className="inline-block px-2 py-0.5 bg-slate-800 text-sky-400 rounded text-[11px] font-semibold uppercase tracking-wider mb-1">
              Quick Assistance
            </span>
            <h3 className="text-lg font-bold">General Enquiry</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Inquiry Received</h4>
            <p className="text-slate-600 text-xs leading-relaxed max-w-xs mx-auto">
              Thank you. Our hospital front desk will contact you shortly at <span className="font-semibold text-sky-700">{formData.phone}</span>.
            </p>
            <button
              onClick={handleReset}
              className="mt-3 px-5 py-2 bg-sky-700 text-white text-xs font-semibold rounded hover:bg-sky-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Rajesh Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Inquiry Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
              >
                <option value="General Medical Inquiry">General Medical Inquiry</option>
                <option value="Health Package Query">Health Package Query</option>
                <option value="Insurance & Cashless Claim">Insurance & Cashless Claim</option>
                <option value="Second Opinion Request">Second Opinion Request</option>
                <option value="Emergency Services">Emergency Services</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">Message</label>
              <textarea
                rows="3"
                placeholder="How can our clinical team assist you?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={onClose} className="px-3.5 py-2 text-slate-600 text-xs font-semibold hover:text-slate-900 cursor-pointer">
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <span>Submit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
