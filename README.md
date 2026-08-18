# Lifecare Multispeciality Hospital Portal

An enterprise-grade, modern healthcare and inpatient bed & staff management web application built with **React 19**, **Tailwind CSS 4**, and **Firebase**.

---

## 🌟 Key Features

- **Clinical Super-Specialties**: 20+ specialized clinical departments (Cardiology, Neurology, Orthopaedics, Oncology, Laparoscopic GI Surgery, General Medicine, Pediatrics, etc.).
- **Dynamic Specialist Doctor Filtering**: Real-time context-aware doctor selection according to the patient's requirement/problem area.
- **Smart Appointment System with Conflict Prevention**:
  - Live doctor time slot availability and double-booking lock.
  - Outpatient consultancy fee integration (₹500).
  - Multi-channel receipt generation: Download Slip, Print, Email dispatch, and WhatsApp sharing.
  - Unique token number generator (`LC001`, `LC002`, etc.).
- **Enterprise Bed & Ward Management ERP**:
  - Real-time tracking of 36 inpatient beds across Level-3 ICU, CCU, NICU, Deluxe Private Suites, Semi-Private, and General Wards.
  - Patient admission, bed transfer, discharge, and housekeeping sanitation workflows.
- **Healthcare Staff & Duty Roster System**:
  - Live directory of 60 healthcare staff across Doctors, ICU Nurses, OT Specialists, Radiologists, and Support Staff.
  - Real-time duty status toggle (On Duty / Off Duty / On Call / Leave).
- **Hospital Infrastructure Showcase**: 3.0T High-Field Silent MRI, 128-Slice CT, Flat-Panel Cath Lab, and Modular Class-100 Laminar OTs.
- **Cashless TPA Insurance Desk**: Integrated partner network with major national insurers (Star Health, MediAssist, ICICI Lombard, HDFC Ergo, Max Bupa, etc.).
- **Firebase Integration & CI/CD**: Firebase Hosting and Analytics configuration.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router v7, Framer Motion, Lucide React
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Backend & Cloud**: Firebase (App, Analytics, Hosting)
- **Tooling & Build**: Vite v8

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 🔥 Firebase Deployment

### Firebase Hosting
```bash
npm run build
firebase deploy --only hosting
```

---

## 🔐 Admin Panel Credentials

- **URL**: `/admin-panel-login`
- **Username**: `admin`
- **Password**: `admin123`

---

## 📄 License
MIT License
