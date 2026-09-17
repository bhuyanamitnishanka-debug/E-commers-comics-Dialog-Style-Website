import React from 'react';
import { Publisher, Genre, Format } from '../types/comic';
import { SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { soundFX } from '../utils/audio';

interface ComicFiltersProps {
  selectedPublisher: string;
  setSelectedPublisher: (pub: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedFormat: string;
  setSelectedFormat: (fmt: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  cgcOnly: boolean;
  setCgcOnly: (val: boolean) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const PUBLISHERS: (Publisher | 'All')[] = [
  'All',
  'Marvel',
  'DC Comics',
  'Image Comics',
  'Dark Horse',
  'Manga/Kodansha',
  'Indie / Creator-Owned'
];

const GENRES: (Genre | 'All')[] = [
  'All',
  'Superhero',
  'Sci-Fi / Cyberpunk',
  'Dark Fantasy',
  'Horror',
  'Crime & Noir',
  'Action / Shonen',
  'Slice of Life'
];

const FORMATS: (Format | 'All')[] = [
  'All',
  'Single Issue',
  'CGC Graded Slab',
  'Trade Paperback (TPB)',
  'Hardcover / Omnibus',
  'Variant / Foil'
];

export const ComicFilters: React.FC<ComicFiltersProps> = ({
  selectedPublisher,
  setSelectedPublisher,
  selectedGenre,
  setSelectedGenre,
  selectedFormat,
  setSelectedFormat,
  sortBy,
  setSortBy,
  inStockOnly,
  setInStockOnly,
  cgcOnly,
  setCgcOnly,
  onResetFilters,
  totalResults
}) => {
  return (
    <div className="bg-[#1E293B] border border-slate-700/80 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
      
      {/* Top Filter Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700/60">
        <div className="flex items-center gap-2 text-white font-bold">
          <SlidersHorizontal className="w-4 h-4 text-yellow-400" />
          <span className="font-black italic uppercase text-lg text-white tracking-tight">
            FILTER & SORT <span className="text-yellow-400">UNIVERSE</span>
          </span>
          <span className="text-xs bg-slate-900 border border-slate-700 text-slate-300 font-mono font-bold px-2.5 py-0.5 rounded-full">
            {totalResults} issues
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Quick Toggles */}
          <button
            onClick={() => { soundFX.playPop(); setCgcOnly(!cgcOnly); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              cgcOnly
                ? 'bg-yellow-400 text-black border-yellow-400 shadow-md shadow-yellow-400/20'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${cgcOnly ? 'bg-black' : 'bg-yellow-400'}`} />
            <span>CGC Slabs Only</span>
          </button>

          <button
            onClick={() => { soundFX.playPop(); setInStockOnly(!inStockOnly); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              inStockOnly
                ? 'bg-green-500 text-black border-green-500 font-black'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
            }`}
          >
            <Check className={`w-3.5 h-3.5 ${inStockOnly ? 'opacity-100' : 'opacity-30'}`} />
            <span>In Stock Only</span>
          </button>

          <button
            onClick={() => { soundFX.playPop(); onResetFilters(); }}
            title="Reset all filters"
            className="p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-700 rounded-full hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Publisher Badges Bento Pill Row */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <span>Publisher Universe</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {PUBLISHERS.map((pub) => {
            const isSelected = selectedPublisher === pub;
            return (
              <button
                key={pub}
                onClick={() => {
                  soundFX.playPop();
                  setSelectedPublisher(pub);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${
                  isSelected
                    ? 'bg-yellow-400 text-black font-black shadow-md shadow-yellow-400/20 scale-105'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/80'
                }`}
              >
                {pub}
              </button>
            );
          })}
        </div>
      </div>

      {/* Genre, Format, and Sort Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        
        {/* Genre Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Genre / Category
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => {
              soundFX.playPop();
              setSelectedGenre(e.target.value);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
          >
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* Format Selector */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Book Format / Edition
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => {
              soundFX.playPop();
              setSelectedFormat(e.target.value);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
          >
            {FORMATS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
            Sort Order
          </label>
          <select
            value={sortBy}
            onChange={(e) => {
              soundFX.playPop();
              setSortBy(e.target.value);
            }}
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
          >
            <option value="featured">🔥 Featured & Trending</option>
            <option value="newest">📅 New Releases (NCBD)</option>
            <option value="price-asc">💵 Price: Low to High</option>
            <option value="price-desc">💎 Price: High to Low (Grails)</option>
            <option value="rating">⭐ Highest Rated</option>
            <option value="alpha">🔤 Title (A - Z)</option>
          </select>
        </div>

      </div>

    </div>
  );
};

