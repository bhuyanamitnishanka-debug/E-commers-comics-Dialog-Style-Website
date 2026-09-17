import React, { useState } from 'react';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  ArrowRight, 
  RotateCcw, 
  Check, 
  ShoppingBag,
  Zap
} from 'lucide-react';
import { Comic } from '../types/comic';
import { soundFX } from '../utils/audio';

interface MatchmakerAIProps {
  comics: Comic[];
  onOpenComic: (comic: Comic) => void;
  onAddToCart: (comic: Comic) => void;
}

export const MatchmakerAI: React.FC<MatchmakerAIProps> = ({
  comics,
  onOpenComic,
  onAddToCart
}) => {
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [artStyle, setArtStyle] = useState<string>('');
  const [storyLength, setStoryLength] = useState<string>('');
  const [recommendations, setRecommendations] = useState<{ comic: Comic; reason: string }[]>([]);

  const handleGenerateRecommendations = () => {
    soundFX.playPop();

    // Smart filtering & matchmaking logic
    let matched = [...comics];

    if (vibe === 'noir') {
      matched = matched.filter(c => c.genres.includes('Crime & Noir') || c.genres.includes('Horror') || c.title.includes('Batman'));
    } else if (vibe === 'cyberpunk') {
      matched = matched.filter(c => c.genres.includes('Sci-Fi / Cyberpunk'));
    } else if (vibe === 'shonen') {
      matched = matched.filter(c => c.genres.includes('Action / Shonen') || c.publisher === 'Manga/Kodansha');
    } else if (vibe === 'superhero') {
      matched = matched.filter(c => c.genres.includes('Superhero'));
    }

    if (matched.length === 0) matched = comics.slice(0, 3);

    const recs = matched.slice(0, 3).map(c => ({
      comic: c,
      reason: `Matches your desire for ${vibe || 'gripping'} storytelling with ${artStyle || 'masterful'} visual aesthetics.`
    }));

    setRecommendations(recs);
    setStep(5);
  };

  const handleReset = () => {
    soundFX.playPop();
    setStep(1);
    setVibe('');
    setExperience('');
    setArtStyle('');
    setStoryLength('');
    setRecommendations([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Bento Card */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Interactive Comic Matchmaker & Reading Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
          THE COMIC <span className="text-yellow-400">ORACLE</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-normal leading-relaxed">
          Tell the Oracle your favorite genres, visual styles, and mood to discover your next legendary comic reading addiction.
        </p>
      </div>

      {/* Questionnaire Form */}
      {step < 5 ? (
        <div className="bg-[#1E293B] rounded-3xl border border-slate-700 p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Progress bar */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-4 border-b border-slate-700/60 font-bold">
            <span>QUESTION {step} OF 4</span>
            <span className="text-yellow-400">{step * 25}% Complete</span>
          </div>

          {/* Step 1: Vibe */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black italic uppercase text-white tracking-wide">
                1. What kind of vibe or atmosphere are you craving?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'superhero', label: '🦸 High-Stakes Multiverse Superhero Action', desc: 'Epic battles, iconic heroes, universe-altering stakes.' },
                  { id: 'noir', label: '🕵️ Gritty Detective Noir & Psychological Crime', desc: 'Dark shadows, rainy alleyways, morally grey anti-heroes.' },
                  { id: 'cyberpunk', label: '🤖 Neon Cyberpunk & Sci-Fi Dystopia', desc: 'Plasma katanas, cyborgs, rogue AI, mega-corporations.' },
                  { id: 'shonen', label: '⚔️ High-Energy Action & Dark Fantasy Manga', desc: 'Martial arts tournaments, cursed energy, mythical beasts.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { soundFX.playPop(); setVibe(item.id); setStep(2); }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      vibe === item.id 
                        ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20' 
                        : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`font-bold text-sm ${vibe === item.id ? 'text-black' : 'text-white'}`}>{item.label}</div>
                    <div className={`text-xs mt-1 ${vibe === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Experience Level */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black italic uppercase text-white tracking-wide">
                2. What is your comic book reading experience?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'beginner', label: 'Brand New Reader', desc: 'Looking for a clean, accessible jumping-on point without 40 years of continuity.' },
                  { id: 'intermediate', label: 'Regular Reader', desc: 'Comfortable with major crossover events and creator-owned runs.' },
                  { id: 'collector', label: 'Die-Hard Collector', desc: 'Hunting key 1st appearances, CGC 9.8 graded grails, and rare incentive variants.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { soundFX.playPop(); setExperience(item.id); setStep(3); }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      experience === item.id 
                        ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20' 
                        : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`font-bold text-sm ${experience === item.id ? 'text-black' : 'text-white'}`}>{item.label}</div>
                    <div className={`text-xs mt-1 ${experience === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Art Style */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black italic uppercase text-white tracking-wide">
                3. What visual art style resonates with you most?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'cinematic', label: '🎨 Hyper-Detailed Cinematic & Painted (Alex Ross, Checchetto)', desc: 'Photorealistic lighting, painterly covers, lush backgrounds.' },
                  { id: 'ink_manga', label: '✒️ High-Contrast Dynamic Ink & Manga Screentone', desc: 'Fast kinetic speed lines, dramatic black shadows.' },
                  { id: 'stylized_indie', label: '🌈 Stylized Creator-Owned Watercolor & Indie Art', desc: 'Expressive linework, unique color palettes (Fiona Staples, Sana Takeda).' },
                  { id: 'classic_vintage', label: '🗞️ Golden/Silver Age Vintage Pop-Art Halftone', desc: 'Retro 4-color dot matrices, nostalgic newsprint charm.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { soundFX.playPop(); setArtStyle(item.id); setStep(4); }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      artStyle === item.id 
                        ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20' 
                        : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`font-bold text-sm ${artStyle === item.id ? 'text-black' : 'text-white'}`}>{item.label}</div>
                    <div className={`text-xs mt-1 ${artStyle === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Story Format */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black italic uppercase text-white tracking-wide">
                4. What format or commitment are you looking for?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'single', label: 'Single Floppy Issue (#1)', desc: 'Jump into a fresh debut issue for under $5.' },
                  { id: 'tpb', label: 'Trade Paperback / Graphic Novel', desc: 'A complete self-contained 4 to 6 issue story arc in one volume.' },
                  { id: 'omnibus', label: 'Deluxe Hardcover / Omnibus', desc: 'Over 500+ pages of luxury archival collection.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { soundFX.playPop(); setStoryLength(item.id); }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      storyLength === item.id 
                        ? 'bg-yellow-400 text-black border-yellow-400 font-bold shadow-lg shadow-yellow-400/20' 
                        : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`font-bold text-sm ${storyLength === item.id ? 'text-black' : 'text-white'}`}>{item.label}</div>
                    <div className={`text-xs mt-1 ${storyLength === item.id ? 'text-slate-900' : 'text-slate-400'}`}>{item.desc}</div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  disabled={!storyLength}
                  onClick={handleGenerateRecommendations}
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center gap-2 shadow-lg shadow-yellow-400/20 disabled:opacity-40"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>REVEAL ORACLE RECOMMENDATIONS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Step 5: Recommendations Showcase */
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black italic uppercase text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>THE ORACLE’S <span className="text-yellow-400">CHOSEN RUNS FOR YOU</span></span>
            </h2>
            <button
              onClick={handleReset}
              className="text-xs text-slate-300 hover:text-white font-bold uppercase tracking-wider flex items-center gap-1.5 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map(({ comic, reason }, i) => (
              <div
                key={comic.id}
                className="bg-[#1E293B] rounded-3xl border border-slate-700 hover:border-yellow-400/70 p-4 flex flex-col justify-between space-y-4 shadow-xl transition-all"
              >
                <div>
                  <div className="relative aspect-[2/3] rounded-2xl overflow-hidden bg-slate-950 mb-3 group cursor-pointer" onClick={() => onOpenComic(comic)}>
                    <img src={comic.coverImage} alt={comic.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2.5 left-2.5 bg-yellow-400 text-black text-[10px] font-black font-mono px-2.5 py-0.5 rounded-full shadow">
                      #{i + 1} Best Match
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-red-600 text-white px-2 py-0.2 rounded">
                      {comic.publisher}
                    </span>
                    <h3 className="font-bold text-base text-white hover:text-yellow-400 cursor-pointer" onClick={() => onOpenComic(comic)}>
                      {comic.title} {comic.issueNumber}
                    </h3>
                    <p className="text-xs text-yellow-300/90 font-medium italic">
                      "{reason}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between">
                  <span className="font-mono text-base font-black text-white">
                    ${comic.price.toFixed(2)}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenComic(comic)}
                      className="px-3.5 py-1.5 bg-slate-900 text-slate-300 hover:text-white rounded-full text-xs font-bold uppercase border border-slate-700"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => { soundFX.playCoin(); onAddToCart(comic); }}
                      className="px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-full text-xs uppercase tracking-wider flex items-center gap-1 shadow"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>BUY</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
