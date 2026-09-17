import React, { useState } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Download, 
  Trash2, 
  Award, 
  Sparkles, 
  ExternalLink,
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { VaultItem } from '../types/comic';
import { soundFX } from '../utils/audio';
import confetti from 'canvas-confetti';

interface CollectorVaultProps {
  vaultItems: VaultItem[];
  onAddVaultItem: (item: VaultItem) => void;
  onRemoveVaultItem: (id: string) => void;
}

export const CollectorVault: React.FC<CollectorVaultProps> = ({
  vaultItems,
  onAddVaultItem,
  onRemoveVaultItem
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(vaultItems[0] || null);
  const [searchVault, setSearchVault] = useState('');
  
  // Form fields for adding new item
  const [newTitle, setNewTitle] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newPublisher, setNewPublisher] = useState<'Marvel' | 'DC Comics' | 'Image Comics' | 'Dark Horse' | 'Manga/Kodansha' | 'Indie / Creator-Owned'>('Marvel');
  const [newCompany, setNewCompany] = useState<'CGC' | 'CBCS' | 'PGX' | 'Raw'>('CGC');
  const [newGrade, setNewGrade] = useState('9.8');
  const [newCert, setNewCert] = useState('');
  const [newPurchasePrice, setNewPurchasePrice] = useState('100');
  const [newCurrentValue, setNewCurrentValue] = useState('180');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80');

  // Stats calculation
  const totalCostBasis = vaultItems.reduce((acc, item) => acc + item.purchasePrice, 0);
  const totalMarketValue = vaultItems.reduce((acc, item) => acc + item.currentMarketValue, 0);
  const totalProfit = totalMarketValue - totalCostBasis;
  const profitPercentage = totalCostBasis > 0 ? (totalProfit / totalCostBasis) * 100 : 0;
  const gradedCount = vaultItems.filter(i => i.isGraded).length;

  const filteredItems = vaultItems.filter(item => 
    item.title.toLowerCase().includes(searchVault.toLowerCase()) ||
    item.publisher.toLowerCase().includes(searchVault.toLowerCase()) ||
    item.issueNumber.toLowerCase().includes(searchVault.toLowerCase())
  );

  const handleCreateVaultItem = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playPop();

    const cost = parseFloat(newPurchasePrice) || 0;
    const value = parseFloat(newCurrentValue) || 0;
    const isGraded = newCompany !== 'Raw';

    const item: VaultItem = {
      id: `vault-${Date.now()}`,
      title: newTitle || 'Custom Comic Book',
      issueNumber: newIssue.startsWith('#') ? newIssue : `#${newIssue}`,
      publisher: newPublisher,
      coverImage: newImage,
      isGraded: isGraded,
      gradingCompany: newCompany,
      grade: isGraded ? parseFloat(newGrade) || 9.8 : undefined,
      gradeLabel: isGraded ? `${newCompany} ${newGrade} Universal` : 'Raw VF/NM',
      certNumber: newCert || `${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      purchasePrice: cost,
      currentMarketValue: value,
      purchaseDate: new Date().toISOString().split('T')[0],
      priceHistory: [
        { date: 'Purchase', value: cost },
        { date: 'Today', value: value }
      ]
    };

    onAddVaultItem(item);
    setSelectedVaultItem(item);
    setShowAddModal(false);

    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } catch {}
  };

  const handleExportCSV = () => {
    soundFX.playPop();
    const headers = ['Title', 'Issue', 'Publisher', 'Grading Company', 'Grade', 'Cert #', 'Purchase Price', 'Current Value', 'Purchase Date'];
    const rows = vaultItems.map(i => [
      `"${i.title}"`,
      `"${i.issueNumber}"`,
      `"${i.publisher}"`,
      `"${i.gradingCompany || 'Raw'}"`,
      i.grade || '',
      `"${i.certNumber || ''}"`,
      i.purchasePrice,
      i.currentMarketValue,
      `"${i.purchaseDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Nexus_Comic_Vault_Portfolio_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Vault Portfolio Analytics Header */}
      <div className="relative overflow-hidden bg-[#1E293B] border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Certified Collector Vault & Live Valuation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl text-white font-black italic uppercase tracking-tight">
              MY SLAB VAULT <span className="text-yellow-400">& PORTFOLIO</span>
            </h1>
            <p className="text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
              Track real-time market value, certified grading serial numbers, profit margins, and historical price movements of your personal comic collection.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => { soundFX.playPop(); setShowAddModal(true); }}
              className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase tracking-wider rounded-full text-xs flex items-center gap-2 shadow-lg shadow-yellow-400/20 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 text-black" />
              <span>ADD TO VAULT</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold uppercase tracking-wider rounded-full text-xs border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4 text-yellow-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Portfolio Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Portfolio Market Value</span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
              ${totalMarketValue.toFixed(2)}
            </div>
            <span className="text-[10px] text-green-400 font-mono font-semibold">Live census estimates</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Cost Basis</span>
            <div className="text-2xl sm:text-3xl font-black text-slate-300 font-mono mt-1">
              ${totalCostBasis.toFixed(2)}
            </div>
            <span className="text-[10px] text-slate-500 font-mono">Initial investment</span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Net Gain / Loss</span>
            <div className={`text-2xl sm:text-3xl font-black font-mono mt-1 flex items-center gap-1.5 ${
              totalProfit >= 0 ? 'text-green-400' : 'text-rose-400'
            }`}>
              <TrendingUp className="w-5 h-5" />
              <span>+${totalProfit.toFixed(2)}</span>
            </div>
            <span className={`text-[10px] font-mono font-bold ${totalProfit >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
              +{profitPercentage.toFixed(1)}% Return
            </span>
          </div>

          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-700/80">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Slabs & Raw</span>
            <div className="text-2xl sm:text-3xl font-black text-yellow-400 font-mono mt-1">
              {vaultItems.length} <span className="text-xs text-slate-400 font-normal">({gradedCount} Graded)</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">100% Insured in Vault</span>
          </div>

        </div>
      </div>

      {/* Main Interactive Slab Showcase & Inventory List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Selected Slab 3D Holographic Viewer */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-black italic uppercase text-white tracking-wide flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>3D SLAB CASE INSPECTOR</span>
          </h3>

          {selectedVaultItem ? (
            <div className="relative rounded-3xl bg-[#1E293B] p-4 border border-slate-700 shadow-2xl">
              
              {/* Top Slab Label */}
              <div className="rounded-2xl p-3 flex items-center justify-between font-bold bg-yellow-400 text-black mb-3">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-black" />
                    <span className="font-black italic uppercase text-lg tracking-tight">
                      {selectedVaultItem.gradingCompany || 'CGC'} {selectedVaultItem.grade || '9.8'}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-tight opacity-90 font-bold">
                    {selectedVaultItem.gradeLabel}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono block font-black">CERT #{selectedVaultItem.certNumber}</span>
                  <span className="text-[9px] uppercase tracking-widest opacity-80 font-bold">White Pages</span>
                </div>
              </div>

              {/* Cover Artwork */}
              <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-950 border border-slate-700/80 group">
                <img 
                  src={selectedVaultItem.coverImage} 
                  alt={selectedVaultItem.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hologram shine overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity" />
              </div>

              {/* Signatures if any */}
              {selectedVaultItem.signatures && (
                <div className="mt-3 bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-2.5 text-center text-xs">
                  <span className="text-[10px] text-yellow-400 font-bold uppercase block">Witnessed Signature Series:</span>
                  <span className="text-white font-medium">{selectedVaultItem.signatures.join(', ')}</span>
                </div>
              )}

              {/* Detail Metrics */}
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs bg-slate-900/90 p-3.5 rounded-2xl border border-slate-700/80">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Cost Basis:</span>
                  <span className="font-mono font-bold text-slate-300 text-sm">${selectedVaultItem.purchasePrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Market:</span>
                  <span className="font-mono font-bold text-green-400 text-sm">${selectedVaultItem.currentMarketValue.toFixed(2)}</span>
                </div>
                <div className="col-span-2 pt-2 border-t border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Collector Notes:</span>
                  <span className="text-slate-300 italic">{selectedVaultItem.notes || 'Pristine preservation slab in climate controlled vault.'}</span>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-8 text-center text-slate-400">
              Select an item from the vault to inspect.
            </div>
          )}
        </div>

        {/* Right Side: Inventory Table & Search */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-black italic uppercase text-white tracking-wide flex items-center gap-2">
              <span>VAULT INVENTORY ({filteredItems.length})</span>
            </h3>

            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                value={searchVault}
                onChange={(e) => setSearchVault(e.target.value)}
                placeholder="Search your collection..."
                className="w-full bg-slate-900 border border-slate-700 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredItems.map((item) => {
              const isSelected = selectedVaultItem?.id === item.id;
              const profit = item.currentMarketValue - item.purchasePrice;
              const profitPct = item.purchasePrice > 0 ? (profit / item.purchasePrice) * 100 : 0;

              return (
                <div
                  key={item.id}
                  onClick={() => { soundFX.playPop(); setSelectedVaultItem(item); }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-[#1E293B] border-yellow-400 shadow-lg shadow-yellow-400/5 ring-1 ring-yellow-400/40' 
                      : 'bg-[#1E293B]/70 border-slate-700/80 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.coverImage} 
                      alt={item.title} 
                      className="w-12 aspect-[2/3] object-cover rounded-xl border border-slate-700 shrink-0" 
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white line-clamp-1">{item.title}</span>
                        <span className="font-comic text-yellow-400 text-sm">{item.issueNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                        <span className="bg-slate-900 px-2 py-0.5 rounded-full font-mono font-bold text-yellow-400 border border-slate-700">
                          {item.gradingCompany || 'Raw'} {item.grade || ''}
                        </span>
                        <span>•</span>
                        <span>{item.publisher}</span>
                        <span>•</span>
                        <span className="font-mono">Cert #{item.certNumber?.slice(0, 6)}...</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-mono font-bold text-sm text-white">
                        ${item.currentMarketValue.toFixed(2)}
                      </div>
                      <div className={`text-[10px] font-mono font-bold ${profit >= 0 ? 'text-green-400' : 'text-rose-400'}`}>
                        {profit >= 0 ? `+${profitPct.toFixed(0)}%` : `${profitPct.toFixed(0)}%`}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFX.playPop();
                        onRemoveVaultItem(item.id);
                      }}
                      className="p-2 text-slate-400 hover:text-red-400 rounded-full hover:bg-slate-900 border border-transparent hover:border-slate-700 transition-colors"
                      title="Remove from vault"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Add Item to Vault Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl p-6 sm:p-7 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black italic uppercase text-white tracking-wide">
              ADD COMIC / SLAB TO <span className="text-yellow-400">PORTFOLIO</span>
            </h3>

            <form onSubmit={handleCreateVaultItem} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Comic Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Uncanny X-Men"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Issue #</label>
                  <input
                    type="text"
                    required
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    placeholder="e.g. #1"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Company</label>
                  <select
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value as typeof newCompany)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400"
                  >
                    <option value="CGC">CGC</option>
                    <option value="CBCS">CBCS</option>
                    <option value="PGX">PGX</option>
                    <option value="Raw">Raw (Ungraded)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400"
                  >
                    <option value="10.0">10.0 (Gem Mint)</option>
                    <option value="9.8">9.8 (NM/M)</option>
                    <option value="9.6">9.6 (NM+)</option>
                    <option value="9.4">9.4 (NM)</option>
                    <option value="9.0">9.0 (VF/NM)</option>
                    <option value="8.0">8.0 (VF)</option>
                    <option value="6.0">6.0 (FN)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Publisher</label>
                  <select
                    value={newPublisher}
                    onChange={(e) => setNewPublisher(e.target.value as typeof newPublisher)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400"
                  >
                    <option value="Marvel">Marvel</option>
                    <option value="DC Comics">DC Comics</option>
                    <option value="Image Comics">Image</option>
                    <option value="Dark Horse">Dark Horse</option>
                    <option value="Manga/Kodansha">Manga</option>
                    <option value="Indie / Creator-Owned">Indie</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Purchase Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newPurchasePrice}
                    onChange={(e) => setNewPurchasePrice(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Current Est. Value ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCurrentValue}
                    onChange={(e) => setNewCurrentValue(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Certification #</label>
                <input
                  type="text"
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                  placeholder="e.g. 4392817001"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:border-yellow-400 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-5 py-2.5 bg-slate-900 text-slate-300 rounded-full text-xs font-bold uppercase hover:bg-slate-800 border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-black uppercase text-xs rounded-full shadow-lg shadow-yellow-400/20"
                >
                  STORE IN VAULT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
