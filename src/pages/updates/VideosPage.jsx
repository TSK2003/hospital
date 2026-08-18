import React from 'react';
import PageHero from '../../components/common/PageHero';
import { videoLibrary } from '../../data/updatesData';

const VideosPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Recent Hospital Videos & Virtual Tours"
        subtitle="Watch Surgeries, Patient Stories, and Facility Walkthroughs"
        breadcrumb={[{ label: 'Updates', path: '/updates/hospital-updates' }, { label: 'Videos' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {videoLibrary.map((vid) => (
          <div key={vid.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-4 space-y-3">
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900">
              <iframe
                className="w-full h-full"
                src={vid.videoUrl}
                title={vid.title}
                allowFullScreen
              ></iframe>
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase">{vid.category}</span>
              <h3 className="text-base font-bold text-slate-900">{vid.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;
