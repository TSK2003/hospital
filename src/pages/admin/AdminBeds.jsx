import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  BedDouble,
  Plus,
  Search,
  CheckCircle2,
  ArrowRightLeft,
  LogOut,
  UserPlus,
  Wind,
  Activity,
  X,
  Save
} from 'lucide-react';

const AdminBeds = () => {
  const {
    beds,
    wards,
    admitPatientToBed,
    dischargePatientFromBed,
    updateBedStatus,
    transferPatientBed,
    addBed,
    deleteBed,
    doctors
  } = useAdmin();

  const [search, setSearch] = useState('');
  const [selectedWard, setSelectedWard] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Modals
  const [admitModalBed, setAdmitModalBed] = useState(null);
  const [transferModalBed, setTransferModalBed] = useState(null);
  const [targetTransferBedId, setTargetTransferBedId] = useState('');
  const [showAddBedModal, setShowAddBedModal] = useState(false);
  const [viewDetailBed, setViewDetailBed] = useState(null);

  // Admission Form
  const [admitForm, setAdmitForm] = useState({
    patientName: '',
    patientId: '',
    attendingDoctor: doctors[0]?.name || 'Dr. Arun Sharma',
    oxygenSupport: false,
    ventilatorSupport: false,
    notes: ''
  });

  // New Bed Form
  const [newBedForm, setNewBedForm] = useState({
    bedNumber: '',
    ward: 'ICU',
    floor: '1st Floor',
    wing: 'Critical Care Block',
    dailyRate: 4500,
    oxygenSupport: true,
    ventilatorSupport: false,
    notes: 'New bed installation'
  });

  // Calculate Metrics
  const totalBeds = beds.length;
  const occupiedBeds = beds.filter((b) => b.status === 'occupied').length;
  const availableBeds = beds.filter((b) => b.status === 'available').length;
  const sanitizingBeds = beds.filter((b) => b.status === 'sanitizing').length;
  const maintenanceBeds = beds.filter((b) => b.status === 'maintenance').length;
  const occupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

  // Filtered Beds
  const filteredBeds = beds.filter((b) => {
    const matchWard = selectedWard === 'ALL' || b.ward === selectedWard;
    const matchStatus = selectedStatus === 'ALL' || b.status === selectedStatus;
    const matchSearch =
      (b.bedNumber || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.patientName || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.patientId || '').toLowerCase().includes(search.toLowerCase()) ||
      (b.attendingDoctor || '').toLowerCase().includes(search.toLowerCase());
    return matchWard && matchStatus && matchSearch;
  });

  // Open Admit
  const handleOpenAdmit = (bed) => {
    setAdmitModalBed(bed);
    setAdmitForm({
      patientName: '',
      patientId: `IP-${Math.floor(90000 + Math.random() * 9999)}`,
      attendingDoctor: doctors[0]?.name || 'Dr. Arun Sharma',
      oxygenSupport: bed.oxygenSupport || false,
      ventilatorSupport: bed.ventilatorSupport || false,
      notes: ''
    });
  };

  const handleConfirmAdmission = (e) => {
    e.preventDefault();
    if (!admitModalBed) return;
    admitPatientToBed(admitModalBed.id, admitForm);
    setAdmitModalBed(null);
  };

  // Open Transfer
  const handleOpenTransfer = (bed) => {
    setTransferModalBed(bed);
    const firstAvailable = beds.find((b) => b.status === 'available' && b.id !== bed.id);
    setTargetTransferBedId(firstAvailable ? firstAvailable.id : '');
  };

  const handleConfirmTransfer = (e) => {
    e.preventDefault();
    if (!transferModalBed || !targetTransferBedId) return;
    transferPatientBed(transferModalBed.id, targetTransferBedId);
    setTransferModalBed(null);
  };

  // Create New Bed
  const handleCreateBed = (e) => {
    e.preventDefault();
    addBed({
      ...newBedForm,
      status: 'available',
      patientName: '',
      patientId: '',
      admittedDate: '',
      attendingDoctor: ''
    });
    setShowAddBedModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
            <BedDouble className="w-5 h-5 text-sky-700" />
            <span>Bed & Inpatient Ward Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time inpatient occupancy, bed allocation, patient transfers, and ward sanitization workflow.
          </p>
        </div>
        <button
          onClick={() => setShowAddBedModal(true)}
          className="px-3.5 py-2 bg-sky-700 hover:bg-sky-800 text-white font-bold text-xs rounded flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Bed</span>
        </button>
      </div>

      {/* Live KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Total Beds</span>
          <p className="text-2xl font-bold text-slate-900 mt-1">{totalBeds}</p>
          <span className="text-[10px] text-slate-400 font-medium">{wards.length} Inpatient Wards</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-rose-200 shadow-xs">
          <span className="text-[11px] font-semibold text-rose-700 uppercase tracking-wider block">Occupied Beds</span>
          <p className="text-2xl font-bold text-rose-700 mt-1">{occupiedBeds}</p>
          <span className="text-[10px] text-rose-600 font-medium">Active Inpatients</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-emerald-200 shadow-xs">
          <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider block">Available</span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">{availableBeds}</p>
          <span className="text-[10px] text-emerald-600 font-medium">Ready for Intake</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-amber-200 shadow-xs">
          <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider block">Sanitizing</span>
          <p className="text-2xl font-bold text-amber-700 mt-1">{sanitizingBeds}</p>
          <span className="text-[10px] text-amber-600 font-medium">Cleaning in Progress</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">Maintenance</span>
          <p className="text-2xl font-bold text-slate-700 mt-1">{maintenanceBeds}</p>
          <span className="text-[10px] text-slate-400 font-medium">Tech Calibration</span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-sky-200 shadow-xs">
          <span className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider block">Occupancy Rate</span>
          <p className="text-2xl font-bold text-sky-800 mt-1">{occupancyRate}%</p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
            <div className="bg-sky-700 h-1.5 rounded-full" style={{ width: `${occupancyRate}%` }}></div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs space-y-3">
        {/* Ward Pills Filter */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 text-xs">
          <button
            onClick={() => setSelectedWard('ALL')}
            className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedWard === 'ALL' ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All Wards ({beds.length})
          </button>
          {wards.map((w) => {
            const count = beds.filter((b) => b.ward === w.id).length;
            const occ = beds.filter((b) => b.ward === w.id && b.status === 'occupied').length;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWard(w.id)}
                className={`px-3 py-1.5 rounded font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedWard === w.id ? 'bg-sky-700 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {w.id} ({occ}/{count})
              </button>
            );
          })}
        </div>

        {/* Search & Status Row */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by bed number, patient name, IP number, or doctor..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-sky-600 focus:bg-white"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-300 rounded text-xs font-semibold text-slate-700 focus:outline-none focus:border-sky-600 focus:bg-white w-full sm:w-auto"
            >
              <option value="ALL">All Statuses</option>
              <option value="available">Available Only</option>
              <option value="occupied">Occupied Only</option>
              <option value="sanitizing">Sanitizing Only</option>
              <option value="maintenance">Maintenance Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Beds Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'occupied';
          const isAvailable = bed.status === 'available';
          const isSanitizing = bed.status === 'sanitizing';
          const isMaintenance = bed.status === 'maintenance';

          return (
            <div
              key={bed.id}
              className={`bg-white rounded-lg border shadow-xs p-4 flex flex-col justify-between transition-all ${
                isOccupied
                  ? 'border-rose-300 bg-rose-50/10'
                  : isAvailable
                  ? 'border-emerald-300 bg-emerald-50/10'
                  : isSanitizing
                  ? 'border-amber-300 bg-amber-50/10'
                  : 'border-slate-300 bg-slate-50/30'
              }`}
            >
              <div className="space-y-2.5">
                {/* Card Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      {bed.ward} • {bed.floor}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">{bed.bedNumber}</h3>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      isOccupied
                        ? 'bg-rose-100 text-rose-800'
                        : isAvailable
                        ? 'bg-emerald-100 text-emerald-800'
                        : isSanitizing
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {bed.status}
                  </span>
                </div>

                {/* Patient / Bed Info */}
                {isOccupied ? (
                  <div className="p-2.5 bg-white rounded border border-rose-200 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{bed.patientName}</span>
                      <span className="text-[10px] font-semibold text-rose-700">{bed.patientId}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      <span className="text-slate-400">Doctor:</span> {bed.attendingDoctor}
                    </p>
                    <p className="text-[10px] text-slate-400">Admitted: {bed.admittedDate}</p>
                    {bed.notes && <p className="text-[10px] text-slate-500 italic line-clamp-1">"{bed.notes}"</p>}
                  </div>
                ) : (
                  <div className="p-2.5 bg-white rounded border border-slate-200 text-xs text-slate-500 space-y-1">
                    <p className="font-semibold text-slate-700">
                      {isAvailable ? 'Ready for Admission' : isSanitizing ? 'Sanitization Underway' : 'Maintenance in Progress'}
                    </p>
                    <p className="text-[11px] text-slate-400">{bed.wing}</p>
                  </div>
                )}

                {/* Equipment & Features */}
                <div className="flex items-center space-x-2 text-[10px]">
                  {bed.oxygenSupport && (
                    <span className="px-1.5 py-0.5 bg-sky-50 text-sky-800 border border-sky-200 rounded font-semibold flex items-center space-x-1">
                      <Wind className="w-3 h-3" />
                      <span>O2 Port</span>
                    </span>
                  )}
                  {bed.ventilatorSupport && (
                    <span className="px-1.5 py-0.5 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded font-semibold flex items-center space-x-1">
                      <Activity className="w-3 h-3" />
                      <span>Ventilator</span>
                    </span>
                  )}
                  <span className="ml-auto text-slate-400 font-medium">₹{bed.dailyRate}/day</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                {isAvailable && (
                  <button
                    onClick={() => handleOpenAdmit(bed)}
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Admit Patient</span>
                  </button>
                )}

                {isOccupied && (
                  <div className="grid grid-cols-2 gap-1.5 w-full">
                    <button
                      onClick={() => handleOpenTransfer(bed)}
                      className="py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                      title="Transfer to Another Bed"
                    >
                      <ArrowRightLeft className="w-3 h-3" />
                      <span>Transfer</span>
                    </button>
                    <button
                      onClick={() => dischargePatientFromBed(bed.id, 'sanitizing')}
                      className="py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                      title="Discharge Patient"
                    >
                      <LogOut className="w-3 h-3" />
                      <span>Discharge</span>
                    </button>
                  </div>
                )}

                {isSanitizing && (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'available')}
                    className="w-full py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Sanitized & Ready</span>
                  </button>
                )}

                {isMaintenance && (
                  <button
                    onClick={() => updateBedStatus(bed.id, 'available')}
                    className="w-full py-1.5 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded flex items-center justify-center space-x-1 transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete Maintenance</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredBeds.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center text-xs text-slate-400">
          No beds found matching the selected filter criteria.
        </div>
      )}

      {/* ADMIT PATIENT MODAL */}
      {admitModalBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-md w-full shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Inpatient Admission</h3>
                <p className="text-[11px] text-slate-500">Allocating Bed: <span className="font-bold text-sky-700">{admitModalBed.bedNumber}</span> ({admitModalBed.ward})</p>
              </div>
              <button onClick={() => setAdmitModalBed(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdmission} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  value={admitForm.patientName}
                  onChange={(e) => setAdmitForm({ ...admitForm, patientName: e.target.value })}
                  placeholder="e.g. S. Meenakshi"
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Inpatient IP Number</label>
                  <input
                    type="text"
                    required
                    value={admitForm.patientId}
                    onChange={(e) => setAdmitForm({ ...admitForm, patientId: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Attending Consultant</label>
                  <select
                    value={admitForm.attendingDoctor}
                    onChange={(e) => setAdmitForm({ ...admitForm, attendingDoctor: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  >
                    {doctors.map((d) => (
                      <option key={d.id} value={d.name}>{d.name} ({d.department})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={admitForm.oxygenSupport}
                    onChange={(e) => setAdmitForm({ ...admitForm, oxygenSupport: e.target.checked })}
                    className="rounded border-slate-300 text-sky-700 focus:ring-sky-600"
                  />
                  <span className="text-slate-700 font-medium">Oxygen Therapy</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={admitForm.ventilatorSupport}
                    onChange={(e) => setAdmitForm({ ...admitForm, ventilatorSupport: e.target.checked })}
                    className="rounded border-slate-300 text-sky-700 focus:ring-sky-600"
                  />
                  <span className="text-slate-700 font-medium">Ventilator Support</span>
                </label>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Admission Diagnosis & Notes</label>
                <textarea
                  rows={2}
                  value={admitForm.notes}
                  onChange={(e) => setAdmitForm({ ...admitForm, notes: e.target.value })}
                  placeholder="Primary diagnosis, reason for inpatient stay, allergy notes..."
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAdmitModalBed(null)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirm Admission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRANSFER PATIENT MODAL */}
      {transferModalBed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-md w-full shadow-xl space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Bed Transfer</h3>
                <p className="text-[11px] text-slate-500">Transferring: <span className="font-bold text-slate-800">{transferModalBed.patientName}</span> from {transferModalBed.bedNumber}</p>
              </div>
              <button onClick={() => setTransferModalBed(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmTransfer} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Destination Available Bed</label>
                <select
                  required
                  value={targetTransferBedId}
                  onChange={(e) => setTargetTransferBedId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white text-xs font-semibold"
                >
                  <option value="">-- Choose Available Bed --</option>
                  {beds
                    .filter((b) => b.status === 'available' && b.id !== transferModalBed.id)
                    .map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.bedNumber} ({b.ward} - {b.floor}) - ₹{b.dailyRate}/day
                      </option>
                    ))}
                </select>
              </div>

              <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200">
                The current bed ({transferModalBed.bedNumber}) will automatically be flagged as <strong>Sanitizing</strong> upon transfer completion.
              </p>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTransferModalBed(null)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!targetTransferBedId}
                  className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 disabled:opacity-50 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer"
                >
                  <ArrowRightLeft className="w-3.5 h-3.5" />
                  <span>Execute Transfer</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD NEW BED ASSET MODAL */}
      {showAddBedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg p-5 max-w-md w-full shadow-xl space-y-3 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Add New Bed Asset</h3>
              <button onClick={() => setShowAddBedModal(false)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBed} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bed Number / Code</label>
                  <input
                    type="text"
                    required
                    value={newBedForm.bedNumber}
                    onChange={(e) => setNewBedForm({ ...newBedForm, bedNumber: e.target.value })}
                    placeholder="e.g. ICU-107, GW-205"
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ward Category</label>
                  <select
                    value={newBedForm.ward}
                    onChange={(e) => setNewBedForm({ ...newBedForm, ward: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  >
                    {wards.map((w) => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Floor</label>
                  <input
                    type="text"
                    value={newBedForm.floor}
                    onChange={(e) => setNewBedForm({ ...newBedForm, floor: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Daily Tariff (₹)</label>
                  <input
                    type="number"
                    value={newBedForm.dailyRate}
                    onChange={(e) => setNewBedForm({ ...newBedForm, dailyRate: Number(e.target.value) })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded focus:outline-none focus:border-sky-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4 pt-1">
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBedForm.oxygenSupport}
                    onChange={(e) => setNewBedForm({ ...newBedForm, oxygenSupport: e.target.checked })}
                    className="rounded border-slate-300 text-sky-700"
                  />
                  <span className="text-slate-700 font-medium">Oxygen Equipped</span>
                </label>
                <label className="flex items-center space-x-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newBedForm.ventilatorSupport}
                    onChange={(e) => setNewBedForm({ ...newBedForm, ventilatorSupport: e.target.checked })}
                    className="rounded border-slate-300 text-sky-700"
                  />
                  <span className="text-slate-700 font-medium">Ventilator Equipped</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddBedModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-sky-700 hover:bg-sky-800 text-white font-bold rounded flex items-center space-x-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Register Bed</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBeds;
