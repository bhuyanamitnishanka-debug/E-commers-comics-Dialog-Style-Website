import React from 'react';
import { ShoppingBag, Eye, Heart, BookOpen, Star, Plus, ShieldCheck } from 'lucide-react';
import { Comic } from '../types/comic';
import { soundFX } from '../utils/audio';

interface ComicCardProps {
  comic: Comic;
  onOpenDetails: (comic: Comic) => void;
  onOpenReader: (comic: Comic) => void;
  onAddToCart: (comic: Comic) => void;
  onAddToPullbox: (comic: Comic) => void;
  isWishlisted: boolean;
  onToggleWishlist: (comic: Comic) => void;
}

export const ComicCard: React.FC<ComicCardProps> = ({
  comic,
  onOpenDetails,
  onOpenReader,
  onAddToCart,
  onAddToPullbox,
  isWishlisted,
  onToggleWishlist
}) => {
  const isCgc = comic.format === 'CGC Graded Slab' && comic.cgcGrade;
  
  return (
    <div className="group relative bg-[#1E293B] rounded-3xl border border-slate-700/80 hover:border-yellow-400/80 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-yellow-400/5 hover:-translate-y-1 p-3">
      
      {/* Top Media Container */}
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-950 cursor-pointer" onClick={() => onOpenDetails(comic)}>
        <img 
          src={comic.coverImage} 
          alt={comic.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* CGC Slab Frame Overlay if graded */}
        {isCgc && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 p-1.5 flex items-center justify-between text-black font-black text-[10px] shadow-md z-10">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span className="font-comic tracking-wider text-xs">CGC {comic.cgcGrade}</span>
            </div>
            <span className="font-mono text-[9px] bg-black text-yellow-400 px-1.5 py-0.2 rounded font-bold">
              {comic.cgcLabelType?.split(' ')[0] || 'Universal'}
            </span>
          </div>
        )}

        {/* Format Badge if not CGC */}
        {!isCgc && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wide bg-slate-950/85 backdrop-blur-sm text-slate-200 border border-slate-700 shadow">
              {comic.format}
            </span>
          </div>
        )}

        {/* Publisher Tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase backdrop-blur-sm shadow ${
            comic.publisher === 'Marvel' ? 'bg-red-600/90 text-white' :
            comic.publisher === 'DC Comics' ? 'bg-blue-600/90 text-white' :
            comic.publisher === 'Image Comics' ? 'bg-yellow-400 text-black' :
            comic.publisher === 'Manga/Kodansha' ? 'bg-purple-600/90 text-white' :
            'bg-emerald-600/90 text-white'
          }`}>
            {comic.publisher.split('/')[0]}
          </span>
        </div>

        {/* Key Issue Banner */}
        {comic.keyNotes && (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white truncate z-10 flex items-center gap-1">
            <span className="text-yellow-300">⚡</span>
            <span className="truncate">{comic.keyNotes}</span>
          </div>
        )}

        {/* Hover Quick Overlay Buttons */}
        <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3 z-20 backdrop-blur-[2px]">
          
          {/* Top Quick Actions */}
          <div className="flex justify-end gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playPop();
                onToggleWishlist(comic);
              }}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isWishlisted ? 'bg-red-600 text-white' : 'bg-slate-900/90 text-slate-200 hover:text-red-400 border border-slate-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Center Quick Read & Detail Actions */}
          <div className="space-y-2">
            {comic.previewPages && comic.previewPages.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundFX.playPageTurn();
                  onOpenReader(comic);
                }}
                className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center justify-center gap-1.5 shadow-lg backdrop-blur-sm transition-transform active:scale-95"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Quick Read Preview</span>
              </button>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                soundFX.playPop();
                onOpenDetails(comic);
              }}
              className="w-full py-2 bg-slate-900/90 hover:bg-slate-800 text-white font-bold rounded-full text-xs flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Eye className="w-3.5 h-3.5 text-yellow-400" />
              <span>Full Issue Specs</span>
            </button>
          </div>
        </div>

      </div>

      {/* Info Section */}
      <div className="px-1 pt-3 pb-1 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Title & Issue */}
          <div className="flex items-start justify-between gap-1.5">
            <h3 
              onClick={() => onOpenDetails(comic)}
              className="font-bold text-sm text-white group-hover:text-yellow-400 transition-colors line-clamp-1 cursor-pointer"
              title={comic.title}
            >
              {comic.title}
            </h3>
            <span className="font-comic text-yellow-400 text-sm whitespace-nowrap">{comic.issueNumber}</span>
          </div>

          <p className="text-[11px] font-semibold text-slate-400 truncate mt-0.5">
            {comic.series}
          </p>

          {/* Creators */}
          <div className="text-[10px] text-slate-400 mt-1 truncate">
            {comic.creators.slice(0, 2).map((c, i) => (
              <span key={i} className="mr-1.5">
                <span className="text-slate-500 font-bold">{c.role}:</span> {c.name}
              </span>
            ))}
          </div>

          {/* Rating and Variants indicator */}
          <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-slate-200">{comic.rating}</span>
              <span className="text-slate-500">({comic.reviewCount})</span>
            </div>

            {comic.variants && comic.variants.length > 0 && (
              <span className="text-[9px] bg-slate-900 text-yellow-400 px-2 py-0.5 rounded-full font-mono font-bold border border-slate-700">
                +{comic.variants.length} Variants
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Cart Actions */}
        <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-white font-mono">
                ${comic.price.toFixed(2)}
              </span>
              {comic.originalPrice && (
                <span className="text-[11px] text-slate-500 line-through font-mono">
                  ${comic.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[9px] text-green-400 font-bold uppercase tracking-wider block">
              {comic.inStock ? `${comic.stockQuantity} in stock` : 'Backordered'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Add to Pullbox */}
            <button
              onClick={() => {
                soundFX.playPop();
                onAddToPullbox(comic);
              }}
              title="Add this ongoing series to your Weekly Pullbox subscription"
              className="p-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-yellow-400 border border-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>

            {/* Quick Add to Cart Pill */}
            <button
              onClick={() => {
                soundFX.playCoin();
                onAddToCart(comic);
              }}
              disabled={!comic.inStock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-tight transition-all shadow ${
                comic.inStock 
                  ? 'bg-yellow-400 hover:bg-yellow-300 text-black active:scale-95' 
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

