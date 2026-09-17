import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Package, 
  Sparkles, 
  Printer, 
  ArrowRight,
  Barcode
} from 'lucide-react';
import { CartItem } from '../types/comic';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderComplete
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  
  // Customer info
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.collector@example.com');
  const [address, setAddress] = useState('742 Evergreen Terrace');
  const [city, setCity] = useState('Springfield');
  const [postal, setPostal] = useState('97477');
  const [packagingType, setPackagingType] = useState<'gemini_box' | 'museum_crushproof'>('gemini_box');
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => {
    const itemPrice = item.comic.price + (item.selectedVariant ? item.selectedVariant.priceModifier : 0);
    return acc + itemPrice * item.quantity;
  }, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playCoin();
    const generatedId = `NCX-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setStep('success');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    onOrderComplete();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-[#1E293B] border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-yellow-400" />
            <h2 className="font-black italic uppercase text-lg text-white tracking-wide">
              {step === 'details' ? 'SECURE COMIC CHECKOUT' : 'ORDER CONFIRMED!'}
            </h2>
          </div>
          <button
            onClick={() => { soundFX.playPop(); onClose(); }}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step 1: Checkout Form */}
        {step === 'details' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
            
            {/* Collector Address */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                <span>1. Collector Shipping Address</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Email (for NCBD Tracking)</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wide">ZIP / Postal Code</label>
                  <input
                    type="text"
                    required
                    value={postal}
                    onChange={(e) => setPostal(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Packaging Protection Selector */}
            <div className="space-y-3 pt-3 border-t border-slate-700/60">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Package className="w-4 h-4" />
                <span>2. Gem-Mint Packaging Guarantee</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPackagingType('gemini_box')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    packagingType === 'gemini_box'
                      ? 'bg-yellow-400/10 border-yellow-400 ring-2 ring-yellow-400/30 font-bold'
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-white">Gemini Heavy Mailer (Free)</div>
                  <div className="text-[11px] text-slate-400 mt-1">Crushproof fold-over mailer + free bag & board.</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPackagingType('museum_crushproof')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    packagingType === 'museum_crushproof'
                      ? 'bg-yellow-400/10 border-yellow-400 ring-2 ring-yellow-400/30 font-bold'
                      : 'bg-slate-900 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-white">Double-Boxed Slab Armor (+$4.99)</div>
                  <div className="text-[11px] text-slate-400 mt-1">High density bubble foam + rigid outer carton.</div>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-3 border-t border-slate-700/60">
              <h3 className="text-xs font-black text-yellow-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <CreditCard className="w-4 h-4" />
                <span>3. Payment Summary</span>
              </h3>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Due:</span>
                  <span className="text-2xl font-black text-yellow-400 font-mono">
                    ${(totalAmount + (packagingType === 'museum_crushproof' ? 4.99 : 0)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-slate-950 text-slate-300 rounded-full text-xs font-mono border border-slate-700">Visa •••• 4242</span>
                  <span className="px-3 py-1 bg-slate-950 text-slate-300 rounded-full text-xs font-mono border border-slate-700">Apple Pay</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-sm flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
            >
              <span>AUTHORIZE & DISPATCH HAUL</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
        ) : (
          /* Step 2: Order Success & Tracking Receipt */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            
            <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 text-green-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-green-400 uppercase font-bold tracking-widest">
                Payment Authorized & Verified
              </span>
              <h2 className="text-3xl font-black italic uppercase text-white tracking-wide">
                YOUR COMICS ARE BEING SECURED!
              </h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Order confirmation and live GPS delivery tracking has been dispatched to <span className="text-white font-mono">{email}</span>.
              </p>
            </div>

            {/* Tracking Status Pipeline */}
            <div className="bg-slate-900 p-5 rounded-3xl border border-slate-700 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 font-bold uppercase">ORDER NUMBER:</span>
                <span className="text-yellow-400 font-black">{orderId}</span>
              </div>

              {/* Progress Steps */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] font-bold text-center">
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-green-500 text-black font-black mx-auto flex items-center justify-center">✓</div>
                  <span className="text-green-400">Order Placed</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-yellow-400 text-black font-black mx-auto flex items-center justify-center animate-pulse">2</div>
                  <span className="text-yellow-400">Bag & Boarding</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">3</div>
                  <span className="text-slate-500">Gemini Packed</span>
                </div>
                <div className="space-y-1">
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-500 mx-auto flex items-center justify-center">4</div>
                  <span className="text-slate-500">Dispatched</span>
                </div>
              </div>
            </div>

            {/* Receipt Barcode Graphic */}
            <div className="p-3 bg-white text-slate-950 rounded-2xl space-y-1 max-w-xs mx-auto">
              <div className="flex items-center justify-center">
                <Barcode className="w-full h-12 text-black" />
              </div>
              <div className="text-[10px] font-mono font-bold tracking-widest">{orderId}-NEXUS-MINT</div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase rounded-full border border-slate-700 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice</span>
              </button>

              <button
                onClick={() => { soundFX.playPop(); onClose(); }}
                className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase rounded-full text-xs shadow-lg shadow-yellow-400/20"
              >
                RETURN TO COMIC STORE
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
