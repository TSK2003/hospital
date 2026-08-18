import React from 'react';
import PageHero from '../../components/common/PageHero';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "S. Murugan",
    location: "Chennai",
    department: "Cardiology",
    procedure: "Primary Angioplasty (PTCA)",
    rating: 5,
    story: "When I suffered a massive heart attack at midnight, Lifecare's emergency ambulance arrived in 10 minutes. Dr. Rajeshwar performed balloon angioplasty within 40 minutes. I was discharged in 3 days feeling completely healthy!"
  },
  {
    name: "K. Parvathi",
    location: "Madurai",
    department: "Orthopaedics",
    procedure: "Robotic Total Knee Replacement",
    rating: 5,
    story: "For 8 years I couldn't walk up stairs without severe knee pain. Dr. Balaji suggested robotic surgery. The alignment was so perfect that I walked independently on day 2 without support!"
  },
  {
    name: "R. Mohamed Ismail",
    location: "Tirunelveli",
    department: "Nephrology",
    procedure: "Renal Dialysis Care",
    rating: 5,
    story: "The Dialysis Suite is world-class. Extremely hygienic, equipped with individual TVs, and the nursing team is incredibly warm and vigilant."
  },
  {
    name: "Anitha Vijay",
    location: "Coimbatore",
    department: "Obstetrics & Gynaecology",
    procedure: "Painless Epidural Delivery",
    rating: 5,
    story: "Delivering my baby in the LDR Birthing Suite was a serene, pain-free experience thanks to Dr. Lakshmi Senthil and the anesthesia team."
  }
];

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Patient Testimonials & Healing Stories"
        subtitle="Real Stories of Hope, Miracle Recovery, and Life Saved"
        breadcrumb={[{ label: 'About', path: '/about/overview' }, { label: 'Testimonials' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-4 relative">
            <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6" />
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(t.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs text-slate-700 leading-relaxed italic">"{t.story}"</p>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-base font-bold text-slate-900">{t.name} <span className="text-xs text-slate-400">({t.location})</span></h4>
              <span className="text-xs font-semibold text-blue-600">{t.procedure} — {t.department}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsPage;
