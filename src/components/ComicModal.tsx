import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  BookOpen, 
  Heart, 
  Star, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  Layers, 
  Tag, 
  CheckCircle2, 
  Truck, 
  Sparkles,
  Award
} from 'lucide-react';
import { Comic, VariantOption } from '../types/comic';
import { soundFX } from '../utils/audio';

interface ComicModalProps {
  comic: Comic | null;
  onClose: () => void;
  onAddToCart: (comic: Comic, variant?: VariantOption, bagAndBoard?: boolean) => void;
  onAddToPullbox: (comic: Comic) => void;
  onOpenReader: (comic: Comic) => void;
  isWishlisted: boolean;
  onToggleWishlist: (comic: Comic) => void;
}

export const ComicModal: React.FC<ComicModalProps> = ({
  comic,
  onClose,
  onAddToCart,
  onAddToPullbox,
  onOpenReader,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption | undefined>(undefined);
  const [bagAndBoard, setBagAndBoard] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'details' | 'creators' | 'reviews'>('details');

  if (!comic) return null;

  const currentPrice = comic.price + (selectedVariant ? selectedVariant.priceModifier : 0);
  const activeImage = selectedVariant ? selectedVariant.coverImage : comic.coverImage;
  const isCgc = comic.format === 'CGC Graded Slab' && comic.cgcGrade;

  const handleVariantSelect = (v: VariantOption) => {
    soundFX.playPop();
    if (selectedVariant?.id === v.id) {
      setSelectedVariant(undefined);
    } else {
      setSelectedVariant(v);
    }
  };

  const handleAdd = () => {
    soundFX.playCoin();
    for (let i = 0; i < quantity; i++) {
      onAddToCart(comic, selectedVariant, bagAndBoard);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Close Button */}
        <button
          onClick={() => { soundFX.playPop(); onClose(); }}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Cover & Variants Showcase */}
          <div className="md:col-span-5 bg-slate-900 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-700/80">
            
            {/* Main Cover Slab Showcase */}
            <div className="relative w-full max-w-[280px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-700 group">
              
              {/* Graded Slab Label Header */}
              {isCgc && (
                <div className={`p-2 flex items-center justify-between text-slate-950 font-bold text-xs ${
                  comic.cgcLabelType === 'Signature Series (Yellow)' 
                    ? 'bg-yellow-400 text-black font-black' 
                    : 'bg-cyan-400 text-black font-black'
                }`}>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="font-mono text-sm">CGC {comic.cgcGrade}</span>
                  </div>
                  <div className="text-right font-mono text-[10px]">
                    #{comic.cgcCertNumber}
                  </div>
                </div>
              )}

              <img 
                src={activeImage} 
                alt={comic.title} 
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Digital preview trigger overlay */}
              {comic.previewPages && comic.previewPages.length > 0 && (
                <button
                  onClick={() => { soundFX.playPageTurn(); onOpenReader(comic); }}
                  className="absolute bottom-3 left-3 right-3 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center justify-center gap-2 shadow-xl active:scale-95 transition-all"
                >
                  <BookOpen className="w-4 h-4 text-black" />
                  <span className="text-xs">READ SAMPLE PREVIEW</span>
                </button>
              )}
            </div>

            {/* Signature Series Signees */}
            {comic.cgcSignatures && comic.cgcSignatures.length > 0 && (
              <div className="mt-3 w-full bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-2 text-center">
                <span className="text-[10px] text-yellow-400 font-black uppercase tracking-wider block">
                  ⭐ CGC Witnessed Signatures:
                </span>
                <span className="text-xs text-white font-medium">
                  {comic.cgcSignatures.join(', ')}
                </span>
              </div>
            )}

            {/* Variant Covers Selector */}
            {comic.variants && comic.variants.length > 0 && (
              <div className="mt-4 w-full">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                  Select Variant Cover:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {comic.variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => handleVariantSelect(v)}
                        className={`relative rounded-xl overflow-hidden border-2 p-1 text-left transition-all ${
                          isSelected 
                            ? 'border-yellow-400 bg-yellow-400/10 shadow-lg' 
                            : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <img src={v.coverImage} alt={v.name} className="w-full aspect-[2/3] object-cover rounded-lg" />
                        <div className="mt-1 text-[9px] font-bold text-white truncate">{v.name}</div>
                        <div className="text-[8px] font-mono text-yellow-400 font-bold">
                          {v.priceModifier > 0 ? `+$${v.priceModifier.toFixed(2)}` : 'Cover A'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Information, Specs, Add to Cart */}
          <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                  {comic.publisher}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-slate-900 text-slate-300 border border-slate-700">
                  {comic.format}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 font-bold">
                  {comic.era}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-wide leading-tight">
                {comic.title} <span className="text-yellow-400">{comic.issueNumber}</span>
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-medium">{comic.series}</p>

              {/* Key Issue Callout */}
              {comic.keyNotes && (
                <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-2.5 text-xs text-red-300 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{comic.keyNotes}</span>
                </div>
              )}
            </div>

            {/* Tabs for Details / Creators / Reviews */}
            <div>
              <div className="flex border-b border-slate-700/60 gap-4 text-xs font-black uppercase tracking-wider">
                <button
                  onClick={() => setSelectedTab('details')}
                  className={`pb-2 border-b-2 transition-colors ${
                    selectedTab === 'details' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Overview & Specs
                </button>
                <button
                  onClick={() => setSelectedTab('creators')}
                  className={`pb-2 border-b-2 transition-colors ${
                    selectedTab === 'creators' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Creative Team ({comic.creators.length})
                </button>
                <button
                  onClick={() => setSelectedTab('reviews')}
                  className={`pb-2 border-b-2 transition-colors ${
                    selectedTab === 'reviews' ? 'border-yellow-400 text-yellow-400' : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Reviews ({comic.reviewCount})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-3 text-xs leading-relaxed text-slate-300 min-h-[120px]">
                {selectedTab === 'details' && (
                  <div className="space-y-3">
                    <p className="leading-relaxed">{comic.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-700/60">
                      <div><span className="text-slate-500 font-mono">Diamond Code:</span> {comic.diamondCode}</div>
                      <div><span className="text-slate-500 font-mono">Page Count:</span> {comic.pageCount} Pages</div>
                      <div><span className="text-slate-500 font-mono">Release Date:</span> {comic.releaseDate}</div>
                      <div><span className="text-slate-500 font-mono">Story Arc:</span> {comic.storyArc || 'Standalone'}</div>
                    </div>
                  </div>
                )}

                {selectedTab === 'creators' && (
                  <div className="grid grid-cols-2 gap-3">
                    {comic.creators.map((c, i) => (
                      <div key={i} className="bg-slate-900 p-2.5 rounded-2xl border border-slate-700">
                        <span className="text-[10px] text-yellow-400 font-mono uppercase font-bold block">{c.role}</span>
                        <span className="text-xs font-bold text-white">{c.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'reviews' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-white">{comic.rating} / 5.0</span>
                      <span className="text-slate-500">Based on {comic.reviewCount} verified collector ratings</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-2xl border border-slate-700 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-bold text-white">@ComicsCollector99</span>
                        <span>Verified Purchase</span>
                      </div>
                      <p className="text-slate-300">"Book arrived in pristine Gem-Mint condition with thick backing board. Jonathan Hickman’s writing is world-class!"</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Extras: Bag & Board Free Toggle & Stock */}
            <div className="bg-slate-900/80 rounded-2xl p-3.5 border border-slate-700 space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-white">Free Acid-Free Bag & Board Included</span>
                </div>
                <input
                  type="checkbox"
                  checked={bagAndBoard}
                  onChange={(e) => setBagAndBoard(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-yellow-400 focus:ring-0"
                />
              </label>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                <Truck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Ships in reinforced Gemini Comic Mailer Box</span>
              </div>
            </div>

            {/* Price, Quantity, Cart and Pullbox Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    ${currentPrice.toFixed(2)}
                  </span>
                  {comic.originalPrice && (
                    <span className="ml-2 text-sm text-slate-500 line-through font-mono">
                      ${comic.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Quantity incrementor */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-400 hover:text-white px-1 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-mono font-bold text-white w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-400 hover:text-white px-1 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                <button
                  onClick={handleAdd}
                  disabled={!comic.inStock}
                  className="sm:col-span-8 py-3.5 px-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full shadow-lg shadow-yellow-400/20 active:scale-95 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD TO CART</span>
                </button>

                <button
                  onClick={() => { soundFX.playPop(); onAddToPullbox(comic); }}
                  title="Subscribe to this series on your Weekly Pullbox"
                  className="sm:col-span-3 py-3.5 px-3 bg-slate-800 hover:bg-slate-700 text-white font-bold uppercase rounded-full border border-slate-700 transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Pull Series</span>
                </button>

                <button
                  onClick={() => { soundFX.playPop(); onToggleWishlist(comic); }}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`sm:col-span-1 p-3.5 rounded-full border flex items-center justify-center transition-colors ${
                    isWishlisted 
                      ? 'bg-red-500/20 border-red-500 text-red-400' 
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-400' : ''}`} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
