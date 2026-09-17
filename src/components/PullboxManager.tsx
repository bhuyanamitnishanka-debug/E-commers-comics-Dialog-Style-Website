import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Trash2, 
  PauseCircle, 
  PlayCircle, 
  Sparkles, 
  Package, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { PullSubscription, Comic } from '../types/comic';
import { soundFX } from '../utils/audio';

interface PullboxManagerProps {
  subscriptions: PullSubscription[];
  onAddSubscription: (sub: PullSubscription) => void;
  onRemoveSubscription: (id: string) => void;
  onTogglePause: (id: string) => void;
  availableComics: Comic[];
  onOpenComic: (comic: Comic) => void;
}

export const PullboxManager: React.FC<PullboxManagerProps> = ({
  subscriptions,
  onAddSubscription,
  onRemoveSubscription,
  onTogglePause,
  availableComics,
  onOpenComic
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedComicId, setSelectedComicId] = useState(availableComics[0]?.id || '');
  const [coverPreference, setCoverPreference] = useState<'Cover A (Standard)' | 'All Incentive Variants (1:25+)' | 'Foil Only' | 'Blank Sketch Variant'>('Cover A (Standard)');
  const [frequency, setFrequency] = useState<'Weekly' | 'Bi-Weekly' | 'Monthly Box'>('Monthly Box');

  const activeSubs = subscriptions.filter(s => s.status === 'Active');
  const estimatedMonthly = activeSubs.reduce((sum, s) => sum + s.estimatedPrice * (s.frequency === 'Weekly' ? 4 : s.frequency === 'Bi-Weekly' ? 2 : 1), 0);

  const handleAddNew = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playPop();
    const comic = availableComics.find(c => c.id === selectedComicId);
    if (!comic) return;

    const newSub: PullSubscription = {
      id: `sub-${Date.now()}`,
      seriesName: comic.series || comic.title,
      publisher: comic.publisher,
      coverPreference: coverPreference,
      frequency: frequency,
      addedDate: new Date().toISOString().split('T')[0],
      nextIssue: `Issue #${parseInt(comic.issueNumber.replace('#', '') || '1') + 1}`,
      nextReleaseDate: 'Wednesday (NCBD)',
      estimatedPrice: comic.price,
      coverImage: comic.coverImage,
      bagAndBoardAlways: true,
      status: 'Active'
    };

    onAddSubscription(newSub);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner Bento Card */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Automated Pullbox Subscription Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
              YOUR WEEKLY <span className="text-yellow-400">PULL LIST</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Never miss New Comic Book Day! Subscribe to ongoing runs, auto-reserve ratio variants, and receive them bagged, boarded, and mint-boxed on your schedule.
            </p>
          </div>

          {/* Quick Stat Card */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 flex items-center gap-6 backdrop-blur-md shadow-xl">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Active Series</span>
              <span className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono">{activeSubs.length}</span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Est. Monthly</span>
              <span className="text-2xl sm:text-3xl font-black text-green-400 font-mono">${estimatedMonthly.toFixed(2)}</span>
            </div>
            <button
              onClick={() => { soundFX.playPop(); setShowAddModal(true); }}
              className="px-5 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center gap-1.5 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>ADD SERIES</span>
            </button>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-700/60 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">15% Subscriber Discount on all Pulls</span>
          </div>
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">100% Free 2-Mil Acid Free Bag & Board</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-green-400" />
            <span className="font-semibold">Free shipping on Monthly Consolidated Box</span>
          </div>
        </div>
      </div>

      {/* Subscription List Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black italic uppercase text-white tracking-wide flex items-center gap-2">
            <span>MY SUBSCRIBED TITLES</span>
            <span className="text-xs font-mono bg-slate-900 border border-slate-700 text-slate-300 px-2.5 py-0.5 rounded-full font-bold">
              {subscriptions.length} Titles
            </span>
          </h2>

          <span className="text-xs text-slate-400 font-mono font-semibold">
            Next NCBD Drop: <span className="text-yellow-400 font-bold">This Wednesday 9:00 AM EST</span>
          </span>
        </div>

        {subscriptions.length === 0 ? (
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-900 text-slate-400 mx-auto flex items-center justify-center border border-slate-700">
              <Calendar className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-black uppercase italic text-white">Your Pullbox is Empty</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Subscribe to ongoing comic runs like Ultimate Spider-Man, Batman, or Uncanny X-Men to reserve your copies before they sell out on New Comic Book Day.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-yellow-400 text-black font-black uppercase tracking-wider rounded-full text-xs inline-flex items-center gap-2 shadow-lg shadow-yellow-400/20"
            >
              <Plus className="w-4 h-4" />
              ADD YOUR FIRST SERIES
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {subscriptions.map((sub) => {
              const isPaused = sub.status === 'Paused';
              return (
                <div 
                  key={sub.id}
                  className={`relative rounded-3xl bg-[#1E293B] border transition-all p-4 flex flex-col justify-between space-y-4 ${
                    isPaused ? 'border-slate-700 opacity-60' : 'border-slate-700/80 hover:border-yellow-400/70 shadow-xl'
                  }`}
                >
                  <div className="flex gap-3">
                    <img 
                      src={sub.coverImage} 
                      alt={sub.seriesName} 
                      className="w-20 aspect-[2/3] object-cover rounded-2xl border border-slate-700 shadow" 
                    />
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.2 rounded">
                          {sub.publisher}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                          isPaused ? 'bg-slate-900 text-slate-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {sub.status}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-white line-clamp-1">
                        {sub.seriesName}
                      </h3>

                      <div className="text-[11px] text-yellow-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Next: {sub.nextIssue}</span>
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono">
                        Frequency: <span className="text-slate-200 font-semibold">{sub.frequency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Preference and status */}
                  <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-700/80 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Cover Rule:</span>
                      <span className="text-white font-semibold">{sub.coverPreference}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Est. Issue Price:</span>
                      <span className="text-green-400 font-mono font-bold">${sub.estimatedPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                    <button
                      onClick={() => { soundFX.playPop(); onTogglePause(sub.id); }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                        isPaused ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                      }`}
                    >
                      {isPaused ? <PlayCircle className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5 text-yellow-400" />}
                      <span>{isPaused ? 'Resume Pull' : 'Pause Pull'}</span>
                    </button>

                    <button
                      onClick={() => { soundFX.playPop(); onRemoveSubscription(sub.id); }}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-900 border border-transparent hover:border-slate-700 transition-colors"
                      title="Unsubscribe from series"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Series Subscription Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-6 sm:p-7 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-2xl font-black italic uppercase text-white tracking-wide">
              SUBSCRIBE TO <span className="text-yellow-400">ONGOING SERIES</span>
            </h3>

            <form onSubmit={handleAddNew} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Select Series:
                </label>
                <select
                  value={selectedComicId}
                  onChange={(e) => setSelectedComicId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-2.5 text-xs text-white focus:border-yellow-400"
                >
                  {availableComics.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.series || c.title} ({c.publisher}) — ${c.price.toFixed(2)}/issue
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Cover Art Priority Rule:
                </label>
                <select
                  value={coverPreference}
                  onChange={(e) => setCoverPreference(e.target.value as typeof coverPreference)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-2.5 text-xs text-white focus:border-yellow-400"
                >
                  <option value="Cover A (Standard)">Cover A (Main Standard Art)</option>
                  <option value="All Incentive Variants (1:25+)">All 1:25+ Retailer Incentive Variants</option>
                  <option value="Foil Only">Chromium / Foil Variants Only</option>
                  <option value="Blank Sketch Variant">Blank Sketch Covers Only</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Shipment Schedule:
                </label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as typeof frequency)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-2.5 text-xs text-white focus:border-yellow-400"
                >
                  <option value="Monthly Box">Monthly Consolidated Box (Free Shipping)</option>
                  <option value="Bi-Weekly">Bi-Weekly Shipments</option>
                  <option value="Weekly">Weekly (Ship Immediately Every NCBD Wednesday)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-900 text-slate-300 rounded-full text-xs font-bold uppercase hover:bg-slate-800 border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-xs rounded-full shadow-lg shadow-yellow-400/20"
                >
                  CONFIRM PULLBOX
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

