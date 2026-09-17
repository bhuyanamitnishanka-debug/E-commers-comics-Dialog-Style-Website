import React, { useState, useMemo } from 'react';
import { 
  INITIAL_COMICS, 
  INITIAL_AUCTIONS, 
  INITIAL_STORYLINES, 
  INITIAL_PULL_SUBSCRIPTIONS, 
  INITIAL_VAULT_ITEMS 
} from './data/comicsData';
import { Comic, VariantOption, CartItem, PullSubscription, VaultItem, AuctionItem, StorylineEvent, ReadingOrderItem } from './types/comic';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ComicCard } from './components/ComicCard';
import { ComicFilters } from './components/ComicFilters';
import { ComicModal } from './components/ComicModal';
import { ComicReaderModal } from './components/ComicReaderModal';
import { PullboxManager } from './components/PullboxManager';
import { CollectorVault } from './components/CollectorVault';
import { LiveAuctions } from './components/LiveAuctions';
import { ReadingOrderGuide } from './components/ReadingOrderGuide';
import { GradingSimulator } from './components/GradingSimulator';
import { MatchmakerAI } from './components/MatchmakerAI';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';
import { soundFX } from './utils/audio';
import { Sparkles, Flame, CheckCircle2, ShoppingBag } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>('store');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Audio State
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Core Data State
  const [comics] = useState<Comic[]>(INITIAL_COMICS);
  const [auctions, setAuctions] = useState<AuctionItem[]>(INITIAL_AUCTIONS);
  const [pullSubscriptions, setPullSubscriptions] = useState<PullSubscription[]>(INITIAL_PULL_SUBSCRIPTIONS);
  const [vaultItems, setVaultItems] = useState<VaultItem[]>(INITIAL_VAULT_ITEMS);
  const [storylines] = useState<StorylineEvent[]>(INITIAL_STORYLINES);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      comic: INITIAL_COMICS[0],
      quantity: 1,
      bagAndBoard: true,
      digitalCopyIncluded: true
    }
  ]);
  const [wishlist, setWishlist] = useState<Comic[]>([INITIAL_COMICS[1]]);

  // Filter States
  const [selectedPublisher, setSelectedPublisher] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [cgcOnly, setCgcOnly] = useState<boolean>(false);

  // Modals
  const [detailComic, setDetailComic] = useState<Comic | null>(null);
  const [readerComic, setReaderComic] = useState<Comic | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundFX.setMuted(next);
    if (!next) soundFX.playPop();
  };

  // Cart Operations
  const handleAddToCart = (comic: Comic, variant?: VariantOption, bagAndBoard: boolean = true) => {
    soundFX.playCoin();
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.comic.id === comic.id && item.selectedVariant?.id === variant?.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [
        ...prev,
        {
          comic,
          selectedVariant: variant,
          quantity: 1,
          bagAndBoard,
          digitalCopyIncluded: true
        }
      ];
    });
    triggerToast(`Added "${comic.title} ${comic.issueNumber}" to your cart!`);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  // Wishlist Operations
  const handleToggleWishlist = (comic: Comic) => {
    setWishlist(prev => {
      const exists = prev.some(c => c.id === comic.id);
      if (exists) {
        triggerToast(`Removed "${comic.title}" from Wishlist`);
        return prev.filter(c => c.id !== comic.id);
      } else {
        triggerToast(`Saved "${comic.title}" to your Wishlist!`);
        return [...prev, comic];
      }
    });
  };

  // Pullbox Operations
  const handleAddToPullbox = (comic: Comic) => {
    soundFX.playPop();
    const existing = pullSubscriptions.find(s => s.seriesName === (comic.series || comic.title));
    if (existing) {
      triggerToast(`"${comic.series || comic.title}" is already in your Weekly Pullbox!`);
      setActiveTab('pullbox');
      return;
    }

    const newSub: PullSubscription = {
      id: `sub-${Date.now()}`,
      seriesName: comic.series || comic.title,
      publisher: comic.publisher,
      coverPreference: 'Cover A (Standard)',
      frequency: 'Monthly Box',
      addedDate: new Date().toISOString().split('T')[0],
      nextIssue: `Issue #${parseInt(comic.issueNumber.replace('#', '') || '1') + 1}`,
      nextReleaseDate: 'Wednesday (NCBD)',
      estimatedPrice: comic.price,
      coverImage: comic.coverImage,
      bagAndBoardAlways: true,
      status: 'Active'
    };

    setPullSubscriptions(prev => [newSub, ...prev]);
    triggerToast(`Subscribed to "${comic.series || comic.title}" in your Weekly Pullbox!`);
    setActiveTab('pullbox');
    try {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const handleAddPullSubscription = (sub: PullSubscription) => {
    setPullSubscriptions(prev => [sub, ...prev]);
    triggerToast(`Subscribed to ${sub.seriesName}!`);
  };

  const handleRemovePullSubscription = (id: string) => {
    setPullSubscriptions(prev => prev.filter(s => s.id !== id));
    triggerToast('Pullbox subscription removed.');
  };

  const handleTogglePausePull = (id: string) => {
    setPullSubscriptions(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
        triggerToast(`Pull list for ${s.seriesName} is now ${nextStatus}.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  // Vault Operations
  const handleAddVaultItem = (item: VaultItem) => {
    setVaultItems(prev => [item, ...prev]);
    triggerToast(`Vaulted "${item.title} ${item.issueNumber}" in your portfolio!`);
  };

  const handleRemoveVaultItem = (id: string) => {
    setVaultItems(prev => prev.filter(i => i.id !== id));
    triggerToast('Item removed from Vault.');
  };

  // Auction Operations
  const handlePlaceBid = (auctionId: string, amount: number, bidderName: string) => {
    setAuctions(prev => prev.map(auc => {
      if (auc.id === auctionId) {
        const newBid = {
          id: `bid-${Date.now()}`,
          bidderName: bidderName || 'You (High Bidder)',
          bidderAvatar: '👑',
          amount: amount,
          timestamp: 'Just now'
        };
        triggerToast(`Bid of $${amount.toFixed(2)} placed on ${auc.title}! You are highest bidder.`);
        return {
          ...auc,
          currentBid: amount,
          bidCount: auc.bidCount + 1,
          bids: [newBid, ...auc.bids]
        };
      }
      return auc;
    }));
  };

  const handleBuyItNow = (auction: AuctionItem) => {
    soundFX.playCoin();
    // Convert auction to a comic item for cart
    const grailComic: Comic = {
      id: `grail-${auction.id}`,
      title: auction.title,
      issueNumber: auction.issueNumber,
      series: auction.title,
      publisher: auction.publisher,
      genres: ['Superhero'],
      format: 'CGC Graded Slab',
      era: 'Modern Age',
      price: auction.buyItNowPrice || auction.currentBid,
      coverImage: auction.coverImage,
      releaseDate: '2024-01-01',
      rating: 5.0,
      reviewCount: 1,
      description: auction.conditionDescription,
      creators: [{ name: 'Certified Vault Consignment', role: 'Cover Artist' }],
      pageCount: 36,
      diamondCode: 'VAULT-CGC-KEY',
      cgcGrade: auction.cgcGrade,
      cgcCertNumber: auction.cgcCertNumber,
      cgcLabelType: auction.cgcLabel,
      inStock: true,
      stockQuantity: 1,
      isGrail: true
    };
    handleAddToCart(grailComic);
    setIsCartOpen(true);
  };

  // Storyline Bundles
  const handleAddReadingOrderItem = (item: ReadingOrderItem) => {
    const foundComic = comics.find(c => c.id === item.comicId) || {
      id: item.comicId,
      title: item.title,
      issueNumber: item.issue,
      series: item.title,
      publisher: 'Marvel',
      genres: ['Superhero'] as const,
      format: 'Single Issue' as const,
      era: 'Modern Age' as const,
      price: item.price,
      coverImage: item.coverImage,
      releaseDate: '2024-01-01',
      rating: 4.9,
      reviewCount: 45,
      description: item.description,
      creators: [{ name: 'Creative Team', role: 'Writer' as const }],
      pageCount: 32,
      diamondCode: 'READ-RUN',
      inStock: true,
      stockQuantity: 10
    };
    handleAddToCart(foundComic);
  };

  const handleAddFullStorylineToCart = (storyline: StorylineEvent) => {
    storyline.issues.forEach(issue => {
      handleAddReadingOrderItem(issue);
    });
    triggerToast(`Added all ${storyline.issues.length} issues in "${storyline.name}" to cart with 15% bundle discount!`);
    setIsCartOpen(true);
  };

  // Filtered & Sorted Comics Catalog
  const filteredComics = useMemo(() => {
    return comics.filter(comic => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = comic.title.toLowerCase().includes(q);
        const matchesSeries = comic.series.toLowerCase().includes(q);
        const matchesPublisher = comic.publisher.toLowerCase().includes(q);
        const matchesKey = comic.keyNotes?.toLowerCase().includes(q);
        const matchesCreator = comic.creators.some(c => c.name.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSeries && !matchesPublisher && !matchesKey && !matchesCreator) {
          return false;
        }
      }

      // Publisher
      if (selectedPublisher !== 'All' && comic.publisher !== selectedPublisher) {
        return false;
      }

      // Genre
      if (selectedGenre !== 'All' && !comic.genres.includes(selectedGenre as any)) {
        return false;
      }

      // Format
      if (selectedFormat !== 'All' && comic.format !== selectedFormat) {
        return false;
      }

      // Stock
      if (inStockOnly && !comic.inStock) {
        return false;
      }

      // CGC Slabs
      if (cgcOnly && comic.format !== 'CGC Graded Slab') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.releaseDate.localeCompare(a.releaseDate);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      // Default: featured first
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [comics, searchQuery, selectedPublisher, selectedGenre, selectedFormat, inStockOnly, cgcOnly, sortBy]);

  const handleResetFilters = () => {
    setSelectedPublisher('All');
    setSelectedGenre('All');
    setSelectedFormat('All');
    setSortBy('featured');
    setInStockOnly(false);
    setCgcOnly(false);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col selection:bg-yellow-400 selection:text-black font-sans">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-yellow-400 text-black px-5 py-2.5 rounded-full font-black uppercase tracking-wider text-xs shadow-2xl flex items-center gap-2 animate-bounce border-2 border-slate-900 shadow-yellow-400/20">
          <Sparkles className="w-4 h-4 text-black" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        openCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        wishlistCount={wishlist.length}
        openWishlistModal={() => setIsWishlistOpen(true)}
        isMuted={isMuted}
        toggleMute={toggleMute}
        activePullboxCount={pullSubscriptions.filter(s => s.status === 'Active').length}
        activeAuctionCount={auctions.length}
      />

      {/* Main App Content Body */}
      <main className="flex-1">
        
        {/* Tab 1: Comics Store & Catalog */}
        {activeTab === 'store' && (
          <div>
            {/* Top Hero Showcase */}
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onPullboxClick={() => setActiveTab('pullbox')}
              onAuctionsClick={() => setActiveTab('auctions')}
            />

            {/* Catalog Grid Section */}
            <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
              
              {/* Filter Bar */}
              <ComicFilters
                selectedPublisher={selectedPublisher}
                setSelectedPublisher={setSelectedPublisher}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedFormat={selectedFormat}
                setSelectedFormat={setSelectedFormat}
                sortBy={sortBy}
                setSortBy={setSortBy}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                cgcOnly={cgcOnly}
                setCgcOnly={setCgcOnly}
                onResetFilters={handleResetFilters}
                totalResults={filteredComics.length}
              />

              {/* Comic Cards Grid */}
              {filteredComics.length === 0 ? (
                <div className="bg-[#1E293B] border border-slate-700/80 rounded-3xl p-12 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-900 text-slate-500 mx-auto flex items-center justify-center border border-slate-700">
                    <Flame className="w-8 h-8 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-black italic uppercase text-white">No Comics Matched Your Search</h3>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Try broadening your filters or clearing search terms to explore all available issues.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-yellow-400 text-black font-black uppercase tracking-wider rounded-full text-xs shadow-md shadow-yellow-400/20"
                  >
                    RESET ALL FILTERS
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
                  {filteredComics.map((comic) => (
                    <ComicCard
                      key={comic.id}
                      comic={comic}
                      onOpenDetails={(c) => setDetailComic(c)}
                      onOpenReader={(c) => setReaderComic(c)}
                      onAddToCart={(c) => handleAddToCart(c)}
                      onAddToPullbox={(c) => handleAddToPullbox(c)}
                      isWishlisted={wishlist.some(w => w.id === comic.id)}
                      onToggleWishlist={(c) => handleToggleWishlist(c)}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* Tab 2: Pullbox Weekly Subscription Hub */}
        {activeTab === 'pullbox' && (
          <PullboxManager
            subscriptions={pullSubscriptions}
            onAddSubscription={handleAddPullSubscription}
            onRemoveSubscription={handleRemovePullSubscription}
            onTogglePause={handleTogglePausePull}
            availableComics={comics}
            onOpenComic={(c) => setDetailComic(c)}
          />
        )}

        {/* Tab 3: Slab Vault Portfolio */}
        {activeTab === 'vault' && (
          <CollectorVault
            vaultItems={vaultItems}
            onAddVaultItem={handleAddVaultItem}
            onRemoveVaultItem={handleRemoveVaultItem}
          />
        )}

        {/* Tab 4: Live Auctions */}
        {activeTab === 'auctions' && (
          <LiveAuctions
            auctions={auctions}
            onPlaceBid={handlePlaceBid}
            onBuyItNow={handleBuyItNow}
          />
        )}

        {/* Tab 5: Reading Order Guide */}
        {activeTab === 'reading-order' && (
          <ReadingOrderGuide
            storylines={storylines}
            onAddIssueToCart={handleAddReadingOrderItem}
            onAddFullStorylineToCart={handleAddFullStorylineToCart}
          />
        )}

        {/* Tab 6: Grading Lab */}
        {activeTab === 'grading' && (
          <GradingSimulator />
        )}

        {/* Tab 7: Comic Oracle AI */}
        {activeTab === 'matchmaker' && (
          <MatchmakerAI
            comics={comics}
            onOpenComic={(c) => setDetailComic(c)}
            onAddToCart={(c) => handleAddToCart(c)}
          />
        )}

      </main>

      {/* Product Detail Modal */}
      {detailComic && (
        <ComicModal
          comic={detailComic}
          onClose={() => setDetailComic(null)}
          onAddToCart={(comic, variant, bagAndBoard) => handleAddToCart(comic, variant, bagAndBoard)}
          onAddToPullbox={(comic) => handleAddToPullbox(comic)}
          onOpenReader={(comic) => setReaderComic(comic)}
          isWishlisted={wishlist.some(w => w.id === detailComic.id)}
          onToggleWishlist={(comic) => handleToggleWishlist(comic)}
        />
      )}

      {/* Full-Screen Comic Reader Modal */}
      {readerComic && (
        <ComicReaderModal
          comic={readerComic}
          onClose={() => setReaderComic(null)}
          onAddToCart={(comic) => handleAddToCart(comic)}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderComplete={() => {
          setCartItems([]);
        }}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistComics={wishlist}
        onRemoveFromWishlist={(comic) => handleToggleWishlist(comic)}
        onAddToCart={(comic) => handleAddToCart(comic)}
        onOpenDetails={(comic) => setDetailComic(comic)}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
