import React from 'react';
import PageHero from '../../components/common/PageHero';

const galleryImages = [
  { url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80", title: "Hospital Main Entrance" },
  { url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80", title: "Modular Laminar Operation Theatre" },
  { url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80", title: "3T Silent MRI Suite" },
  { url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80", title: "Cardiac Intensive Care Unit" },
  { url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80", title: "Executive Health Check Lounge" },
  { url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80", title: "24/7 Level-1 Trauma Bay" }
];

const GalleryPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Hospital Infrastructure Photo Gallery"
        subtitle="Explore Our World-Class Operating Theatres, ICUs, and Diagnostic Suites"
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'Gallery' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryImages.map((img, idx) => (
          <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group">
            <img src={img.url} alt={img.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="p-4 bg-white">
              <h4 className="text-sm font-bold text-slate-800">{img.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
