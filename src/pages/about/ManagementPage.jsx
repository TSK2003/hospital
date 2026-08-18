import React from 'react';
import PageHero from '../../components/common/PageHero';

const leaders = [
  {
    name: "Dr. K. Swaminathan",
    role: "Founder & Managing Director",
    img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80",
    bio: "Eminent medical visionary who founded Lifecare Hospital with the commitment to provide affordable super specialty care."
  },
  {
    name: "Dr. Sheila Swaminathan",
    role: "Executive Director & Medical Superintendent",
    img: "https://images.unsplash.com/photo-1594824813566-88855ce783d1?auto=format&fit=crop&w=800&q=80",
    bio: "Overlooks hospital operations, clinical quality standards, NABH compliance, and patient welfare."
  },
  {
    name: "Mr. S. Ramesh",
    role: "Chief Operating Officer (COO)",
    img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    bio: "Drives strategic expansion, international outreach, TPA insurance desks, and health center branches."
  }
];

const ManagementPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Hospital Management & Leadership"
        subtitle="Guided by Experienced Healthcare Pioneers & Administrators"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Management' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {leaders.map((leader, idx) => (
          <div key={idx} className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm p-6 space-y-4 text-center">
            <img src={leader.img} alt={leader.name} className="w-32 h-32 rounded-full object-cover mx-auto shadow-md border-4 border-blue-50" />
            <div>
              <h3 className="text-xl font-bold text-slate-900">{leader.name}</h3>
              <span className="text-xs font-semibold text-blue-600">{leader.role}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagementPage;
