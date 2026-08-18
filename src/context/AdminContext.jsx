import React, { createContext, useContext, useState, useEffect } from 'react';

// Import default data
import { servicesList as defaultServices } from '../data/servicesData';
import { chiefDoctorsList as defaultDoctors } from '../data/doctorsData';
import { branchesList as defaultBranches } from '../data/branchesData';
import { blogPosts as defaultBlogPosts } from '../data/blogData';
import { technologiesList as defaultTechnologies } from '../data/technologiesData';
import { initialBedsList, initialWardsList } from '../data/bedsData';
import { initialStaffList } from '../data/staffData';

const AdminContext = createContext(null);

const STORAGE_KEY = 'lifecare_admin_data';

const defaultHospitalInfo = {
  name: 'Lifecare',
  tagline: 'Multispeciality Hospital',
  fullName: 'Lifecare Multispeciality Hospital',
  description: 'Lifecare Multispeciality Hospital is a premier healthcare institution providing advanced medical care across 20+ departments including Cardiology, Neurology, Orthopaedics, Oncology, and more — with compassionate round-the-clock emergency services.',
  email: 'info@lifecarehospital.com',
  phone: '+91 98765 43210',
  emergencyNumber: '1066',
  address: 'No. 45, Hospital Road, Near High Court Junction, Main City Campus, Pin: 627001',
  whatsappNumber: '919876543210',
};

const defaultHeroContent = {
  badge: 'Lifecare Multispeciality Hospital',
  heading: 'Advanced Multispeciality Healthcare & Clinical Excellence',
  description: 'Delivering comprehensive medical treatment, 24/7 emergency trauma care, and precision diagnostics with over 50+ senior specialists across 20+ departments.',
  heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
  stats: [
    { number: '50,000+', label: 'Patients Treated' },
    { number: '50+', label: 'Specialist Doctors' },
    { number: '20+', label: 'Clinical Departments' },
    { number: '24/7', label: 'Emergency & Trauma' },
  ],
  emergencyLabel: '24/7 Emergency Trauma Desk',
  emergencyHotline: '1066',
};

const defaultWhyChooseUs = [
  {
    title: 'Super-Specialized Consultants',
    desc: 'Over 50+ board-certified specialists across 20+ departments including Cardiology, Neurology, and Oncology.',
    icon: 'Stethoscope',
  },
  {
    title: '24/7 Emergency & ICU Care',
    desc: 'Round-the-clock emergency trauma center with advanced ICU, CCU, and NICU facilities.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Advanced Diagnostic Hub',
    desc: '3.0T MRI scanner, 128-slice CT, digital X-ray, 4D ultrasound, and a full pathology laboratory.',
    icon: 'Cpu',
  },
  {
    title: 'NABH & NABL Accredited',
    desc: 'Internationally recognized quality standards ensuring the highest levels of patient safety and care.',
    icon: 'Award',
  },
];

// Helper: load from localStorage or return default
function loadData(key, defaultValue) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed[key] !== undefined) return parsed[key];
    }
  } catch (e) {
    console.error('AdminContext: Error loading data from localStorage', e);
  }
  return defaultValue;
}

// Helper: save full state to localStorage
function saveAllData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('AdminContext: Error saving data to localStorage', e);
  }
}

export const AdminProvider = ({ children }) => {
  const [hospitalInfo, setHospitalInfo] = useState(() => loadData('hospitalInfo', defaultHospitalInfo));
  const [heroContent, setHeroContent] = useState(() => loadData('heroContent', defaultHeroContent));
  const [whyChooseUs, setWhyChooseUs] = useState(() => loadData('whyChooseUs', defaultWhyChooseUs));
  const [doctors, setDoctors] = useState(() => loadData('doctors', defaultDoctors));
  const [services, setServices] = useState(() => loadData('services', defaultServices));
  const [branches, setBranches] = useState(() => loadData('branches', defaultBranches));
  const [blogPosts, setBlogPosts] = useState(() => loadData('blogPosts', defaultBlogPosts));
  const [technologies, setTechnologies] = useState(() => loadData('technologies', defaultTechnologies));
  const [appointments, setAppointments] = useState(() => loadData('appointments', []));
  const [beds, setBeds] = useState(() => loadData('beds', initialBedsList));
  const [wards, setWards] = useState(() => loadData('wards', initialWardsList));
  const [staff, setStaff] = useState(() => loadData('staff', initialStaffList));

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('lifecare_admin_auth') === 'true';
  });

  // Persist all data to localStorage whenever state changes
  useEffect(() => {
    const allData = {
      hospitalInfo,
      heroContent,
      whyChooseUs,
      doctors,
      services,
      branches,
      blogPosts,
      technologies,
      appointments,
      beds,
      wards,
      staff,
    };
    saveAllData(allData);
  }, [hospitalInfo, heroContent, whyChooseUs, doctors, services, branches, blogPosts, technologies, appointments, beds, wards, staff]);

  // Auth functions
  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('lifecare_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lifecare_admin_auth');
  };

  // Add appointment (called from AppointmentModal)
  const addAppointment = (appointmentData) => {
    setAppointments((prev) => [appointmentData, ...prev]);
  };

  // CRUD helpers for doctors
  const addDoctor = (doctor) => setDoctors((prev) => [...prev, { ...doctor, id: `dr-${Date.now()}` }]);
  const updateDoctor = (id, updatedDoc) => setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...updatedDoc } : d)));
  const deleteDoctor = (id) => setDoctors((prev) => prev.filter((d) => d.id !== id));

  // CRUD helpers for services/departments
  const addService = (service) => setServices((prev) => [...prev, { ...service, id: `svc-${Date.now()}` }]);
  const updateService = (id, updatedSvc) => setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedSvc } : s)));
  const deleteService = (id) => setServices((prev) => prev.filter((s) => s.id !== id));

  // CRUD helpers for branches
  const addBranch = (branch) => setBranches((prev) => [...prev, { ...branch, id: `branch-${Date.now()}` }]);
  const updateBranch = (id, updatedBranch) => setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...updatedBranch } : b)));
  const deleteBranch = (id) => setBranches((prev) => prev.filter((b) => b.id !== id));

  // CRUD helpers for blog posts
  const addBlogPost = (post) => setBlogPosts((prev) => [...prev, { ...post, id: `post-${Date.now()}` }]);
  const updateBlogPost = (id, updatedPost) => setBlogPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)));
  const deleteBlogPost = (id) => setBlogPosts((prev) => prev.filter((p) => p.id !== id));

  // CRUD helpers for technologies
  const addTechnology = (tech) => setTechnologies((prev) => [...prev, { ...tech, id: `tech-${Date.now()}` }]);
  const updateTechnology = (id, updatedTech) => setTechnologies((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedTech } : t)));
  const deleteTechnology = (id) => setTechnologies((prev) => prev.filter((t) => t.id !== id));

  // Appointment management
  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments((prev) =>
      prev.map((a) => (a.appointmentId === appointmentId ? { ...a, status } : a))
    );
  };

  // --- BED MANAGEMENT FUNCTIONS ---
  const admitPatientToBed = (bedId, patientData) => {
    setBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: 'occupied',
              patientName: patientData.patientName,
              patientId: patientData.patientId || `IP-${Math.floor(10000 + Math.random() * 90000)}`,
              admittedDate: patientData.admittedDate || new Date().toISOString().split('T')[0],
              attendingDoctor: patientData.attendingDoctor,
              notes: patientData.notes || 'Inpatient Admission',
              oxygenSupport: !!patientData.oxygenSupport,
              ventilatorSupport: !!patientData.ventilatorSupport,
            }
          : b
      )
    );
  };

  const dischargePatientFromBed = (bedId, nextStatus = 'sanitizing') => {
    setBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status: nextStatus,
              patientName: '',
              patientId: '',
              admittedDate: '',
              attendingDoctor: '',
              notes: nextStatus === 'sanitizing' ? 'Terminal sanitization in progress' : 'Ready for admission',
            }
          : b
      )
    );
  };

  const updateBedStatus = (bedId, status) => {
    setBeds((prev) =>
      prev.map((b) =>
        b.id === bedId
          ? {
              ...b,
              status,
              ...(status === 'available' || status === 'sanitizing' || status === 'maintenance'
                ? { patientName: '', patientId: '', admittedDate: '', attendingDoctor: '' }
                : {}),
            }
          : b
      )
    );
  };

  const transferPatientBed = (fromBedId, toBedId) => {
    const fromBed = beds.find((b) => b.id === fromBedId);
    if (!fromBed) return;

    setBeds((prev) =>
      prev.map((b) => {
        if (b.id === toBedId) {
          return {
            ...b,
            status: 'occupied',
            patientName: fromBed.patientName,
            patientId: fromBed.patientId,
            admittedDate: fromBed.admittedDate,
            attendingDoctor: fromBed.attendingDoctor,
            notes: `Transferred from ${fromBed.bedNumber}: ${fromBed.notes || ''}`,
            oxygenSupport: fromBed.oxygenSupport,
            ventilatorSupport: fromBed.ventilatorSupport,
          };
        }
        if (b.id === fromBedId) {
          return {
            ...b,
            status: 'sanitizing',
            patientName: '',
            patientId: '',
            admittedDate: '',
            attendingDoctor: '',
            notes: `Transferred patient to bed ${toBedId}`,
          };
        }
        return b;
      })
    );
  };

  const addBed = (newBed) => {
    setBeds((prev) => [...prev, { ...newBed, id: `BED-${Date.now()}` }]);
  };

  const updateBed = (bedId, updatedBed) => {
    setBeds((prev) => prev.map((b) => (b.id === bedId ? { ...b, ...updatedBed } : b)));
  };

  const deleteBed = (bedId) => {
    setBeds((prev) => prev.filter((b) => b.id !== bedId));
  };

  // --- STAFF WORKFORCE MANAGEMENT FUNCTIONS ---
  const addStaff = (newStaff) => {
    setStaff((prev) => [
      {
        ...newStaff,
        id: `EMP-${Date.now()}`,
        empId: newStaff.empId || `LC-${newStaff.category?.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        joiningDate: newStaff.joiningDate || new Date().toISOString().split('T')[0],
      },
      ...prev,
    ]);
  };

  const updateStaff = (staffId, updatedStaff) => {
    setStaff((prev) => prev.map((s) => (s.id === staffId ? { ...s, ...updatedStaff } : s)));
  };

  const deleteStaff = (staffId) => {
    setStaff((prev) => prev.filter((s) => s.id !== staffId));
  };

  const updateStaffDutyStatus = (staffId, dutyStatus) => {
    setStaff((prev) => prev.map((s) => (s.id === staffId ? { ...s, dutyStatus } : s)));
  };

  const updateStaffShift = (staffId, shift) => {
    setStaff((prev) => prev.map((s) => (s.id === staffId ? { ...s, shift } : s)));
  };

  // Reset all data to defaults
  const resetAllData = () => {
    setHospitalInfo(defaultHospitalInfo);
    setHeroContent(defaultHeroContent);
    setWhyChooseUs(defaultWhyChooseUs);
    setDoctors(defaultDoctors);
    setServices(defaultServices);
    setBranches(defaultBranches);
    setBlogPosts(defaultBlogPosts);
    setTechnologies(defaultTechnologies);
    setAppointments([]);
    setBeds(initialBedsList);
    setWards(initialWardsList);
    setStaff(initialStaffList);
  };

  const value = {
    // Auth
    isAuthenticated,
    login,
    logout,

    // Hospital Info
    hospitalInfo,
    setHospitalInfo,

    // Hero Content
    heroContent,
    setHeroContent,

    // Why Choose Us
    whyChooseUs,
    setWhyChooseUs,

    // Doctors
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,

    // Services/Departments
    services,
    addService,
    updateService,
    deleteService,

    // Branches
    branches,
    addBranch,
    updateBranch,
    deleteBranch,

    // Blog Posts
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,

    // Technologies
    technologies,
    addTechnology,
    updateTechnology,
    deleteTechnology,

    // Appointments
    appointments,
    addAppointment,
    updateAppointmentStatus,

    // Beds Management
    beds,
    wards,
    admitPatientToBed,
    dischargePatientFromBed,
    updateBedStatus,
    transferPatientBed,
    addBed,
    updateBed,
    deleteBed,

    // Staff Management
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    updateStaffDutyStatus,
    updateStaffShift,

    // Reset
    resetAllData,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export default AdminContext;
