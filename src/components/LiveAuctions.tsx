import React, { useState, useEffect } from 'react';
import { 
  Gavel, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { AuctionItem } from '../types/comic';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';

interface LiveAuctionsProps {
  auctions: AuctionItem[];
  onPlaceBid: (auctionId: string, amount: number, bidderName: string) => void;
  onBuyItNow: (auction: AuctionItem) => void;
}

export const LiveAuctions: React.FC<LiveAuctionsProps> = ({
  auctions,
  onPlaceBid,
  onBuyItNow
}) => {
  const [selectedAuction, setSelectedAuction] = useState<AuctionItem | null>(auctions[0] || null);
  const [customBidAmount, setCustomBidAmount] = useState<string>('');
  const [bidderName] = useState('NexusCollector_99');
  const [timeLeftStr, setTimeLeftStr] = useState<Record<string, string>>({});

  // Countdown timer effect
  useEffect(() => {
    const updateTimes = () => {
      const updated: Record<string, string> = {};
      auctions.forEach(auc => {
        const diff = new Date(auc.endTime).getTime() - Date.now();
        if (diff <= 0) {
          updated[auc.id] = 'Auction Ended';
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diff % (1000 * 60)) / 1000);
          updated[auc.id] = `${hours}h ${mins}m ${secs}s`;
        }
      });
      setTimeLeftStr(updated);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [auctions]);

  const activeAuction = selectedAuction || auctions[0];

  const handleQuickBid = (increment: number) => {
    if (!activeAuction) return;
    const nextAmount = activeAuction.currentBid + increment;
    soundFX.playGavel();
    onPlaceBid(activeAuction.id, nextAmount, bidderName);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    } catch {}
  };

  const handleCustomBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAuction) return;
    const amount = parseFloat(customBidAmount);
    if (isNaN(amount) || amount <= activeAuction.currentBid) {
      return;
    }
    soundFX.playGavel();
    onPlaceBid(activeAuction.id, amount, bidderName);
    setCustomBidAmount('');
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } catch {}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Card */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 animate-pulse text-red-400" />
            <span>High-Stakes Comic Key Grails Live Bidding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
            LIVE GRAIL <span className="text-yellow-400">AUCTIONS & DROPS</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
            Bid in real-time on certified Golden, Silver, and Modern Age comic grails with 100% authenticity inspection and sniper bid protection.
          </p>
        </div>
      </div>

      {/* Main Auction Showcase */}
      {activeAuction && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Spotlight Item Slab */}
          <div className="lg:col-span-6 bg-[#1E293B] rounded-3xl border border-slate-700 p-6 flex flex-col items-center justify-between shadow-2xl">
            
            {/* Top Slab Bar */}
            <div className="w-full max-w-sm bg-yellow-400 rounded-t-2xl p-3 flex items-center justify-between text-black font-black">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-comic text-lg">CGC {activeAuction.cgcGrade}</span>
              </div>
              <div className="text-right text-[10px] font-mono font-bold">
                #{activeAuction.cgcCertNumber}
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative w-full max-w-sm aspect-[2/3] overflow-hidden rounded-b-2xl bg-slate-950 border-x-2 border-b-2 border-slate-700">
              <img 
                src={activeAuction.coverImage} 
                alt={activeAuction.title} 
                className="w-full h-full object-cover"
              />
              
              {/* Countdown overlay badge */}
              <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md border border-red-500/50 text-white px-3 py-1 rounded-full flex items-center gap-2 text-xs font-mono font-bold shadow-lg">
                <Clock className="w-3.5 h-3.5 text-red-400 animate-spin" />
                <span>{timeLeftStr[activeAuction.id] || 'Ending Soon'}</span>
              </div>
            </div>

            {/* Key info note */}
            <div className="mt-4 w-full max-w-sm bg-red-500/10 border border-red-500/30 rounded-2xl p-3 text-xs text-red-300 font-semibold">
              ⭐ {activeAuction.keySignificance}
            </div>

          </div>

          {/* Right Column: Bidding Controls & Live Bid Feed */}
          <div className="lg:col-span-6 bg-[#1E293B] rounded-3xl border border-slate-700 p-6 flex flex-col justify-between space-y-6 shadow-2xl">
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider bg-red-600 text-white px-2.5 py-0.5 rounded">
                  {activeAuction.publisher}
                </span>
                <span className="text-xs font-mono text-green-400 bg-green-950/60 px-2.5 py-0.5 rounded-full border border-green-800/50 font-bold">
                  {activeAuction.bidCount} Bids Placed
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-tight">
                {activeAuction.title}
              </h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Condition: {activeAuction.conditionDescription}
              </p>
            </div>

            {/* Current Price / Bid Display */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Current High Bid</span>
                  <span className="text-3xl sm:text-4xl font-black text-yellow-400 font-mono">
                    ${activeAuction.currentBid.toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Est. Market Value</span>
                  <span className="text-lg font-bold text-slate-300 font-mono">
                    ${activeAuction.estimatedValue.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Quick Increment Bids */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Quick Bid Increments:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[50, 100, 250].map((inc) => (
                    <button
                      key={inc}
                      onClick={() => handleQuickBid(inc)}
                      className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold rounded-xl text-xs flex items-center justify-center gap-1 border border-slate-700 active:scale-95 transition-all"
                    >
                      <Gavel className="w-3.5 h-3.5 text-yellow-400" />
                      <span>+${inc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Bid Form */}
              <form onSubmit={handleCustomBid} className="flex gap-2 pt-1">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-mono font-bold">$</span>
                  <input
                    type="number"
                    step="1"
                    value={customBidAmount}
                    onChange={(e) => setCustomBidAmount(e.target.value)}
                    placeholder={`Enter > $${activeAuction.currentBid}`}
                    className="w-full bg-slate-950 border border-slate-700 rounded-full pl-8 pr-3 py-2 text-xs text-white font-mono focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase rounded-full text-xs active:scale-95 transition-all shadow-lg shadow-yellow-400/20"
                >
                  PLACE BID
                </button>
              </form>

              {/* Buy It Now Option */}
              {activeAuction.buyItNowPrice && (
                <div className="pt-2">
                  <button
                    onClick={() => { soundFX.playCoin(); onBuyItNow(activeAuction); }}
                    className="w-full py-3 bg-green-500/20 hover:bg-green-500/30 text-green-300 font-bold rounded-full text-xs border border-green-500/50 flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Instant Buy-It-Now for</span>
                    <span className="font-mono text-sm font-black">${activeAuction.buyItNowPrice.toFixed(2)}</span>
                  </button>
                </div>
              )}
            </div>

            {/* Live Bid History Log */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Live Bid Activity:
              </span>
              <div className="space-y-1.5 max-h-32 overflow-y-auto bg-slate-900/90 p-3 rounded-2xl border border-slate-700/80">
                {activeAuction.bids.map((b) => (
                  <div key={b.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-800 last:border-0">
                    <div className="flex items-center gap-2">
                      <span>{b.bidderAvatar}</span>
                      <span className="font-semibold text-white font-mono">{b.bidderName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-yellow-400 font-mono font-bold">${b.amount.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-500">{b.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Other Live Auctions Carousel / List */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-black italic uppercase text-white tracking-wide">
          MORE ACTIVE <span className="text-yellow-400">GRAIL AUCTIONS</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {auctions.map((auc) => {
            const isSelected = activeAuction?.id === auc.id;
            return (
              <div
                key={auc.id}
                onClick={() => { soundFX.playPop(); setSelectedAuction(auc); }}
                className={`p-4 rounded-3xl bg-[#1E293B] border transition-all cursor-pointer flex gap-4 ${
                  isSelected ? 'border-yellow-400 shadow-xl' : 'border-slate-700/80 hover:border-slate-600'
                }`}
              >
                <img src={auc.coverImage} alt={auc.title} className="w-16 aspect-[2/3] object-cover rounded-2xl border border-slate-700 shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-yellow-400 font-bold">CGC {auc.cgcGrade}</span>
                    <span className="text-[10px] font-mono text-red-400 font-bold">{timeLeftStr[auc.id] || 'Live'}</span>
                  </div>
                  <h4 className="font-bold text-xs text-white line-clamp-1">{auc.title}</h4>
                  <div className="text-sm font-black text-yellow-400 font-mono mt-1">
                    ${auc.currentBid.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {auc.bidCount} bids placed
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

