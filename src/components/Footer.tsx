import React, { useState } from 'react';
import { ShieldCheck, Truck, Sparkles, Mail, CheckCircle2, Flame, Heart } from 'lucide-react';
import { soundFX } from '../utils/audio';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFX.playPop();
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0F172A] border-t border-slate-800 text-slate-400 text-xs">
      
      {/* Newsletter Bento Box */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-400 font-black italic uppercase text-lg">
                <Flame className="w-5 h-5 text-red-500 fill-red-500" />
                <span>JOIN THE WEDNESDAY NCBD PULL ALERTS</span>
              </div>
              <p className="text-xs text-slate-300 font-normal">
                Get first-look alerts for ratio variants, 1:100 incentives, and convention exclusives before they sell out.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-green-400 font-bold text-xs bg-green-500/10 border border-green-500/30 px-5 py-2.5 rounded-full">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're subscribed to Wednesday drops!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto max-w-md">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs active:scale-95 transition-all shadow-md shadow-yellow-400/20"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-3 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-yellow-400 flex items-center justify-center font-black text-xl text-black">
              N
            </div>
            <span className="font-black italic uppercase text-lg text-white tracking-wider">
              NEXUS <span className="text-yellow-400">COMICS</span>
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            The premier universe for comic collectors, weekly pull lists, graded slabs, digital previews, and graphic novel connoisseurs.
          </p>
          <div className="text-[10px] text-slate-500 font-mono">
            Diamond Retailer Code: #US-884920
          </div>
        </div>

        {/* Col 2: Publishers */}
        <div className="space-y-2">
          <h4 className="font-black text-white uppercase text-xs tracking-wider">Publishers & Imprints</h4>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Marvel Comics</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">DC Comics / Black Label</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Image Comics</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Dark Horse Comics</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Kodansha / Shonen Jump</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Indie Creator-Owned</a></li>
          </ul>
        </div>

        {/* Col 3: Collector Tools */}
        <div className="space-y-2">
          <h4 className="font-black text-white uppercase text-xs tracking-wider">Collector Hub</h4>
          <ul className="space-y-1.5 text-xs">
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Weekly NCBD Pullbox</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">My Slab Vault Portfolio</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Live Grail Auctions</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">10-Point CGC Grading Lab</a></li>
            <li><a href="#" className="hover:text-yellow-400 transition-colors">Reading Timelines & Arcs</a></li>
          </ul>
        </div>

        {/* Col 4: Guarantee */}
        <div className="space-y-2">
          <h4 className="font-black text-white uppercase text-xs tracking-wider">The Nexus Guarantee</h4>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Every raw issue arrives individually enclosed in 2-mil archival polypropylene bag with acid-free backing board.
          </p>
          <div className="pt-2 flex items-center gap-2 text-yellow-400 font-bold text-[11px]">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span>100% Gem-Mint Arrival Protection</span>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80 bg-[#0B1120] py-4 text-center text-[10px] text-slate-500 font-mono">
        © {new Date().getFullYear()} Nexus Comics E-Commerce & Collector Hub. All characters, logos, and art are properties of their respective publishers.
      </div>
    </footer>
  );
};
