import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Tag, 
  Truck, 
  ArrowRight, 
  CheckCircle2,
  Package
} from 'lucide-react';
import { CartItem } from '../types/comic';
import { soundFX } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onOpenCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => {
    const itemPrice = item.comic.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const discountAmount = (rawSubtotal * appliedDiscount) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const shipping = subtotal >= 49 || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playPop();
    const code = couponCode.trim().toUpperCase();

    if (code === 'MULTIVERSE20') {
      setAppliedDiscount(20);
      setCouponSuccess('20% Multiverse Discount applied!');
      setCouponError(null);
    } else if (code === 'PULLBOX10' || code === 'GEMMINT') {
      setAppliedDiscount(10);
      setCouponSuccess('10% Collector Promo applied!');
      setCouponError(null);
    } else {
      setCouponError('Invalid coupon. Try: MULTIVERSE20 or PULLBOX10');
      setCouponSuccess(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div 
        onClick={onClose} 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#1E293B] border-l border-slate-700 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <ShoppingBag className="w-5 h-5 text-yellow-400" />
              <h2 className="font-black italic uppercase text-lg tracking-wide">
                YOUR COMIC HAUL ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={() => { soundFX.playPop(); onClose(); }}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Scroll List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-slate-500 border border-slate-700">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white uppercase">Your Cart is Empty</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Add some single issues, graded slabs, or manga volumes to begin your comic delivery.
                </p>
              </div>
            ) : (
              cartItems.map((item, index) => {
                const itemPrice = item.comic.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
                const itemImage = item.selectedVariant ? item.selectedVariant.coverImage : item.comic.coverImage;

                return (
                  <div key={index} className="bg-slate-900 p-3.5 rounded-2xl border border-slate-700/80 flex gap-3">
                    <img 
                      src={itemImage} 
                      alt={item.comic.title} 
                      className="w-16 aspect-[2/3] object-cover rounded-xl border border-slate-700 shrink-0" 
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs text-white line-clamp-1">{item.comic.title}</h4>
                          <span className="font-mono text-xs font-black text-yellow-400">
                            ${(itemPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <span className="text-[10px] text-slate-400 font-mono block">
                          {item.comic.issueNumber} • {item.comic.publisher}
                        </span>

                        {item.selectedVariant && (
                          <span className="text-[9px] text-cyan-400 font-mono block mt-0.5">
                            Variant: {item.selectedVariant.name}
                          </span>
                        )}

                        <div className="flex items-center gap-1 text-[10px] text-green-400 mt-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Free 2mil Bag & Board included</span>
                        </div>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800 mt-2">
                        <div className="flex items-center gap-2 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-700">
                          <button
                            onClick={() => {
                              soundFX.playPop();
                              onUpdateQuantity(index, item.quantity - 1);
                            }}
                            className="text-slate-400 hover:text-white text-xs font-bold px-1"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono text-white font-bold">{item.quantity}</span>
                          <button
                            onClick={() => {
                              soundFX.playPop();
                              onUpdateQuantity(index, item.quantity + 1);
                            }}
                            className="text-slate-400 hover:text-white text-xs font-bold px-1"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => {
                            soundFX.playPop();
                            onRemoveItem(index);
                          }}
                          className="text-slate-400 hover:text-red-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-700/80 space-y-3.5">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code (MULTIVERSE20)"
                      className="w-full bg-slate-950 border border-slate-700 rounded-full pl-8 pr-3 py-1.5 text-xs text-white uppercase focus:border-yellow-400 focus:outline-none font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase rounded-full border border-slate-700"
                  >
                    Apply
                  </button>
                </div>
                {couponSuccess && <p className="text-[10px] text-green-400 font-mono">{couponSuccess}</p>}
                {couponError && <p className="text-[10px] text-red-400 font-mono">{couponError}</p>}
              </form>

              {/* Cost Summary */}
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal:</span>
                  <span className="text-white font-bold">${rawSubtotal.toFixed(2)}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-400 font-bold">
                    <span>Discount ({appliedDiscount}% OFF):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-400">
                  <span>Reinforced Gem-Mint Shipping:</span>
                  <span className={shipping === 0 ? 'text-green-400 font-bold' : 'text-white'}>
                    {shipping === 0 ? 'FREE (Over $49)' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-slate-800 text-white">
                  <span className="uppercase">Estimated Total:</span>
                  <span className="text-yellow-400 text-base font-black">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  soundFX.playPop();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
              >
                <span>PROCEED TO SECURE CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
                <span>256-Bit SSL Encrypted • Gem-Mint Box Guarantee</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
