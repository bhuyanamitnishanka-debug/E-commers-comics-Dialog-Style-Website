import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, ShieldCheck, Flame, ArrowRight, TrendingUp, Award, Clock, Users, BookOpen } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface HeroBannerProps {
  onExploreClick: () => void;
  onPullboxClick: () => void;
  onAuctionsClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onPullboxClick,
  onAuctionsClick
}) => {
  // Live countdown timer for the featured drop
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 32 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative bg-[#0F172A] border-b border-slate-800 py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* Tile 1: Featured Release Hero Tile (Large Bento Card - spans 7 cols on desktop) */}
          <div className="lg:col-span-7 bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl">
            {/* Background Graphic Accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-indigo-950/80 to-transparent pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              {/* Drop Header Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-widest flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  NCBD DROP
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1.5 font-mono bg-slate-900/80 px-3 py-1 rounded-full border border-slate-700">
                  <Clock className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Drop in {timeLeft.minutes}m {timeLeft.seconds.toString().padStart(2, '0')}s</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase text-white leading-none tracking-tight">
                  ULTIMATE <span className="text-yellow-400">SPIDER-MAN #1</span>
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-2">
                  Jonathan Hickman & Marco Checchetto • 1:100 Virgin Foil Variant
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed font-normal">
                The universe that changed comic history returns with a mature Peter Parker. Certified 9.8 Pre-orders and raw single issues include complimentary archival bags and boards.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-6 mt-4 border-t border-slate-700/60">
              <button
                onClick={() => { soundFX.playPop(); onExploreClick(); }}
                className="bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-3 rounded-full font-black uppercase text-xs sm:text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all group"
              >
                <span>EXPLORE ALL COMICS</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => { soundFX.playPop(); onPullboxClick(); }}
                className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white px-5 py-3 rounded-full font-bold uppercase text-xs tracking-wider border border-slate-700 flex items-center gap-2 transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                <span>START PULLBOX</span>
              </button>
            </div>
          </div>

          {/* Tile 2: Market Pulse Analytics Tile (spans 5 cols on desktop) */}
          <div className="lg:col-span-5 bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                  <span>Market Pulse</span>
                </span>
                <span className="text-xs text-green-400 font-mono font-bold bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span>+14.2%</span>
                  <span>▲ Trending High</span>
                </span>
              </div>

              {/* Pulse Mini Chart Bars */}
              <div className="mt-4 flex items-end gap-1.5 h-16 w-full pt-2">
                {[35, 45, 30, 60, 75, 50, 65, 80, 95, 70, 85, 100].map((h, idx) => (
                  <div key={idx} className="flex-1 bg-slate-800 rounded-t overflow-hidden h-full flex items-end">
                    <div 
                      className={`w-full transition-all duration-500 ${
                        idx >= 8 ? 'bg-yellow-400' : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                      style={{ height: `${h}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Metric Bento Chips */}
            <div className="grid grid-cols-3 gap-2.5 mt-5">
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Vintage</span>
                <span className="text-sm font-mono font-bold text-white mt-0.5 block">+8.4%</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Modern</span>
                <span className="text-sm font-mono font-bold text-green-400 mt-0.5 block">+22.1%</span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 text-center">
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Keys</span>
                <span className="text-sm font-mono font-bold text-yellow-400 mt-0.5 block">+4.8%</span>
              </div>
            </div>
          </div>

          {/* Tile 3: Punchy Highlight Tile (Yellow accent - spans 3 cols) */}
          <div 
            onClick={() => { soundFX.playPop(); onExploreClick(); }}
            className="lg:col-span-3 bg-yellow-400 text-black rounded-3xl p-6 flex flex-col justify-between shadow-xl cursor-pointer hover:bg-yellow-300 transition-all group"
          >
            <div>
              <span className="text-xs font-black uppercase tracking-wider opacity-80 block">NCBD DROP RADAR</span>
              <div className="text-4xl sm:text-5xl font-black italic tracking-tighter mt-1">24</div>
              <p className="font-bold text-xs uppercase tracking-tight mt-1">New Exclusive Variants Today</p>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs font-black uppercase">
              <span>View All Drops</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Tile 4: Weekly Pullbox Status Tile (spans 3 cols) */}
          <div 
            onClick={() => { soundFX.playPop(); onPullboxClick(); }}
            className="lg:col-span-3 bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between shadow-xl cursor-pointer hover:border-yellow-400 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Pullbox Hub</span>
                </span>
                <span className="text-green-400 text-[10px] font-mono">● LIVE</span>
              </div>
              <div className="text-2xl font-black italic uppercase text-white mt-2">
                Automated Pulls
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Never miss an issue. Free 20% discount on ongoing series.
              </p>
            </div>

            <div className="mt-4">
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                <div className="bg-yellow-400 h-full rounded-full w-3/4" />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5 font-semibold">
                <span>Next Pull: Wednesday</span>
                <span className="text-yellow-400">Manage ➔</span>
              </div>
            </div>
          </div>

          {/* Tile 5: Live Grail Watchlist / Auctions (spans 3 cols) */}
          <div 
            onClick={() => { soundFX.playPop(); onAuctionsClick(); }}
            className="lg:col-span-3 bg-[#171717] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between shadow-xl cursor-pointer hover:border-red-500 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>Grail Watchlist</span>
                </span>
                <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">LIVE</span>
              </div>

              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                  <span className="text-slate-300 font-medium truncate">Spawn #1 CGC 9.8</span>
                  <span className="font-mono font-bold text-white shrink-0 ml-2">$340</span>
                </div>
                <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                  <span className="text-slate-300 font-medium truncate">TMNT #1 1st Print</span>
                  <span className="font-mono font-bold text-yellow-400 shrink-0 ml-2">$4,250</span>
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-red-400 font-bold uppercase">
              <span>Enter Auction Floor</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tile 6: Creator Spotlight / Eisner Award (spans 3 cols) */}
          <div className="lg:col-span-3 bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-700/80 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Creator Spotlight</span>
                <span className="bg-yellow-400/20 text-yellow-400 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  <span>Eisner Winner</span>
                </span>
              </div>
              <h3 className="text-lg font-black uppercase italic text-white mt-2">
                Peach Momoko
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Demon Days, Ultimate X-Men Watercolor Variants
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800">
              <div className="text-[10px] text-slate-400">
                <span className="font-bold text-white">48</span> Works in Vault
              </div>
              <button
                onClick={() => { soundFX.playPop(); onExploreClick(); }}
                className="text-[10px] font-bold uppercase text-yellow-400 hover:underline"
              >
                Filter Artist ➔
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

