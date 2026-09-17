import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  Flame, 
  Search, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Layers, 
  Gavel, 
  BookOpen, 
  Heart,
  Calendar,
  Compass
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlistCount: number;
  openWishlistModal: () => void;
  isMuted: boolean;
  toggleMute: () => void;
  activePullboxCount: number;
  activeAuctionCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  searchQuery,
  setSearchQuery,
  wishlistCount,
  openWishlistModal,
  isMuted,
  toggleMute,
  activePullboxCount,
  activeAuctionCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'store', label: 'Comics Store', icon: BookOpen },
    { id: 'pullbox', label: 'Weekly Pullbox', icon: Calendar, badge: activePullboxCount > 0 ? activePullboxCount : undefined, badgeColor: 'bg-yellow-400 text-black' },
    { id: 'vault', label: 'My Slab Vault', icon: ShieldCheck },
    { id: 'auctions', label: 'Live Grails', icon: Gavel, badge: activeAuctionCount > 0 ? `${activeAuctionCount} Live` : undefined, badgeColor: 'bg-red-600 text-white animate-pulse' },
    { id: 'reading-order', label: 'Reading Roadmap', icon: Layers },
    { id: 'grading', label: 'Grading Lab', icon: Sparkles },
    { id: 'matchmaker', label: 'Comic Oracle', icon: Compass }
  ];

  const handleTabClick = (tabId: string) => {
    soundFX.playPop();
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-800 shadow-2xl">
      {/* Top Ticker Notification Banner */}
      <div className="bg-yellow-400 text-slate-950 text-xs font-black px-4 py-1.5 flex items-center justify-between overflow-hidden tracking-tight uppercase">
        <div className="flex items-center gap-2 mx-auto md:mx-0">
          <span className="bg-black text-yellow-400 text-[9px] px-1.5 py-0.5 rounded font-black tracking-wider">NCBD LIVE</span>
          <span className="font-bold">ALL WEDNESDAY RELEASES INCLUDE FREE 2MIL ARCHIVAL BAG & BACKING BOARD</span>
          <span className="hidden md:inline font-mono bg-black text-white px-2 py-0.5 rounded text-[10px] ml-1">USE: MULTIVERSE20</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[11px] font-bold text-slate-950">
          <span>⚡ Gem-Mint 9.8 Guarantee</span>
          <span>🛡️ CGC & CBCS Verified</span>
          <span>📦 Free US Shipping on $49+</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo in Bento Grid Style */}
          <div 
            onClick={() => handleTabClick('store')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-yellow-400 rounded-sm flex items-center justify-center font-black text-black text-lg transform -rotate-6 shadow-md shadow-yellow-400/30 group-hover:rotate-0 transition-transform duration-200">
              C
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tighter uppercase italic text-white group-hover:text-yellow-400 transition-colors">
                  COMICHUB <span className="text-yellow-400 group-hover:text-white transition-colors">PRO</span>
                </span>
                <span className="bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded uppercase tracking-widest">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Collector Vault & Marketplace</p>
            </div>
          </div>

          {/* Search Bar (Desktop - Bento Rounded Full) */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4 relative">
            <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by series, artist, CGC 9.8, or issue #..."
              className="w-full bg-slate-900 border border-slate-700 rounded-full py-2 pl-10 pr-9 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Right Bento Action Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Quick Portfolio Pulse Metric */}
            <div 
              onClick={() => handleTabClick('vault')}
              className="hidden sm:block text-right cursor-pointer bg-slate-900/80 px-3 py-1 rounded-2xl border border-slate-800 hover:border-yellow-400/40 transition-colors"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Vault Value</p>
              <p className="text-xs font-mono font-bold text-green-400 flex items-center justify-end gap-1">
                <span>$14,842.50</span>
                <span className="text-[9px] text-green-500">▲</span>
              </p>
            </div>

            {/* Audio FX Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              className="p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-400 hover:text-yellow-400 hover:border-yellow-400/50 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-slate-500" /> : <Volume2 className="w-4 h-4 text-yellow-400" />}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => { soundFX.playPop(); openWishlistModal(); }}
              title="View Wishlist"
              className="relative p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-400/50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white font-mono text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Pill CTA Button */}
            <button
              onClick={() => { soundFX.playPop(); openCart(); }}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black rounded-full shadow-lg shadow-yellow-400/20 active:scale-95 transition-all text-xs uppercase tracking-tight"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold">CART</span>
              <span className="bg-black text-yellow-400 font-mono text-xs px-1.5 py-0.2 rounded-full font-black">
                {cartCount}
              </span>
            </button>

            {/* Collector Avatar Badge */}
            <div 
              onClick={() => handleTabClick('vault')}
              title="Collector Profile"
              className="w-9 h-9 rounded-full bg-slate-700 border-2 border-yellow-400 overflow-hidden cursor-pointer hover:scale-105 transition-transform shrink-0"
            >
              <div className="w-full h-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-black text-xs text-white">
                NX
              </div>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-slate-900 border border-slate-700 text-slate-300"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 w-full bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 lg:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search series, artists, CGC slabs..."
              className="w-full bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
          </div>
        </div>

        {/* Navigation Tabs (Desktop Bento Pill Nav) */}
        <nav className="hidden lg:flex items-center gap-1.5 mt-3 pt-2.5 border-t border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`${item.badgeColor} font-mono text-[9px] font-black px-1.5 py-0.2 rounded-full`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A] border-b border-slate-800 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider ${
                  isActive ? 'bg-yellow-400 text-black font-black' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`${item.badgeColor} font-mono text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

