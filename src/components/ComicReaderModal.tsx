import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  BookOpen, 
  ArrowRightLeft, 
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Comic } from '../types/comic';
import { soundFX } from '../utils/audio';

interface ComicReaderModalProps {
  comic: Comic | null;
  onClose: () => void;
  onAddToCart: (comic: Comic) => void;
}

export const ComicReaderModal: React.FC<ComicReaderModalProps> = ({
  comic,
  onClose,
  onAddToCart
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isMangaMode, setIsMangaMode] = useState(false);
  const [textureOverlay, setTextureOverlay] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentPageIndex(0);
    setZoomLevel(1);
  }, [comic]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!comic) return;
      if (e.key === 'ArrowRight') {
        if (isMangaMode) handlePrevPage();
        else handleNextPage();
      } else if (e.key === 'ArrowLeft') {
        if (isMangaMode) handleNextPage();
        else handlePrevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [comic, currentPageIndex, isMangaMode]);

  if (!comic || !comic.previewPages || comic.previewPages.length === 0) return null;

  const pages = comic.previewPages;
  const currentPage = pages[currentPageIndex];

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      soundFX.playPageTurn();
      setCurrentPageIndex(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      soundFX.playPageTurn();
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const toggleFullscreen = () => {
    soundFX.playPop();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* Top Reader Controls Bar */}
      <div className="bg-[#1E293B]/95 border-b border-slate-700 px-4 py-2.5 flex items-center justify-between z-30">
        
        {/* Left: Comic Metadata */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-yellow-400/20 text-yellow-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-black italic uppercase text-white tracking-wide flex items-center gap-2">
              <span>{comic.title}</span>
              <span className="text-yellow-400">{comic.issueNumber}</span>
              <span className="text-[10px] bg-red-600/90 text-white font-mono font-bold px-2 py-0.5 rounded-full">SAMPLE PREVIEW</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">
              Page {currentPageIndex + 1} of {pages.length} • {comic.publisher}
            </p>
          </div>
        </div>

        {/* Center: Reading Settings & Controls */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700">
          
          {/* Zoom controls */}
          <button
            onClick={() => { soundFX.playPop(); setZoomLevel(prev => Math.max(0.8, prev - 0.2)); }}
            className="p-1 text-slate-400 hover:text-white rounded-full"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] font-mono text-slate-300 w-10 text-center font-bold">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            onClick={() => { soundFX.playPop(); setZoomLevel(prev => Math.min(2.0, prev + 0.2)); }}
            className="p-1 text-slate-400 hover:text-white rounded-full"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <span className="w-px h-3.5 bg-slate-700" />

          {/* Reading Direction Toggle (Manga vs Western) */}
          <button
            onClick={() => { soundFX.playPop(); setIsMangaMode(!isMangaMode); }}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
              isMangaMode ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
            title="Toggle Manga Right-to-Left Mode"
          >
            <ArrowRightLeft className="w-3 h-3" />
            <span>{isMangaMode ? 'Manga (R to L)' : 'Western (L to R)'}</span>
          </button>

          <span className="w-px h-3.5 bg-slate-700" />

          {/* Paper texture */}
          <button
            onClick={() => { soundFX.playPop(); setTextureOverlay(!textureOverlay); }}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-colors ${
              textureOverlay ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' : 'text-slate-400'
            }`}
            title="Toggle authentic comic paper grain texture"
          >
            Paper Grain
          </button>
        </div>

        {/* Right: Actions and Close */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundFX.playCoin();
              onAddToCart(comic);
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase rounded-full text-xs shadow-md shadow-yellow-400/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy Issue (${comic.price.toFixed(2)})</span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => { soundFX.playPop(); onClose(); }}
            className="p-2 text-slate-400 hover:text-red-400 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors"
            title="Close Reader"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Comic Viewer Area */}
      <div className="relative flex-1 flex items-center justify-center overflow-auto p-4 sm:p-8">
        
        {/* Navigation Arrow Left */}
        <button
          onClick={isMangaMode ? handleNextPage : handlePrevPage}
          disabled={isMangaMode ? currentPageIndex === pages.length - 1 : currentPageIndex === 0}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 disabled:opacity-20 disabled:hover:bg-slate-900 disabled:hover:text-white transition-all shadow-2xl active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Page Container */}
        <div 
          className="relative max-h-full max-w-4xl rounded-lg shadow-2xl border-4 border-slate-900 overflow-hidden bg-slate-950 transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Halftone / Paper Texture Overlay */}
          {textureOverlay && (
            <div className="absolute inset-0 bg-halftone opacity-25 pointer-events-none mix-blend-overlay z-10" />
          )}

          {/* Comic Page Image */}
          <img
            src={currentPage.imageUrl}
            alt={`Page ${currentPageIndex + 1}`}
            className="max-h-[75vh] w-auto object-contain mx-auto select-none pointer-events-none"
          />

          {/* Dialogue & Scene Caption Overlay */}
          {(currentPage.caption || currentPage.dialoguePreview) && (
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 text-white z-20">
              {currentPage.caption && (
                <div className="text-xs text-amber-300 font-semibold mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>{currentPage.caption}</span>
                </div>
              )}
              {currentPage.dialoguePreview && (
                <div className="text-xs text-slate-200 font-mono italic bg-slate-900/80 p-2 rounded border-l-2 border-amber-400">
                  {currentPage.dialoguePreview}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Arrow Right */}
        <button
          onClick={isMangaMode ? handlePrevPage : handleNextPage}
          disabled={isMangaMode ? currentPageIndex === 0 : currentPageIndex === pages.length - 1}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-slate-900/80 hover:bg-amber-400 hover:text-slate-950 text-white border border-slate-700 disabled:opacity-20 disabled:hover:bg-slate-900 disabled:hover:text-white transition-all shadow-2xl active:scale-95"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

      </div>

      {/* Bottom Thumbnails Strip */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-4 py-2.5 flex items-center justify-center gap-3 z-30">
        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">PAGES:</span>
        <div className="flex items-center gap-2 overflow-x-auto max-w-xl py-1">
          {pages.map((p, index) => (
            <button
              key={index}
              onClick={() => { soundFX.playPageTurn(); setCurrentPageIndex(index); }}
              className={`relative rounded border-2 overflow-hidden w-10 h-14 shrink-0 transition-all ${
                currentPageIndex === index 
                  ? 'border-amber-400 scale-110 shadow-md shadow-amber-400/20' 
                  : 'border-slate-700 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={p.imageUrl} alt={`Page ${index + 1}`} className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 bg-slate-950/80 text-[8px] font-mono text-white px-1">
                {index + 1}
              </span>
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400 font-mono">
          Use ← → arrow keys to flip
        </span>
      </div>

    </div>
  );
};
