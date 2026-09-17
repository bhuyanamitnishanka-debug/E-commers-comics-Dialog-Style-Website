import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Award, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  TrendingUp,
  RotateCcw
} from 'lucide-react';
import { GRADING_TIERS } from '../data/comicsData';
import { soundFX } from '../utils/audio';

export const GradingSimulator: React.FC = () => {
  // Defect slider states
  const [spineTicks, setSpineTicks] = useState(0); // 0 to 10
  const [colorBreakCreases, setColorBreakCreases] = useState(0); // 0 to 5
  const [cornerWear, setCornerWear] = useState<'sharp' | 'slight_blunt' | 'creased' | 'chipped'>('sharp');
  const [stapleCondition, setStapleCondition] = useState<'clean' | 'slight_rust' | 'popped'>('clean');
  const [pageQuality, setPageQuality] = useState<'white' | 'off_white' | 'cream' | 'tan'>('white');
  const [coverGloss, setCoverGloss] = useState<'high_reflective' | 'moderate' | 'dull'>('high_reflective');

  // Compute calculated grade
  const calculateGrade = () => {
    let score = 10.0;

    // Spine ticks deduction
    if (spineTicks === 1) score -= 0.2;
    else if (spineTicks === 2) score -= 0.4;
    else if (spineTicks >= 3 && spineTicks <= 5) score -= 1.0;
    else if (spineTicks > 5) score -= 2.0;

    // Color break
    if (colorBreakCreases === 1) score -= 0.6;
    else if (colorBreakCreases >= 2) score -= 1.8;

    // Corner wear
    if (cornerWear === 'slight_blunt') score -= 0.2;
    else if (cornerWear === 'creased') score -= 1.0;
    else if (cornerWear === 'chipped') score -= 1.8;

    // Staple condition
    if (stapleCondition === 'slight_rust') score -= 0.8;
    else if (stapleCondition === 'popped') score -= 2.5;

    // Page quality
    if (pageQuality === 'off_white') score -= 0.2;
    else if (pageQuality === 'cream') score -= 0.8;
    else if (pageQuality === 'tan') score -= 1.8;

    // Gloss
    if (coverGloss === 'moderate') score -= 0.4;
    else if (coverGloss === 'dull') score -= 1.2;

    const finalGrade = Math.max(1.0, Math.min(10.0, score));
    // Round to nearest standard CGC half-grade or decimal
    if (finalGrade >= 9.8) return 9.8;
    if (finalGrade >= 9.6) return 9.6;
    if (finalGrade >= 9.4) return 9.4;
    if (finalGrade >= 9.2) return 9.2;
    if (finalGrade >= 9.0) return 9.0;
    if (finalGrade >= 8.5) return 8.5;
    if (finalGrade >= 8.0) return 8.0;
    if (finalGrade >= 7.0) return 7.0;
    if (finalGrade >= 6.0) return 6.0;
    if (finalGrade >= 4.0) return 4.0;
    return 2.0;
  };

  const calculatedGrade = calculateGrade();
  const matchedTier = GRADING_TIERS.find(t => t.grade <= calculatedGrade) || GRADING_TIERS[GRADING_TIERS.length - 1];

  const handleReset = () => {
    soundFX.playPop();
    setSpineTicks(0);
    setColorBreakCreases(0);
    setCornerWear('sharp');
    setStapleCondition('clean');
    setPageQuality('white');
    setCoverGloss('high_reflective');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official 10-Point Universal Grading Scale</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
            CGC COMIC <span className="text-yellow-400">GRADING LAB & SIMULATOR</span>
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
            Evaluate comic conditions with precision. Adjust physical condition variables to calculate estimated CGC / CBCS grades before submitting for certification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Defect Assessment Controls */}
        <div className="lg:col-span-7 bg-[#1E293B] rounded-3xl border border-slate-700 p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <h3 className="text-sm font-black italic uppercase text-white tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-yellow-400" />
              <span>DEFECT & PRESERVATION VARIABLES</span>
            </h3>
            <button
              onClick={handleReset}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Variables</span>
            </button>
          </div>

          {/* Spine Ticks */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wide">Spine Stress Lines / Ticks:</span>
              <span className="font-mono text-yellow-400 font-bold">{spineTicks} Ticks</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              value={spineTicks}
              onChange={(e) => { soundFX.playPop(); setSpineTicks(parseInt(e.target.value)); }}
              className="w-full accent-yellow-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 (Flawless)</span>
              <span>1-2 (NM)</span>
              <span>3-5 (VF)</span>
              <span>6+ (Fine)</span>
            </div>
          </div>

          {/* Color Break Creases */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wide">Color-Breaking Creases:</span>
              <span className="font-mono text-yellow-400 font-bold">{colorBreakCreases} Creases</span>
            </div>
            <input
              type="range"
              min="0"
              max="4"
              value={colorBreakCreases}
              onChange={(e) => { soundFX.playPop(); setColorBreakCreases(parseInt(e.target.value)); }}
              className="w-full accent-yellow-400 cursor-pointer"
            />
          </div>

          {/* Corner Sharpness */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 block uppercase tracking-wide">Corner Sharpness:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'sharp', label: 'Razor Sharp (9.8+)' },
                { id: 'slight_blunt', label: 'Slight Blunting (9.4)' },
                { id: 'creased', label: 'Creased Tip (8.0)' },
                { id: 'chipped', label: 'Chipped / Torn (6.0)' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => { soundFX.playPop(); setCornerWear(c.id as typeof cornerWear); }}
                  className={`p-2.5 rounded-2xl text-xs font-bold border text-center transition-all ${
                    cornerWear === c.id 
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md shadow-yellow-400/20' 
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Staple Quality */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 block uppercase tracking-wide">Staple Integrity & Rust:</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'clean', label: 'Clean & Centered' },
                { id: 'slight_rust', label: 'Minor Oxidation' },
                { id: 'popped', label: 'Detached / Popped' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => { soundFX.playPop(); setStapleCondition(s.id as typeof stapleCondition); }}
                  className={`p-2.5 rounded-2xl text-xs font-bold border text-center transition-all ${
                    stapleCondition === s.id 
                      ? 'bg-yellow-400 text-black border-yellow-400 font-black shadow-md shadow-yellow-400/20' 
                      : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Page Color Quality */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200 block uppercase tracking-wide">Paper Quality (Interior Pages):</label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'white', label: 'White (OW-W)', color: 'bg-white text-slate-950' },
                { id: 'off_white', label: 'Off-White', color: 'bg-amber-100 text-slate-950' },
                { id: 'cream', label: 'Cream', color: 'bg-amber-200 text-slate-950' },
                { id: 'tan', label: 'Tan / Brown', color: 'bg-amber-800 text-white' }
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => { soundFX.playPop(); setPageQuality(p.id as typeof pageQuality); }}
                  className={`p-2.5 rounded-2xl text-xs font-bold border transition-all ${
                    pageQuality === p.id 
                      ? 'border-yellow-400 ring-2 ring-yellow-400 shadow-md font-black' 
                      : 'border-slate-700 opacity-70 hover:opacity-100'
                  } ${p.color}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Grade Slab Presentation */}
        <div className="lg:col-span-5 bg-[#1E293B] rounded-3xl border border-slate-700 p-6 shadow-xl flex flex-col justify-between space-y-6">
          
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Estimated CGC Calculation:
            </span>

            {/* Slab Grade Card */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-700 p-5 shadow-2xl space-y-4">
              <div className="bg-yellow-400 rounded-xl p-3 flex items-center justify-between text-black font-black">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-black" />
                  <span className="font-comic text-xl tracking-wider">CGC UNIVERSAL</span>
                </div>
                <div className="text-right font-mono text-xl font-black">
                  {calculatedGrade.toFixed(1)}
                </div>
              </div>

              <div className="text-center py-4 space-y-1">
                <span className="text-xs text-slate-400 uppercase font-mono tracking-widest block font-bold">Condition Tier</span>
                <h3 className="text-2xl font-black italic uppercase text-white">
                  {matchedTier?.label || 'Near Mint (NM)'}
                </h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto pt-1">
                  {matchedTier?.desc}
                </p>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Page Quality:</span>
                  <span className="text-white capitalize">{pageQuality.replace('_', ' ')} Pages</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Preservation Shield:</span>
                  <span className="text-green-400 font-bold">Eligible for Archival Encapsulation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reference CGC Table Guide */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              10-Point Grade Reference Chart:
            </span>
            <div className="space-y-1 max-h-48 overflow-y-auto bg-slate-900 p-3 rounded-2xl border border-slate-700/80 text-xs">
              {GRADING_TIERS.map((tier) => (
                <div key={tier.grade} className="flex items-center justify-between py-1 border-b border-slate-800 last:border-0">
                  <span className="font-mono font-bold text-yellow-400">{tier.grade.toFixed(1)}</span>
                  <span className="text-slate-300 font-medium">{tier.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
