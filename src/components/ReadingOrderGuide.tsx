import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle, 
  Circle, 
  ShoppingBag, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { StorylineEvent, ReadingOrderItem } from '../types/comic';
import { soundFX } from '../utils/audio';

interface ReadingOrderGuideProps {
  storylines: StorylineEvent[];
  onAddIssueToCart: (item: ReadingOrderItem) => void;
  onAddFullStorylineToCart: (storyline: StorylineEvent) => void;
}

export const ReadingOrderGuide: React.FC<ReadingOrderGuideProps> = ({
  storylines,
  onAddIssueToCart,
  onAddFullStorylineToCart
}) => {
  const [selectedStoryline, setSelectedStoryline] = useState<StorylineEvent>(storylines[0]);
  const [readIssues, setReadIssues] = useState<Record<string, boolean>>({});

  const toggleRead = (issueId: string) => {
    soundFX.playPop();
    setReadIssues(prev => ({
      ...prev,
      [issueId]: !prev[issueId]
    }));
  };

  const totalArcCost = selectedStoryline.issues.reduce((sum, item) => sum + item.price, 0);
  const bundleCost = totalArcCost * 0.85; // 15% bundle discount

  const readCount = selectedStoryline.issues.filter(i => readIssues[i.comicId]).length;
  const progressPct = (readCount / selectedStoryline.issues.length) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bento Card */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Interactive Storyline Timelines & Reading Orders</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
            READING ROADMAPS & <span className="text-yellow-400">EVENT ARCS</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
            Never get lost in comic continuity. Follow complete chronological reading checklists, track your reading progress, and bundle full story runs in one click.
          </p>
        </div>

        {/* Storyline Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-700/60">
          {storylines.map((st) => {
            const isSelected = selectedStoryline.id === st.id;
            return (
              <button
                key={st.id}
                onClick={() => { soundFX.playPop(); setSelectedStoryline(st); }}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                  isSelected 
                    ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/20' 
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-700'
                }`}
              >
                {st.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Storyline Hero & Progress */}
      <div className="bg-[#1E293B] rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                {selectedStoryline.publisher}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {selectedStoryline.year} Event • {selectedStoryline.totalIssues} Issues
              </span>
            </div>
            <h2 className="text-2xl font-black italic uppercase text-white tracking-wide">
              {selectedStoryline.name}
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl font-normal leading-relaxed">
              {selectedStoryline.description}
            </p>
          </div>

          {/* Bundle Add to Cart */}
          <div className="bg-slate-900 p-4 rounded-3xl border border-slate-700 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Full Arc Bundle (-15%)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-black text-yellow-400 font-mono">${bundleCost.toFixed(2)}</span>
                <span className="text-xs text-slate-500 line-through font-mono">${totalArcCost.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => { soundFX.playCoin(); onAddFullStorylineToCart(selectedStoryline); }}
              className="px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md shadow-yellow-400/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>BUY FULL ARC</span>
            </button>
          </div>
        </div>

        {/* Reading Progress Bar */}
        <div className="space-y-1.5 pt-2 border-t border-slate-700/60">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold uppercase tracking-wide">Your Reading Completion:</span>
            <span className="font-mono text-yellow-400 font-bold">{readCount} of {selectedStoryline.issues.length} issues read ({progressPct.toFixed(0)}%)</span>
          </div>
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Chronological Issues Step by Step */}
        <div className="space-y-3 pt-4">
          <h3 className="text-sm font-black italic uppercase text-white tracking-wider">
            Chronological Reading Steps:
          </h3>

          <div className="space-y-3">
            {selectedStoryline.issues.map((issue) => {
              const isRead = !!readIssues[issue.comicId];
              return (
                <div
                  key={issue.comicId}
                  className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isRead ? 'bg-slate-900/60 border-slate-800 opacity-75' : 'bg-slate-900 border-slate-700/80 hover:border-yellow-400/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Read status toggle button */}
                    <button
                      onClick={() => toggleRead(issue.comicId)}
                      title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                      className="p-1 text-slate-400 hover:text-yellow-400 transition-colors"
                    >
                      {isRead ? (
                        <CheckCircle className="w-5 h-5 text-green-400 fill-green-400/20" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    {/* Step indicator */}
                    <div className="w-7 h-7 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {issue.step}
                    </div>

                    <img 
                      src={issue.coverImage} 
                      alt={issue.title} 
                      className="w-12 aspect-[2/3] object-cover rounded-xl border border-slate-700 shrink-0" 
                    />

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold text-sm text-white ${isRead ? 'line-through text-slate-400' : ''}`}>
                          {issue.title}
                        </h4>
                        {issue.isCore && (
                          <span className="bg-red-500/20 text-red-400 border border-red-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase">
                            CORE KEY
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{issue.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="font-mono text-sm font-black text-white">${issue.price.toFixed(2)}</span>
                    <button
                      onClick={() => { soundFX.playCoin(); onAddIssueToCart(issue); }}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded-full border border-slate-700 flex items-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Add Issue</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
