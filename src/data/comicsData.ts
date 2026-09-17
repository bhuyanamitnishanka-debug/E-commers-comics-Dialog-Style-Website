import { Comic, StorylineEvent, AuctionItem, PullSubscription, VaultItem } from '../types/comic';

export const INITIAL_COMICS: Comic[] = [
  {
    id: 'spiderman-ult-01',
    title: 'Ultimate Spider-Man',
    issueNumber: '#1',
    series: 'Ultimate Spider-Man (2024)',
    publisher: 'Marvel',
    genres: ['Superhero', 'Action / Shonen'],
    format: 'Single Issue',
    era: 'Modern Age',
    price: 4.99,
    originalPrice: 5.99,
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    variants: [
      {
        id: 'var-1',
        name: 'Cover A (Marco Checchetto Main)',
        coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
        artist: 'Marco Checchetto',
        priceModifier: 0,
        inStock: true
      },
      {
        id: 'var-2',
        name: 'Peach Momoko 1:25 Variant Cover',
        coverImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80',
        artist: 'Peach Momoko',
        priceModifier: 24.99,
        ratio: '1:25 Ratio',
        inStock: true
      },
      {
        id: 'var-3',
        name: 'J. Scott Campbell Virgin Foil Edition',
        coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80',
        artist: 'J. Scott Campbell',
        priceModifier: 49.99,
        ratio: '1:50 Foil',
        inStock: false
      }
    ],
    releaseDate: '2024-01-10',
    rating: 4.95,
    reviewCount: 342,
    description: 'THE NEW ULTIMATE SPIDER-MAN FOR THE 21ST CENTURY! Visionary writer Jonathan Hickman and superstar artist Marco Checchetto unite for a bold, surprising spin on Peter Parker. In this world, Peter is 35, married to Mary Jane with two children, and has never been bitten by a spider... until Tony Stark arrives with a mysterious silver sphere that changes everything.',
    keyNotes: '🔥 Key 1st Appearance of the New Ultimate Peter Parker & Hickman Era #1',
    creators: [
      { name: 'Jonathan Hickman', role: 'Writer' },
      { name: 'Marco Checchetto', role: 'Penciler' },
      { name: 'Matthew Wilson', role: 'Colorist' },
      { name: 'Cory Petit', role: 'Letterer' }
    ],
    pageCount: 40,
    diamondCode: 'NOV230557',
    inStock: true,
    stockQuantity: 42,
    isFeatured: true,
    isNewRelease: false,
    isBestSeller: true,
    storyArc: 'The Maker War',
    previewPages: [
      {
        pageNumber: 1,
        imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80',
        caption: 'New York City at dusk. Peter Parker overlooks the skyline from his Midtown apartment.',
        dialoguePreview: '"Dad, are you going to help me with this science project or what?" "In a minute, Richard. Just checking the Daily Bugle morning proofs."'
      },
      {
        pageNumber: 2,
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        caption: 'A metallic sphere hums with crystalline blue energy on the desk.',
        dialoguePreview: '"Whoever you are... your life was stolen from you by a man called the Maker. Take this box. Reclaim your destiny."'
      },
      {
        pageNumber: 3,
        imageUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=80',
        caption: 'The spider glows with radiant bioplasma. Peter reaches out his trembling hand.',
        dialoguePreview: '"With great power... there must also come great responsibility. Let us begin."'
      }
    ]
  },
  {
    id: 'batman-gargoyle-01',
    title: 'Batman: The Dark Gargoyle',
    issueNumber: '#142',
    series: 'Batman (Vol. 3)',
    publisher: 'DC Comics',
    genres: ['Superhero', 'Crime & Noir', 'Horror'],
    format: 'CGC Graded Slab',
    era: 'Modern Age',
    price: 185.00,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    variants: [],
    releaseDate: '2024-02-06',
    rating: 4.88,
    reviewCount: 198,
    description: 'The Joker: Year One begins here! The terrifying secret history of how the Joker learned the art of psychotic chaos in Gotham City is exposed. Meanwhile in the near future, an aged Bruce Wayne faces an armada of Jokerized Batman drones.',
    keyNotes: '💎 CGC 9.8 Signature Series signed by Chip Zdarsky & Jim Lee with Custom Batman Label',
    creators: [
      { name: 'Chip Zdarsky', role: 'Writer' },
      { name: 'Giuseppe Camuncoli', role: 'Penciler' },
      { name: 'Stefano Nesi', role: 'Inker' },
      { name: 'Jim Lee', role: 'Cover Artist' }
    ],
    pageCount: 32,
    diamondCode: 'DEC230198',
    cgcGrade: 9.8,
    cgcCertNumber: '4392817001',
    cgcLabelType: 'Signature Series (Yellow)',
    cgcSignatures: ['Chip Zdarsky', 'Jim Lee'],
    inStock: true,
    stockQuantity: 3,
    isFeatured: true,
    isGrail: true,
    storyArc: 'The Joker: Year One',
    previewPages: [
      {
        pageNumber: 1,
        imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80',
        caption: 'Gotham under acid rain. Lightning silhouettes the Dark Knight against gargoyles.',
        dialoguePreview: '"Rain falls on the righteous and the wicked alike. But in Gotham, the wicked carry umbrellas made of knives."'
      },
      {
        pageNumber: 2,
        imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=80',
        caption: 'Inside the chemical plant ruins, a green smile appears in the dark.',
        dialoguePreview: '"Did you really think I was just a clown? I was a lesson waiting to be taught."'
      }
    ]
  },
  {
    id: 'cyberpunk-neon-ronin-01',
    title: 'Neon Ronin: Neo-Kyoto 2099',
    issueNumber: '#1',
    series: 'Neon Ronin',
    publisher: 'Image Comics',
    genres: ['Sci-Fi / Cyberpunk', 'Action / Shonen'],
    format: 'Variant / Foil',
    era: 'Modern Age',
    price: 9.99,
    originalPrice: 12.99,
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-nr-1',
        name: 'Holographic Chromium Foil Cover',
        coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        artist: 'Sana Takeda',
        priceModifier: 0,
        ratio: 'Foil Exclusive',
        inStock: true
      },
      {
        id: 'var-nr-2',
        name: 'Black & White Manga Raw Ink Variant',
        coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
        artist: 'Katsuhiro Otomo Tribute',
        priceModifier: 15.00,
        ratio: '1:25 Incentive',
        inStock: true
      }
    ],
    releaseDate: '2024-03-01',
    rating: 4.91,
    reviewCount: 124,
    description: 'In the towering cyber-slums of Neo-Kyoto, rogue cyborg assassin Ren wields a plasma-forged katana to dismantle the mega-corporations that syntheticized his family. A blistering blend of Akira, Ghost in the Shell, and Blade Runner.',
    keyNotes: '⚡ First printing limited foil variant with metallic gloss finish',
    creators: [
      { name: 'Kenji Takahashi', role: 'Writer' },
      { name: 'Sana Takeda', role: 'Penciler' },
      { name: 'Fiona Staples', role: 'Cover Artist' }
    ],
    pageCount: 36,
    diamondCode: 'JAN240412',
    inStock: true,
    stockQuantity: 18,
    isFeatured: true,
    isNewRelease: true,
    previewPages: [
      {
        pageNumber: 1,
        imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1000&q=80',
        caption: 'Hologram ads blink over Sector 4. Synthetic rain sizzles on cyberware.',
        dialoguePreview: '"Zero pulse detected in target. Commencing system override."'
      }
    ]
  },
  {
    id: 'berserk-chronicles-omnibus',
    title: 'Shadows of Eclipse: Deluxe Hardcover Vol. 1',
    issueNumber: 'Vol. 1',
    series: 'Shadows of Eclipse',
    publisher: 'Manga/Kodansha',
    genres: ['Dark Fantasy', 'Horror', 'Action / Shonen'],
    format: 'Hardcover / Omnibus',
    era: 'Modern Age',
    price: 49.99,
    originalPrice: 59.99,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    variants: [],
    releaseDate: '2023-11-15',
    rating: 4.98,
    reviewCount: 512,
    description: 'The monumental dark fantasy masterpiece presented in an oversized 7x10 inch faux-leather collector binding with ribbon bookmark. Contains over 700 pages of legendary high-contrast ink battlefields, towering monstrous apostles, and the tragic struggle of the Black Swordsman.',
    keyNotes: '👑 700+ Page Leatherette Deluxe Omnibus with Red Foil Embossed Seal',
    creators: [
      { name: 'Kentaro Tribute Studio', role: 'Writer' },
      { name: 'Kentaro Tribute Studio', role: 'Penciler' }
    ],
    pageCount: 720,
    diamondCode: 'OCT231190',
    inStock: true,
    stockQuantity: 15,
    isBestSeller: true,
    previewPages: [
      {
        pageNumber: 1,
        imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1000&q=80',
        caption: 'Under the blood red eclipse, the branded swordsman lifts his gargantuan blade.',
        dialoguePreview: '"Even if this blade shatters into a thousand pieces... I will never bow to destiny."'
      }
    ]
  },
  {
    id: 'amazing-fantasy-15-facsimile',
    title: 'Amazing Fantasy #15 (CGC 9.6 Facsimile Foil)',
    issueNumber: '#15',
    series: 'Amazing Fantasy',
    publisher: 'Marvel',
    genres: ['Superhero'],
    format: 'CGC Graded Slab',
    era: 'Silver Age',
    price: 245.00,
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2023-08-10',
    rating: 5.0,
    reviewCount: 88,
    description: 'The Holy Grail of modern pop culture! Introducing Spider-Man in his very first appearance. Pristinely preserved in a CGC 9.6 archival slab with Universal Blue Label, featuring exact vintage ads, letters page, and original 1962 Stan Lee & Steve Ditko interior pages.',
    keyNotes: '🏆 1st Appearance of Spider-Man (Peter Parker), Uncle Ben & Aunt May',
    creators: [
      { name: 'Stan Lee', role: 'Writer' },
      { name: 'Steve Ditko', role: 'Penciler' },
      { name: 'Artie Simek', role: 'Letterer' }
    ],
    pageCount: 36,
    diamondCode: 'AUG230015',
    cgcGrade: 9.6,
    cgcCertNumber: '3982716008',
    cgcLabelType: 'Universal (Blue)',
    inStock: true,
    stockQuantity: 2,
    isGrail: true,
    isFeatured: true
  },
  {
    id: 'saga-compendium-01',
    title: 'Saga: Book One Deluxe Edition',
    issueNumber: 'HC Vol. 1',
    series: 'Saga',
    publisher: 'Image Comics',
    genres: ['Sci-Fi / Cyberpunk', 'Dark Fantasy'],
    format: 'Trade Paperback (TPB)',
    era: 'Modern Age',
    price: 34.99,
    originalPrice: 39.99,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3ddb5?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2023-05-20',
    rating: 4.96,
    reviewCount: 430,
    description: 'Hugo and Eisner award-winning space opera epic! Two soldiers from opposite sides of a never-ending galactic war fall in love and risk everything to bring a fragile new life into a dangerous universe.',
    keyNotes: '⭐ Multiple Eisner & Harvey Award Winner - Issues #1-18 Collected',
    creators: [
      { name: 'Brian K. Vaughan', role: 'Writer' },
      { name: 'Fiona Staples', role: 'Penciler' }
    ],
    pageCount: 504,
    diamondCode: 'MAY230871',
    inStock: true,
    stockQuantity: 28,
    isBestSeller: true
  },
  {
    id: 'xmen-uncanny-01',
    title: 'Uncanny X-Men: From the Ashes #1',
    issueNumber: '#1',
    series: 'Uncanny X-Men',
    publisher: 'Marvel',
    genres: ['Superhero', 'Action / Shonen'],
    format: 'Single Issue',
    era: 'Modern Age',
    price: 5.99,
    coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80',
    variants: [
      {
        id: 'var-xm-1',
        name: 'Cover A (David Marquez Rogue & Wolverine)',
        coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=800&q=80',
        artist: 'David Marquez',
        priceModifier: 0,
        inStock: true
      },
      {
        id: 'var-xm-2',
        name: 'Alex Ross 1:100 Virgin Incentive',
        coverImage: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&w=800&q=80',
        artist: 'Alex Ross',
        priceModifier: 75.00,
        ratio: '1:100 Virgin',
        inStock: true
      }
    ],
    releaseDate: '2024-08-07',
    rating: 4.89,
    reviewCount: 92,
    description: 'The Krakoan age has fallen, but mutantkind will not be broken. Rogue, Gambit, Wolverine, Nightcrawler, and Jubilee set up base in the Louisiana bayou to defend mutants who have nowhere left to run.',
    keyNotes: '🔥 All-New Era for the X-Men post-Krakoa! Direct NCBD Release',
    creators: [
      { name: 'Gail Simone', role: 'Writer' },
      { name: 'David Marquez', role: 'Penciler' },
      { name: 'Matt Wilson', role: 'Colorist' }
    ],
    pageCount: 40,
    diamondCode: 'JUN240301',
    inStock: true,
    stockQuantity: 65,
    isNewRelease: true,
    storyArc: 'From the Ashes'
  },
  {
    id: 'hellboy-ominous-01',
    title: 'Hellboy: The Bones of Giants & Other Tales',
    issueNumber: 'TPB',
    series: 'Hellboy Universe',
    publisher: 'Dark Horse',
    genres: ['Horror', 'Dark Fantasy', 'Crime & Noir'],
    format: 'Trade Paperback (TPB)',
    era: 'Modern Age',
    price: 19.99,
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2023-12-05',
    rating: 4.93,
    reviewCount: 167,
    description: 'When the frozen corpse of a legendary Norse giant is unearthed holding the hammer of Thor, Hellboy is drawn into an ancient occult war between the frost giants of Jotunheim and the B.P.R.D.',
    keyNotes: '💀 Mike Mignola Mythos at its peak with high atmospheric gothic horror',
    creators: [
      { name: 'Mike Mignola', role: 'Writer' },
      { name: 'Matt Smith', role: 'Penciler' },
      { name: 'Dave Stewart', role: 'Colorist' }
    ],
    pageCount: 144,
    diamondCode: 'NOV230214',
    inStock: true,
    stockQuantity: 22
  },
  {
    id: 'jujutsu-shibuya-arc',
    title: 'Jujutsu Kaisen: Shibuya Cataclysm (Special Edition Box)',
    issueNumber: 'Vol. 10-16',
    series: 'Jujutsu Kaisen',
    publisher: 'Manga/Kodansha',
    genres: ['Action / Shonen', 'Dark Fantasy', 'Horror'],
    format: 'Hardcover / Omnibus',
    era: 'Modern Age',
    price: 64.99,
    originalPrice: 79.99,
    coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2024-01-20',
    rating: 4.99,
    reviewCount: 680,
    description: 'The highest-stakes arc in modern shonen history! On October 31st in Shibuya, Kenjaku executes the sealing of Satoru Gojo. Special grade curses run rampant as Yuji Itadori and Megumi Fushiguro fight through hell.',
    keyNotes: '⚡ Includes Exclusive Acrylic Standee + Special Cursed Energy Art Booklet',
    creators: [
      { name: 'Gege Akutami', role: 'Writer' },
      { name: 'Gege Akutami', role: 'Penciler' }
    ],
    pageCount: 560,
    diamondCode: 'DEC230890',
    inStock: true,
    stockQuantity: 19,
    isBestSeller: true
  },
  {
    id: 'spawn-scorched-01',
    title: 'The Scorched: King of Hell #1 (CGC 9.8)',
    issueNumber: '#1',
    series: 'Spawn Universe',
    publisher: 'Image Comics',
    genres: ['Superhero', 'Dark Fantasy', 'Horror'],
    format: 'CGC Graded Slab',
    era: 'Modern Age',
    price: 160.00,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2023-09-15',
    rating: 4.87,
    reviewCount: 75,
    description: 'Todd McFarlane brings the ultimate Hellspawn strike team together: Medieval Spawn, She-Spawn, Gunslinger Spawn, and Al Simmons. CGC 9.8 Signature Series signed by Todd McFarlane with gold paint pen.',
    keyNotes: '🔥 Signed in Gold Sharpie by Creator Todd McFarlane with CGC Gold Label',
    creators: [
      { name: 'Sean Lewis', role: 'Writer' },
      { name: 'Stephen Segovia', role: 'Penciler' },
      { name: 'Todd McFarlane', role: 'Cover Artist' }
    ],
    pageCount: 36,
    diamondCode: 'SEP230419',
    cgcGrade: 9.8,
    cgcCertNumber: '4192837012',
    cgcLabelType: 'Signature Series (Yellow)',
    cgcSignatures: ['Todd McFarlane'],
    inStock: true,
    stockQuantity: 1,
    isGrail: true
  },
  {
    id: 'solarpunk-indie-01',
    title: 'Flora & Gear: Botanist of the Wasteland',
    issueNumber: '#1-4',
    series: 'Flora & Gear',
    publisher: 'Indie / Creator-Owned',
    genres: ['Sci-Fi / Cyberpunk', 'Slice of Life'],
    format: 'Trade Paperback (TPB)',
    era: 'Modern Age',
    price: 16.99,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3ddb5?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2024-02-14',
    rating: 4.92,
    reviewCount: 84,
    description: 'A breathtaking solarpunk graphic novel about a young roboticist and her genetically revived greenhouse moss creatures rebuilding a solar sanctuary across the ruins of civilization.',
    keyNotes: '🌱 Kickstarter Phenomenon - 100% Recycled Foil Paper Edition',
    creators: [
      { name: 'Elena Rostova', role: 'Writer' },
      { name: 'Elena Rostova', role: 'Penciler' }
    ],
    pageCount: 160,
    diamondCode: 'JAN240188',
    inStock: true,
    stockQuantity: 34
  },
  {
    id: 'action-comics-01-facsimile',
    title: 'Action Comics #1 (Golden Age Replica)',
    issueNumber: '#1',
    series: 'Action Comics',
    publisher: 'DC Comics',
    genres: ['Superhero'],
    format: 'CGC Graded Slab',
    era: 'Golden Age',
    price: 320.00,
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    releaseDate: '2023-04-18',
    rating: 5.0,
    reviewCount: 110,
    description: 'The comic that started the entire superhero medium in 1938! Superman lifts a green sedan in Jerry Siegel and Joe Shuster’s iconic historical debut. Graded Gem Mint 9.8 in custom museum acrylic slab.',
    keyNotes: '⭐ 1st Appearance of Superman (Clark Kent) & Lois Lane',
    creators: [
      { name: 'Jerry Siegel', role: 'Writer' },
      { name: 'Joe Shuster', role: 'Penciler' }
    ],
    pageCount: 68,
    diamondCode: 'APR230001',
    cgcGrade: 9.8,
    cgcCertNumber: '1938060100',
    cgcLabelType: 'Universal (Blue)',
    inStock: true,
    stockQuantity: 1,
    isGrail: true,
    isFeatured: true
  }
];

export const INITIAL_AUCTIONS: AuctionItem[] = [
  {
    id: 'auc-af15',
    title: 'Amazing Fantasy #15 (Original 1962 1st Spider-Man)',
    issueNumber: '#15',
    publisher: 'Marvel',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    cgcGrade: 8.0,
    cgcLabel: 'Universal (Blue)',
    cgcCertNumber: '0289174001',
    keySignificance: 'The #1 Most Wanted Grail in comic history: 1st Peter Parker, Aunt May, Uncle Ben.',
    currentBid: 4250.00,
    startingBid: 3000.00,
    reserveMet: true,
    bidCount: 24,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(), // 36 hours from now
    estimatedValue: 6500.00,
    buyItNowPrice: 6200.00,
    sellerRating: 4.98,
    conditionDescription: 'Off-white to white pages. Rich cover gloss, tight staples, minor spine stress with no color break.',
    bids: [
      {
        id: 'b-1',
        bidderName: 'WebSlingerVault_88',
        bidderAvatar: '🕷️',
        amount: 4250.00,
        timestamp: '12 mins ago'
      },
      {
        id: 'b-2',
        bidderName: 'GothamKingCollector',
        bidderAvatar: '🦇',
        amount: 4100.00,
        timestamp: '45 mins ago'
      },
      {
        id: 'b-3',
        bidderName: 'SilverAgeKing',
        bidderAvatar: '💎',
        amount: 3850.00,
        timestamp: '2 hours ago'
      }
    ]
  },
  {
    id: 'auc-batman-1',
    title: 'Batman #1 (Spring 1940 Golden Age Key)',
    issueNumber: '#1',
    publisher: 'DC Comics',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    cgcGrade: 6.5,
    cgcLabel: 'Universal (Blue)',
    cgcCertNumber: '1940040101',
    keySignificance: '1st appearance of The Joker and Catwoman (The Cat)! Standalone Batman title debut.',
    currentBid: 5800.00,
    startingBid: 4500.00,
    reserveMet: true,
    bidCount: 19,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 18).toISOString(), // 18 hours from now
    estimatedValue: 8500.00,
    sellerRating: 5.0,
    conditionDescription: 'Cream to off-white pages. Small tear lower back cover, clean bright inks.',
    bids: [
      {
        id: 'b-bat-1',
        bidderName: 'ArkhamAsylumOwner',
        bidderAvatar: '🃏',
        amount: 5800.00,
        timestamp: '5 mins ago'
      },
      {
        id: 'b-bat-2',
        bidderName: 'WayneManor_99',
        bidderAvatar: '🦇',
        amount: 5600.00,
        timestamp: '1 hour ago'
      }
    ]
  },
  {
    id: 'auc-hickman-ult-100',
    title: 'Ultimate Spider-Man #1 1:100 Virgin Foil (CGC 9.8 Signature Series)',
    issueNumber: '#1',
    publisher: 'Marvel',
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    cgcGrade: 9.8,
    cgcLabel: 'Signature Series (Yellow)',
    cgcCertNumber: '4481029381',
    cgcSignatures: ['Jonathan Hickman', 'Marco Checchetto'],
    keySignificance: 'Ultra rare 1:100 ratio retailer incentive signed by creative team.',
    currentBid: 680.00,
    startingBid: 350.00,
    reserveMet: true,
    bidCount: 16,
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours
    estimatedValue: 950.00,
    buyItNowPrice: 890.00,
    sellerRating: 4.95,
    conditionDescription: 'Flawless gem mint 9.8 slab with custom holographic Marvel gold label.',
    bids: [
      {
        id: 'b-hick-1',
        bidderName: 'MarvelGrailHunter',
        bidderAvatar: '🛡️',
        amount: 680.00,
        timestamp: '18 mins ago'
      }
    ]
  }
];

export const INITIAL_STORYLINES: StorylineEvent[] = [
  {
    id: 'event-spider-verse',
    name: 'Spider-Verse: Across The Multiverse',
    publisher: 'Marvel',
    bannerImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
    description: 'Morlun and the Inheritors are hunting spider-totems across every known dimension. Peter Parker, Miles Morales, Spider-Gwen, and Miguel O’Hara must unite an infinite army of Spiders to prevent total extinction.',
    totalIssues: 7,
    year: 2014,
    genre: 'Superhero',
    issues: [
      {
        step: 1,
        comicId: 'spiderman-ult-01',
        title: 'Edge of Spider-Verse #1',
        issue: '#1',
        coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80',
        description: 'First appearance of Spider-Noir & Spider-Gwen in alternate realities.',
        isCore: true,
        price: 4.99
      },
      {
        step: 2,
        comicId: 'sv-2',
        title: 'Amazing Spider-Man (Vol. 3) #9',
        issue: '#9',
        coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
        description: 'The Gathering of the Spiders on Earth-13. The war officially begins.',
        isCore: true,
        price: 3.99
      },
      {
        step: 3,
        comicId: 'sv-3',
        title: 'Spider-Verse #1',
        issue: '#1',
        coverImage: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
        description: 'Cosmic Spider-Man defends the Loomworld sanctuary.',
        isCore: false,
        price: 4.99
      },
      {
        step: 4,
        comicId: 'sv-4',
        title: 'Amazing Spider-Man #14 (Climax)',
        issue: '#14',
        coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&q=80',
        description: 'Final battle at Loomworld and the Weaver of Destiny.',
        isCore: true,
        price: 5.99
      }
    ]
  },
  {
    id: 'event-court-of-owls',
    name: 'Batman: The Court of Owls Saga',
    publisher: 'DC Comics',
    bannerImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    description: 'Scott Snyder and Greg Capullo introduce Gotham’s darkest myth: a secret society of aristocracy and undead Talons who have ruled Gotham from the shadows since colonial times.',
    totalIssues: 5,
    year: 2011,
    genre: 'Crime & Noir',
    issues: [
      {
        step: 1,
        comicId: 'batman-gargoyle-01',
        title: 'Batman #1 (New 52)',
        issue: '#1',
        coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
        description: 'A knife thrown into a wall reveals the ancient riddle: Beware the Court of Owls.',
        isCore: true,
        price: 4.99
      },
      {
        step: 2,
        comicId: 'bat-5',
        title: 'Batman #5 (The Labyrinth)',
        issue: '#5',
        coverImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
        description: 'The legendary rotated psychological maze issue where Bruce loses his mind.',
        isCore: true,
        price: 4.99
      },
      {
        step: 3,
        comicId: 'bat-8',
        title: 'Batman #8-9 (Night of the Owls)',
        issue: '#8-9',
        coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
        description: 'Talons strike Wayne Manor; Bruce dons the heavy mech armor.',
        isCore: true,
        price: 6.99
      }
    ]
  }
];

export const INITIAL_PULL_SUBSCRIPTIONS: PullSubscription[] = [
  {
    id: 'sub-1',
    seriesName: 'Ultimate Spider-Man (2024)',
    publisher: 'Marvel',
    coverPreference: 'Cover A (Standard)',
    frequency: 'Monthly Box',
    addedDate: '2024-01-05',
    nextIssue: 'Issue #8',
    nextReleaseDate: 'Wednesday, Next Week (NCBD)',
    estimatedPrice: 4.99,
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=400&q=80',
    bagAndBoardAlways: true,
    status: 'Active'
  },
  {
    id: 'sub-2',
    seriesName: 'Uncanny X-Men',
    publisher: 'Marvel',
    coverPreference: 'All Incentive Variants (1:25+)',
    frequency: 'Weekly',
    addedDate: '2024-02-12',
    nextIssue: 'Issue #3',
    nextReleaseDate: 'Wednesday, Aug 27',
    estimatedPrice: 24.99,
    coverImage: 'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?auto=format&fit=crop&w=400&q=80',
    bagAndBoardAlways: true,
    status: 'Active'
  },
  {
    id: 'sub-3',
    seriesName: 'Batman (Vol. 3)',
    publisher: 'DC Comics',
    coverPreference: 'Foil Only',
    frequency: 'Monthly Box',
    addedDate: '2024-03-01',
    nextIssue: 'Issue #145',
    nextReleaseDate: 'Wednesday, Sep 04',
    estimatedPrice: 6.99,
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
    bagAndBoardAlways: true,
    status: 'Active'
  }
];

export const INITIAL_VAULT_ITEMS: VaultItem[] = [
  {
    id: 'vault-1',
    title: 'Ultimate Spider-Man',
    issueNumber: '#1',
    publisher: 'Marvel',
    coverImage: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80',
    isGraded: true,
    gradingCompany: 'CGC',
    grade: 9.8,
    gradeLabel: 'Signature Series (Yellow)',
    signatures: ['Jonathan Hickman', 'Marco Checchetto'],
    certNumber: '4481029381',
    purchasePrice: 120.00,
    currentMarketValue: 240.00,
    purchaseDate: '2024-01-18',
    notes: 'Bought at NYCC convention signing booth. Slab condition is flawless.',
    priceHistory: [
      { date: 'Jan 24', value: 120 },
      { date: 'Mar 24', value: 160 },
      { date: 'May 24', value: 195 },
      { date: 'Jul 24', value: 240 }
    ]
  },
  {
    id: 'vault-2',
    title: 'Batman: The Dark Gargoyle',
    issueNumber: '#142',
    publisher: 'DC Comics',
    coverImage: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    isGraded: true,
    gradingCompany: 'CGC',
    grade: 9.8,
    gradeLabel: 'Universal (Blue)',
    certNumber: '4392817001',
    purchasePrice: 140.00,
    currentMarketValue: 185.00,
    purchaseDate: '2024-02-10',
    notes: 'First printing Joker Year One prologue.',
    priceHistory: [
      { date: 'Feb 24', value: 140 },
      { date: 'Apr 24', value: 155 },
      { date: 'Jun 24', value: 170 },
      { date: 'Aug 24', value: 185 }
    ]
  },
  {
    id: 'vault-3',
    title: 'Saga #1',
    issueNumber: '#1',
    publisher: 'Image Comics',
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3ddb5?auto=format&fit=crop&w=600&q=80',
    isGraded: false,
    gradingCompany: 'Raw',
    grade: 9.4,
    gradeLabel: 'Near Mint Raw',
    purchasePrice: 90.00,
    currentMarketValue: 280.00,
    purchaseDate: '2020-06-15',
    notes: 'Original 2012 first printing. Stored in 2mil Mylar with acid-free fullback board.',
    priceHistory: [
      { date: '2021', value: 110 },
      { date: '2022', value: 180 },
      { date: '2023', value: 230 },
      { date: '2024', value: 280 }
    ]
  }
];

export const GRADING_TIERS = [
  { grade: 10.0, label: 'Gem Mint (GM)', color: 'from-amber-400 to-yellow-500', desc: 'Virtually perfect in every way. The best possible condition.' },
  { grade: 9.8, label: 'Near Mint / Mint (NM/M)', color: 'from-emerald-400 to-green-600', desc: 'Nearly indistinguishable from 10.0 with minor manufacturing flaw allowed.' },
  { grade: 9.6, label: 'Near Mint+ (NM+)', color: 'from-teal-400 to-cyan-600', desc: 'Subtle bindery tear (<1/16") or microscopic spine stress permitted.' },
  { grade: 9.4, label: 'Near Mint (NM)', color: 'from-blue-400 to-indigo-600', desc: 'Extremely fresh and crisp. Slight color break or tiny corner ding.' },
  { grade: 9.0, label: 'Very Fine / Near Mint (VF/NM)', color: 'from-purple-400 to-indigo-700', desc: 'Light spine stresses, minor paper age, crisp corners.' },
  { grade: 8.0, label: 'Very Fine (VF)', color: 'from-violet-400 to-purple-800', desc: 'Moderate spine wear or small color breaks, great eye appeal.' },
  { grade: 6.0, label: 'Fine (FN)', color: 'from-orange-400 to-amber-700', desc: 'General reading wear, small creases, slight spine roll allowed.' },
  { grade: 4.0, label: 'Very Good (VG)', color: 'from-rose-400 to-red-700', desc: 'Significant wear, cover loose at staple, folded corners.' }
];
