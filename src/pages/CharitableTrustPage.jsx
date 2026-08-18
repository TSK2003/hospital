import React, { useState } from 'react';
import PageHero from '../components/common/PageHero';
import { Heart, CheckCircle, Gift, Users, Award, Send } from 'lucide-react';

const CharitableTrustPage = () => {
  const [donationAmount, setDonationAmount] = useState('2000');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donated, setDonated] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setDonated(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <PageHero
        title="Lifecare Healthcare Charitable Trust"
        subtitle="Serving Underserved Communities with Free Medical Camps, Surgery Grants, and Pediatric Care"
        breadcrumb={[{ label: 'Charitable Trust' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* About Trust Section */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
              Social Initiative
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Healing Lives Beyond Financial Barriers</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Lifecare Healthcare Charitable Trust was established in 2005 to ensure no individual is denied life-saving cardiac surgeries, pediatric oncology treatments, or emergency trauma care due to economic hardship.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Over the past two decades, our trust has subsidized over 12,000 surgeries, conducted 450+ free rural health camps, and screened 150,000+ villagers across Tamil Nadu.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"
              alt="Community Medical Camp"
              className="w-full h-80 object-cover rounded-2xl shadow-md"
            />
          </div>
        </div>

        {/* Objectives & Community Programs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <Heart className="w-8 h-8 text-red-500" />
            <h3 className="text-lg font-bold text-slate-900">Free Cardiac Surgery Grants</h3>
            <p className="text-xs text-slate-600">Subsidizing open-heart CABG and valve replacements for underprivileged children and adults.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <Users className="w-8 h-8 text-blue-600" />
            <h3 className="text-lg font-bold text-slate-900">Rural Health & Screening Camps</h3>
            <p className="text-xs text-slate-600">Conducting monthly door-step diagnostic blood pressure, ECG, and vision checkups in villages.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
            <Gift className="w-8 h-8 text-emerald-500" />
            <h3 className="text-lg font-bold text-slate-900">Free Dialysis Support</h3>
            <p className="text-xs text-slate-600">Providing free maintenance hemodialysis sessions for end-stage renal disease patients in need.</p>
          </div>
        </div>

        {/* Donation Section */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
              80G Tax Exempted Donation
            </span>
            <h2 className="text-3xl font-extrabold">Support Our Healthcare Mission</h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              100% of your voluntary donations directly sponsor life-saving pediatric surgeries and medical camps.
            </p>
          </div>

          {donated ? (
            <div className="p-8 text-center bg-white/10 backdrop-blur-md rounded-2xl max-w-md mx-auto space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">Thank You for Your Generosity!</h3>
              <p className="text-xs text-slate-300">
                Your donation of <span className="font-bold text-emerald-400">₹{donationAmount}</span> will change a patient's life. 80G tax receipt will be sent to your phone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDonate} className="max-w-xl mx-auto space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                {['1000', '2000', '5000'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDonationAmount(amt)}
                    className={`py-2.5 rounded-xl font-bold transition-all ${
                      donationAmount === amt
                        ? 'bg-emerald-500 text-white shadow-lg'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Donor Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                />
                <input
                  type="tel"
                  required
                  placeholder="+91 Mobile Number"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center space-x-2"
              >
                <Heart className="w-4 h-4" />
                <span>Donate ₹{donationAmount} Now</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default CharitableTrustPage;
