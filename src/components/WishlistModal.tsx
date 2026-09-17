import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Comic } from '../types/comic';
import { soundFX } from '../utils/audio';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistComics: Comic[];
  onRemoveFromWishlist: (comic: Comic) => void;
  onAddToCart: (comic: Comic) => void;
  onOpenDetails: (comic: Comic) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistComics,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenDetails
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <h2 className="font-black italic uppercase text-lg text-white tracking-wide">
              SAVED WISHLIST ({wishlistComics.length})
            </h2>
          </div>
          <button
            onClick={() => { soundFX.playPop(); onClose(); }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {wishlistComics.length === 0 ? (
            <div className="text-center py-10 text-slate-400 space-y-2">
              <Heart className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-xs">You haven't saved any comics to your wishlist yet.</p>
            </div>
          ) : (
            wishlistComics.map((comic) => (
              <div
                key={comic.id}
                className="bg-slate-900 p-3 rounded-2xl border border-slate-700/80 flex items-center justify-between gap-3"
              >
                <div 
                  className="flex items-center gap-3 cursor-pointer flex-1"
                  onClick={() => { onClose(); onOpenDetails(comic); }}
                >
                  <img src={comic.coverImage} alt={comic.title} className="w-12 aspect-[2/3] object-cover rounded-xl border border-slate-700 shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-white hover:text-yellow-400 line-clamp-1">{comic.title}</h4>
                    <span className="text-[10px] text-yellow-400 font-mono font-bold">{comic.issueNumber} • {comic.publisher}</span>
                    <div className="text-xs font-mono font-black text-white mt-0.5">${comic.price.toFixed(2)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFX.playCoin();
                      onAddToCart(comic);
                    }}
                    className="px-3.5 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase rounded-full text-xs tracking-wider flex items-center gap-1 shadow"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>ADD</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playPop();
                      onRemoveFromWishlist(comic);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
