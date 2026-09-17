export type Publisher = 'Marvel' | 'DC Comics' | 'Image Comics' | 'Dark Horse' | 'Manga/Kodansha' | 'Indie / Creator-Owned';

export type Genre = 
  | 'Superhero' 
  | 'Sci-Fi / Cyberpunk' 
  | 'Dark Fantasy' 
  | 'Horror' 
  | 'Crime & Noir' 
  | 'Action / Shonen' 
  | 'Slice of Life';

export type Format = 
  | 'Single Issue' 
  | 'CGC Graded Slab' 
  | 'Trade Paperback (TPB)' 
  | 'Hardcover / Omnibus' 
  | 'Variant / Foil' 
  | 'Digital Edition';

export type Era = 'Golden Age' | 'Silver Age' | 'Bronze Age' | 'Modern Age';

export interface Creator {
  name: string;
  role: 'Writer' | 'Penciler' | 'Inker' | 'Colorist' | 'Cover Artist' | 'Letterer';
}

export interface VariantOption {
  id: string;
  name: string;
  coverImage: string;
  artist: string;
  priceModifier: number;
  ratio?: string; // e.g. "1:25", "1:50 Foil", "Virgin Cover"
  inStock: boolean;
}

export interface ComicPage {
  pageNumber: number;
  imageUrl: string;
  caption?: string;
  dialoguePreview?: string;
}

export interface ComicReview {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  editionPurchased: string;
}

export interface Comic {
  id: string;
  title: string;
  issueNumber: string;
  series: string;
  publisher: Publisher;
  genres: Genre[];
  format: Format;
  era: Era;
  price: number;
  originalPrice?: number;
  coverImage: string;
  additionalImages?: string[];
  variants?: VariantOption[];
  releaseDate: string;
  rating: number;
  reviewCount: number;
  description: string;
  keyNotes?: string; // e.g. "1st Appearance of Miles Morales", "Key Death of Gwen Stacy"
  creators: Creator[];
  pageCount: number;
  diamondCode: string;
  cgcGrade?: number; // e.g. 9.8, 9.6, 9.0 (for slabbed)
  cgcCertNumber?: string;
  cgcLabelType?: 'Universal (Blue)' | 'Signature Series (Yellow)' | 'Restored (Purple)' | 'Qualified (Green)';
  cgcSignatures?: string[];
  inStock: boolean;
  stockQuantity: number;
  isFeatured?: boolean;
  isNewRelease?: boolean;
  isGrail?: boolean;
  isBestSeller?: boolean;
  previewPages?: ComicPage[];
  storyArc?: string;
}

export interface CartItem {
  comic: Comic;
  selectedVariant?: VariantOption;
  quantity: number;
  bagAndBoard: boolean;
  digitalCopyIncluded: boolean;
}

export interface PullSubscription {
  id: string;
  seriesName: string;
  publisher: Publisher;
  coverPreference: 'Cover A (Standard)' | 'All Incentive Variants (1:25+)' | 'Foil Only' | 'Blank Sketch Variant';
  frequency: 'Weekly' | 'Bi-Weekly' | 'Monthly Box';
  addedDate: string;
  nextIssue: string;
  nextReleaseDate: string;
  estimatedPrice: number;
  coverImage: string;
  bagAndBoardAlways: boolean;
  status: 'Active' | 'Paused';
}

export interface VaultItem {
  id: string;
  comicId?: string;
  title: string;
  issueNumber: string;
  publisher: Publisher;
  coverImage: string;
  isGraded: boolean;
  gradingCompany?: 'CGC' | 'CBCS' | 'PGX' | 'Raw';
  grade?: number;
  gradeLabel?: string;
  signatures?: string[];
  certNumber?: string;
  purchasePrice: number;
  currentMarketValue: number;
  purchaseDate: string;
  notes?: string;
  priceHistory: { date: string; value: number }[];
}

export interface AuctionBid {
  id: string;
  bidderName: string;
  bidderAvatar: string;
  amount: number;
  timestamp: string;
  isAutomatic?: boolean;
}

export interface AuctionItem {
  id: string;
  title: string;
  issueNumber: string;
  publisher: Publisher;
  coverImage: string;
  cgcGrade: number;
  cgcLabel: 'Universal (Blue)' | 'Signature Series (Yellow)';
  cgcCertNumber: string;
  cgcSignatures?: string[];
  keySignificance: string;
  currentBid: number;
  startingBid: number;
  reserveMet: boolean;
  bidCount: number;
  endTime: string; // ISO string
  estimatedValue: number;
  bids: AuctionBid[];
  buyItNowPrice?: number;
  sellerRating: number;
  conditionDescription: string;
}

export interface ReadingOrderItem {
  step: number;
  comicId: string;
  title: string;
  issue: string;
  coverImage: string;
  description: string;
  isCore: boolean;
  price: number;
}

export interface StorylineEvent {
  id: string;
  name: string;
  publisher: Publisher;
  bannerImage: string;
  description: string;
  totalIssues: number;
  year: number;
  genre: Genre;
  issues: ReadingOrderItem[];
}
