import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ff-diamonds-topup',
    title: 'Free Fire Diamonds - Instant Direct UID Top-Up',
    slug: 'free-fire-diamonds-direct-topup',
    platform: 'Free Fire',
    category: 'game_currency',
    tag: 'Hot',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    description: 'Official Garena Free Fire Diamond direct top-up. 100% legitimate and authorized. No password required — simply enter your Player ID (UID) and server region. Diamonds are credited directly to your in-game mailbox within 60 seconds.',
    features: [
      'Official Garena Authorized Partner',
      'Direct UID Top-Up (No account password needed)',
      'Bonus Diamonds included on select denominations',
      'Qualifies for ongoing in-game top-up events & rewards',
      'Instant automated 24/7 delivery'
    ],
    deliveryType: 'direct_uid_topup',
    estimatedDeliveryTime: 'Instant (30 - 60 seconds)',
    rating: 4.98,
    reviewCount: 14250,
    verifiedBadge: true,
    authenticityInfo: 'Licensed Garena Digital Distribution Partner (Distributor ID: GAR-7729-AUTH). Safe for ranked accounts with zero ban risk.',
    refundPolicy: 'Guaranteed delivery or 100% instant refund within 24 hours if delivery fails due to server network anomaly.',
    howToRedeem: [
      'Open Free Fire on your mobile device.',
      'Click on your avatar profile at the top left corner.',
      'Copy your numeric Player ID (UID) from the profile tab.',
      'Paste your UID and select your game region at checkout.',
      'Complete payment and open Free Fire to receive your diamonds in seconds!'
    ],
    isFreeFireFeatured: true,
    denominations: [
      { id: 'ff-100', name: '100 + 10 Bonus Diamonds', value: 110, price: 0.99, originalPrice: 1.29, bonus: '+10 Extra', inStock: true, stockCount: 999 },
      { id: 'ff-310', name: '310 + 31 Bonus Diamonds', value: 341, price: 2.99, originalPrice: 3.59, bonus: '+31 Extra', inStock: true, stockCount: 950 },
      { id: 'ff-520', name: '520 + 52 Bonus Diamonds', value: 572, price: 4.89, originalPrice: 5.99, bonus: '+52 Extra', inStock: true, popular: true, stockCount: 880 },
      { id: 'ff-1060', name: '1,060 + 106 Bonus Diamonds', value: 1166, price: 9.79, originalPrice: 11.99, bonus: '+106 Extra', inStock: true, popular: true, stockCount: 750 },
      { id: 'ff-2180', name: '2,180 + 218 Bonus Diamonds', value: 2398, price: 19.49, originalPrice: 23.99, bonus: '+218 Extra', inStock: true, stockCount: 620 },
      { id: 'ff-5600', name: '5,600 + 560 Mega Vault Diamonds', value: 6160, price: 48.99, originalPrice: 59.99, bonus: '+560 Extra', inStock: true, stockCount: 410 }
    ]
  },
  {
    id: 'ff-membership-pass',
    title: 'Free Fire Weekly & Monthly Membership VIP Pass',
    slug: 'free-fire-membership-pass',
    platform: 'Free Fire',
    category: 'membership',
    tag: 'Best Value',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80',
    description: 'Unlock massive daily diamond claims and exclusive VIP perks in Free Fire. Up to 440% higher diamond value compared to standard recharges. Includes special member badge, daily discount store, and second chance badges.',
    features: [
      'Weekly Pass: Total 450 Diamonds (100 Instant + 50/day for 7 days)',
      'Monthly Pass: Total 2,600 Diamonds (500 Instant + 70/day for 30 days)',
      'VIP Member Crown Badge & Special Chat Border',
      'Automatic daily check-in booster & EP badges'
    ],
    deliveryType: 'direct_uid_topup',
    estimatedDeliveryTime: 'Instant (under 1 minute)',
    rating: 4.95,
    reviewCount: 8420,
    verifiedBadge: true,
    authenticityInfo: 'Authorized Garena Digital Subscriptions. Stacks with active subscriptions seamlessly.',
    refundPolicy: 'Full refund guaranteed if membership fails to activate in your Garena profile.',
    howToRedeem: [
      'Enter your numeric Free Fire UID during purchase.',
      'Choose Weekly, Monthly, or Super VIP Combo.',
      'Upon payment completion, launch Free Fire and visit the Membership tab to claim Day 1 rewards.'
    ],
    isFreeFireFeatured: true,
    denominations: [
      { id: 'ff-mem-weekly', name: 'Weekly Membership (450 Diamonds Total)', value: 450, price: 1.99, originalPrice: 2.99, bonus: '440% Value', inStock: true, popular: true, stockCount: 500 },
      { id: 'ff-mem-monthly', name: 'Monthly Membership (2,600 Diamonds Total)', value: 2600, price: 9.99, originalPrice: 12.99, bonus: 'Best ROI', inStock: true, popular: true, stockCount: 380 },
      { id: 'ff-mem-combo', name: 'Super VIP Combo (Weekly + Monthly Bundle)', value: 3050, price: 11.49, originalPrice: 15.99, bonus: 'Save 30%', inStock: true, stockCount: 220 },
      { id: 'ff-levelup-pass', name: 'Level Up Pass (Up to 802 Diamonds Claimable)', value: 802, price: 3.49, originalPrice: 4.99, bonus: 'Instant Level Claim', inStock: true, stockCount: 310 }
    ]
  },
  {
    id: 'ff-evo-bundle',
    title: 'Free Fire Evo Gun Tokens & Booyah Premium Pass',
    slug: 'free-fire-evo-gun-tokens-bundle',
    platform: 'Free Fire',
    category: 'bundle',
    tag: 'Exclusive',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    description: 'Upgrade your legendary Evo weapons including Blue Flame Draco AK, Predatory Cobra MP40, and Infernal Draco M1014. Fast token delivery directly credited through authorized token crates.',
    features: [
      'Evo Gun Tokens for Draco AK, Cobra MP40, Megalodon Alpha Scar',
      'Booyah Pass Premium & Elite Upgrade Vouchers',
      'Exclusive Emotes & Firing Animation Upgrades',
      '100% UID Direct Dispatch'
    ],
    deliveryType: 'direct_uid_topup',
    estimatedDeliveryTime: 'Instant (1 - 2 mins)',
    rating: 4.92,
    reviewCount: 5610,
    verifiedBadge: true,
    authenticityInfo: 'Authorized Garena digital token vouchers. Legitimate event-compatible tokens.',
    refundPolicy: 'Full refund if tokens are not delivered within 1 hour.',
    howToRedeem: [
      'Enter your Player ID (UID).',
      'Select your desired Evo Token package or Booyah Pass tier.',
      'Check in-game Vault / Weapons tab after checkout.'
    ],
    isFreeFireFeatured: true,
    denominations: [
      { id: 'ff-evo-100', name: '100x Universal Evo Gun Tokens', value: 100, price: 3.99, originalPrice: 4.99, bonus: '+15 Bonus Tokens', inStock: true, stockCount: 300 },
      { id: 'ff-evo-300', name: '300x Universal Evo Gun Tokens', value: 300, price: 10.99, originalPrice: 13.99, bonus: '+50 Bonus Tokens', inStock: true, popular: true, stockCount: 190 },
      { id: 'ff-booyah-basic', name: 'Booyah Pass Premium Voucher', value: 500, price: 4.49, originalPrice: 5.99, bonus: 'Unlock 100+ Tiers', inStock: true, stockCount: 450 },
      { id: 'ff-booyah-elite', name: 'Booyah Pass Elite Plus Voucher (+50 Tiers)', value: 1000, price: 8.99, originalPrice: 11.99, bonus: 'Instant Tier 50', inStock: true, stockCount: 210 }
    ]
  },
  {
    id: 'garena-prepaid-card',
    title: 'Garena Shells Prepaid Digital Gift Card',
    slug: 'garena-shells-prepaid-gift-card',
    platform: 'Garena',
    category: 'gift_card',
    tag: 'Official',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80',
    description: 'Official Garena Shells digital card PIN codes. Usable across all Garena ecosystem titles including Free Fire, Arena of Valor (AoV), Call of Duty Mobile (Garena), Black Clover M, and Undawn.',
    features: [
      'Universal Garena Ecosystem Currency',
      'Convertible to Free Fire Diamonds, AoV Vouchers, CODM CP',
      'Instant Digital Alpha-Numeric PIN Delivery',
      'No expiration date on unredeemed voucher PINs'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant Digital Code',
    rating: 4.97,
    reviewCount: 11200,
    verifiedBadge: true,
    authenticityInfo: 'Directly sourced from Garena Authorized Clearinghouse with official verification checksum.',
    refundPolicy: 'Unredeemed codes can be verified and refunded or replaced if invalid upon delivery.',
    howToRedeem: [
      'Visit official Garena Topup Center (shop.garena.sg or your regional Garena portal).',
      'Log into your Garena / Free Fire linked account.',
      'Select Garena PPC / Shells Voucher.',
      'Enter the 16-digit prepaid card PIN sent to your email and dashboard.',
      'Convert Shells to your favorite game currency with full bonuses!'
    ],
    denominations: [
      { id: 'gar-100', name: '100 Garena Shells', value: 100, price: 2.19, originalPrice: 2.49, inStock: true, stockCount: 500 },
      { id: 'gar-330', name: '330 Garena Shells', value: 330, price: 6.99, originalPrice: 7.99, inStock: true, popular: true, stockCount: 420 },
      { id: 'gar-660', name: '660 Garena Shells', value: 660, price: 13.79, originalPrice: 15.99, inStock: true, stockCount: 310 },
      { id: 'gar-1650', name: '1,650 Garena Shells', value: 1650, price: 33.99, originalPrice: 38.99, inStock: true, stockCount: 180 }
    ]
  },
  {
    id: 'steam-wallet-card',
    title: 'Steam Wallet Digital Gift Card (Global / US / EU)',
    slug: 'steam-wallet-digital-card',
    platform: 'Steam',
    category: 'gift_card',
    tag: 'Trending',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1612287233202-094136932454?auto=format&fit=crop&w=600&q=80',
    description: 'Instant official Steam Wallet digital codes. Top up your Steam account balance to purchase thousands of PC games, DLCs, in-game items, community market cosmetics, and Steam hardware.',
    features: [
      'Official Valve Steam Authorized Retailer',
      'Instant digital redemption key revealed in dashboard',
      'No hidden processing fees or expiry dates',
      'Works seamlessly for Steam Summer & Winter Sales'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant (Under 10 seconds)',
    rating: 4.99,
    reviewCount: 28400,
    verifiedBadge: true,
    authenticityInfo: 'Cryptographically secured digital keys generated directly from Valve Steam distributor networks.',
    refundPolicy: 'Unactivated keys are backed by 100% money-back guarantee.',
    howToRedeem: [
      'Open Steam client or visit store.steampowered.com/account/redeemwalletcode.',
      'Log into your Steam account.',
      'Enter the 15-character wallet code copied from your order receipt.',
      'Click Continue to credit funds to your Steam Wallet immediately.'
    ],
    denominations: [
      { id: 'steam-5', name: '$5 Steam Wallet Card', value: 5, price: 4.95, originalPrice: 5.00, inStock: true, stockCount: 650 },
      { id: 'steam-10', name: '$10 Steam Wallet Card', value: 10, price: 9.85, originalPrice: 10.00, inStock: true, stockCount: 820 },
      { id: 'steam-25', name: '$25 Steam Wallet Card', value: 25, price: 24.50, originalPrice: 25.00, inStock: true, popular: true, stockCount: 910 },
      { id: 'steam-50', name: '$50 Steam Wallet Card', value: 50, price: 48.75, originalPrice: 50.00, inStock: true, popular: true, stockCount: 540 },
      { id: 'steam-100', name: '$100 Steam Wallet Card', value: 100, price: 96.50, originalPrice: 100.00, inStock: true, stockCount: 320 }
    ]
  },
  {
    id: 'google-play-card',
    title: 'Google Play Digital Gift Card',
    slug: 'google-play-gift-card',
    platform: 'Google Play',
    category: 'gift_card',
    tag: 'Hot',
    region: 'US',
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572242?auto=format&fit=crop&w=600&q=80',
    description: 'Instant Google Play digital codes for in-app purchases, Android games, Free Fire in-app diamond packs, movies, and subscriptions on the Google Play Store.',
    features: [
      'Direct compatibility with Android games & microtransactions',
      'Use for Free Fire in-game special airdrops & topups',
      'Instant digital PIN delivery with one-click copy',
      'Authorized Google Play digital vendor'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant Digital Code',
    rating: 4.94,
    reviewCount: 19800,
    verifiedBadge: true,
    authenticityInfo: 'Legitimate Google Play retail digital codes provided with full distributor audit trail.',
    refundPolicy: 'Instant replacement or full refund if code encounters validation issues.',
    howToRedeem: [
      'Open Google Play Store app on your Android device.',
      'Tap your profile icon at top right -> Payments & subscriptions -> Redeem code.',
      'Enter the 16-character code and confirm.',
      'Spend on Free Fire diamonds or any Android game.'
    ],
    denominations: [
      { id: 'gp-10', name: '$10 Google Play Card', value: 10, price: 9.90, originalPrice: 10.00, inStock: true, stockCount: 600 },
      { id: 'gp-25', name: '$25 Google Play Card', value: 25, price: 24.60, originalPrice: 25.00, inStock: true, popular: true, stockCount: 780 },
      { id: 'gp-50', name: '$50 Google Play Card', value: 50, price: 48.90, originalPrice: 50.00, inStock: true, stockCount: 450 },
      { id: 'gp-100', name: '$100 Google Play Card', value: 100, price: 97.00, originalPrice: 100.00, inStock: true, stockCount: 290 }
    ]
  },
  {
    id: 'playstation-network-card',
    title: 'PlayStation Store PSN Digital Gift Card',
    slug: 'playstation-psn-gift-card',
    platform: 'PlayStation',
    category: 'gift_card',
    tag: 'Trending',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80',
    description: 'Add funds to your PlayStation Network wallet to buy full PS5/PS4 games, PlayStation Plus subscriptions, DLCs, season passes, and in-game currencies.',
    features: [
      'Official Sony Interactive Entertainment partner code',
      'Redeemable on PS5, PS4, PlayStation App, or Web browser',
      'No expiration date on wallet balance',
      'Instant code delivery with anti-fraud shield'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant Digital Code',
    rating: 4.96,
    reviewCount: 16700,
    verifiedBadge: true,
    authenticityInfo: 'Licensed Sony Interactive Entertainment digital product codes.',
    refundPolicy: 'Full refund for unredeemed voucher PINs.',
    howToRedeem: [
      'Go to PlayStation Store on your console or visit store.playstation.com.',
      'Select your profile avatar -> Redeem Code.',
      'Enter the 12-digit voucher code and select Continue.'
    ],
    denominations: [
      { id: 'psn-10', name: '$10 PSN Card', value: 10, price: 9.89, originalPrice: 10.00, inStock: true, stockCount: 410 },
      { id: 'psn-25', name: '$25 PSN Card', value: 25, price: 24.49, originalPrice: 25.00, inStock: true, popular: true, stockCount: 650 },
      { id: 'psn-50', name: '$50 PSN Card', value: 50, price: 48.50, originalPrice: 50.00, inStock: true, popular: true, stockCount: 520 },
      { id: 'psn-75', name: '$75 PSN Card', value: 75, price: 72.90, originalPrice: 75.00, inStock: true, stockCount: 230 },
      { id: 'psn-100', name: '$100 PSN Card', value: 100, price: 96.00, originalPrice: 100.00, inStock: true, stockCount: 310 }
    ]
  },
  {
    id: 'xbox-gift-card',
    title: 'Xbox & Windows Digital Gift Card / Game Pass',
    slug: 'xbox-game-pass-gift-card',
    platform: 'Xbox',
    category: 'gift_card',
    tag: 'Official',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=600&q=80',
    description: 'Purchase games, Xbox Game Pass Ultimate subscriptions, add-ons, and devices across Xbox Series X|S, Xbox One, and Windows 11 PC.',
    features: [
      'Official Microsoft Authorized Digital Key',
      'Use for Xbox Game Pass Ultimate or digital game library',
      'Instant 25-character digital alphanumeric key',
      'No service fees or expiration'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant (under 15 seconds)',
    rating: 4.93,
    reviewCount: 9350,
    verifiedBadge: true,
    authenticityInfo: 'Direct Microsoft Partner channel digital keys.',
    refundPolicy: 'Full money back guarantee on unredeemed digital keys.',
    howToRedeem: [
      'Go to redeem.microsoft.com or open Store app on Xbox.',
      'Sign in to your Microsoft account.',
      'Enter the 25-character code and follow prompts to add balance.'
    ],
    denominations: [
      { id: 'xbox-15', name: '$15 Xbox Gift Card', value: 15, price: 14.75, originalPrice: 15.00, inStock: true, stockCount: 350 },
      { id: 'xbox-25', name: '$25 Xbox Gift Card', value: 25, price: 24.30, originalPrice: 25.00, inStock: true, popular: true, stockCount: 490 },
      { id: 'xbox-50', name: '$50 Xbox Gift Card', value: 50, price: 48.40, originalPrice: 50.00, inStock: true, stockCount: 310 },
      { id: 'xbox-gpu-1m', name: '1 Month Xbox Game Pass Ultimate', value: 19.99, price: 15.99, originalPrice: 19.99, bonus: '20% Off', inStock: true, popular: true, stockCount: 280 }
    ]
  },
  {
    id: 'roblox-robux-card',
    title: 'Roblox Robux Digital Gift Card + Exclusive Virtual Item',
    slug: 'roblox-robux-digital-card',
    platform: 'Roblox',
    category: 'gift_card',
    tag: 'Hot',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80',
    description: 'Get Robux to purchase avatar upgrades, limited items, VIP server access, and game passes. Every digital card includes an exclusive bonus virtual avatar item code.',
    features: [
      'Official Roblox Authorized Reseller',
      'Includes Free Bonus Virtual Item Code',
      'Redeem for Robux or Roblox Premium Subscription',
      'Instant code delivery with PIN verification'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant Digital Code',
    rating: 4.96,
    reviewCount: 22100,
    verifiedBadge: true,
    authenticityInfo: 'Authorized Roblox Corporation digital distributor.',
    refundPolicy: 'Instant refund for invalid or unredeemed digital PINs.',
    howToRedeem: [
      'Go to roblox.com/redeem in your browser.',
      'Log into your Roblox account.',
      'Enter the PIN code and click Redeem.',
      'Convert credit to Robux or activate Premium.'
    ],
    denominations: [
      { id: 'rbx-10', name: '$10 Roblox Card (800 Robux + Bonus Item)', value: 10, price: 9.85, originalPrice: 10.00, bonus: '+Free Hat Item', inStock: true, stockCount: 710 },
      { id: 'rbx-25', name: '$25 Roblox Card (2,000 Robux + Bonus Item)', value: 25, price: 24.25, originalPrice: 25.00, bonus: '+Free Wings Item', inStock: true, popular: true, stockCount: 890 },
      { id: 'rbx-50', name: '$50 Roblox Card (4,500 Robux + Bonus Item)', value: 50, price: 47.90, originalPrice: 50.00, bonus: '+Exclusive Aura', inStock: true, stockCount: 420 },
      { id: 'rbx-100', name: '$100 Roblox Card (10,000 Robux + Super Item)', value: 100, price: 95.00, originalPrice: 100.00, bonus: '+Gold Pet', inStock: true, stockCount: 190 }
    ]
  },
  {
    id: 'razer-gold-pin',
    title: 'Razer Gold Universal Gaming PIN Code',
    slug: 'razer-gold-global-pin',
    platform: 'Razer Gold',
    category: 'gift_card',
    tag: 'Trending',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'The unified virtual credits for gamers worldwide. Use Razer Gold to buy in-game items and currencies for over 42,000 games and entertainment titles including Free Fire, Genshin Impact, and PUBG.',
    features: [
      'Earn Razer Silver rewards with every recharge',
      'Supports 42,000+ top titles worldwide',
      'Instant Serial Number + PIN code display',
      'Global region activation'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant PIN Delivery',
    rating: 4.91,
    reviewCount: 7800,
    verifiedBadge: true,
    authenticityInfo: 'Direct partnership with Razer Gold payment network.',
    refundPolicy: '100% money-back on unredeemed serials.',
    howToRedeem: [
      'Visit gold.razer.com and log in.',
      'Click Reload Now -> Select Razer Gold PIN.',
      'Enter the Serial Number and PIN, then confirm.'
    ],
    denominations: [
      { id: 'rg-10', name: '$10 Razer Gold PIN', value: 10, price: 9.80, originalPrice: 10.00, inStock: true, stockCount: 400 },
      { id: 'rg-20', name: '$20 Razer Gold PIN', value: 20, price: 19.50, originalPrice: 20.00, inStock: true, popular: true, stockCount: 510 },
      { id: 'rg-50', name: '$50 Razer Gold PIN', value: 50, price: 48.20, originalPrice: 50.00, inStock: true, stockCount: 300 },
      { id: 'rg-100', name: '$100 Razer Gold PIN', value: 100, price: 95.80, originalPrice: 100.00, inStock: true, stockCount: 160 }
    ]
  },
  {
    id: 'valorant-points-card',
    title: 'Valorant Riot Points (VP) Digital Code',
    slug: 'valorant-points-riot-gift-card',
    platform: 'Valorant',
    category: 'game_currency',
    tag: 'Hot',
    region: 'Global',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
    description: 'Unlock weapon skins, the latest Battlepass, Radianite points, and new agents in Valorant. Legitimate digital Riot Games prepaid cards delivered instantly.',
    features: [
      'Official Riot Games prepaid codes',
      'Works for Valorant, League of Legends, TFT, Legends of Runeterra',
      'Instant code display and email backup',
      'Zero risk of account penalties'
    ],
    deliveryType: 'instant_code',
    estimatedDeliveryTime: 'Instant Digital Key',
    rating: 4.95,
    reviewCount: 13400,
    verifiedBadge: true,
    authenticityInfo: 'Licensed Riot Games digital merchandise partner.',
    refundPolicy: 'Full refund if code is invalid upon delivery.',
    howToRedeem: [
      'Log into Valorant game client on PC.',
      'Click the VP icon in the top right corner.',
      'Select Prepaid Cards & Codes option.',
      'Input the code and click Submit.'
    ],
    denominations: [
      { id: 'val-10', name: '1,000 VP ($10 Code)', value: 1000, price: 9.90, originalPrice: 10.00, inStock: true, stockCount: 520 },
      { id: 'val-25', name: '2,575 VP ($25 Code)', value: 2575, price: 24.50, originalPrice: 25.00, bonus: '+75 VP', inStock: true, popular: true, stockCount: 680 },
      { id: 'val-50', name: '5,350 VP ($50 Code)', value: 5350, price: 48.70, originalPrice: 50.00, bonus: '+350 VP', inStock: true, stockCount: 390 },
      { id: 'val-100', name: '11,000 VP ($100 Code)', value: 11000, price: 96.00, originalPrice: 100.00, bonus: '+1,000 VP', inStock: true, stockCount: 220 }
    ]
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  { code: 'BOOYAH10', discountPercent: 10, minSpend: 5, validUntil: '2026-12-31', usageLimit: 5000, timesUsed: 1420, active: true },
  { code: 'CYBER5', discountPercent: 5, minSpend: 2, validUntil: '2026-12-31', usageLimit: 10000, timesUsed: 4210, active: true },
  { code: 'FREEDIAMONDS', discountPercent: 15, minSpend: 15, validUntil: '2026-12-31', usageLimit: 2000, timesUsed: 890, active: true },
  { code: 'STEAMVIP', discountPercent: 8, minSpend: 20, validUntil: '2026-12-31', usageLimit: 3000, timesUsed: 1120, active: true }
];

export const CURRENCIES = [
  { code: 'USD', symbol: '$', rate: 1.0 },
  { code: 'EUR', symbol: '€', rate: 0.92 },
  { code: 'GBP', symbol: '£', rate: 0.79 },
  { code: 'BRL', symbol: 'R$', rate: 5.55 },
  { code: 'INR', symbol: '₹', rate: 86.5 },
  { code: 'IDR', symbol: 'Rp', rate: 15800 }
];

export const SAMPLE_SAVED_PLAYER_IDS = [
  { game: 'Free Fire', uid: '8492049182', ign: '★SHADOW_FIRE★', region: 'Global' },
  { game: 'Free Fire', uid: '3029104881', ign: '⚡BOOYAH_KING⚡', region: 'BR' },
  { game: 'Steam', uid: '76561198000000000', ign: 'CyberPhantom_99', region: 'Global' },
  { game: 'Valorant', uid: 'ViperX#NA1', ign: 'ViperX', region: 'US' }
];

export const SAMPLE_ORDERS: any[] = [
  {
    id: 'ord-88912',
    orderNumber: 'APX-2026-88912',
    createdAt: '2026-08-17 14:22',
    status: 'Completed',
    customerEmail: 'gamerpro@apexvoucher.gg',
    customerName: 'Alex Mercer',
    paymentMethod: 'card',
    subtotal: 9.79,
    discount: 0.98,
    total: 8.81,
    currency: 'USD',
    directUid: '8492049182',
    serverRegion: 'Global',
    items: [
      {
        id: 'ci-1',
        productId: 'ff-diamonds-topup',
        productTitle: 'Free Fire Diamonds - Instant Direct UID Top-Up',
        platform: 'Free Fire',
        denominationId: 'ff-1060',
        denominationName: '1,060 + 106 Bonus Diamonds',
        price: 9.79,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
        deliveryType: 'direct_uid_topup',
        directUid: '8492049182',
        serverRegion: 'Global'
      }
    ],
    voucherCodes: [
      {
        productTitle: 'Free Fire Diamonds (1,060 + 106 Bonus)',
        denominationName: '1,060 + 106 Bonus Diamonds',
        code: 'UID: 8492049182 (Direct Credited)',
        pin: 'TXN-GAR-88492019',
        directUid: '8492049182',
        redeemed: true,
        platform: 'Free Fire',
        deliveryType: 'direct_uid_topup'
      }
    ]
  },
  {
    id: 'ord-88891',
    orderNumber: 'APX-2026-88891',
    createdAt: '2026-08-16 09:15',
    status: 'Completed',
    customerEmail: 'gamerpro@apexvoucher.gg',
    customerName: 'Alex Mercer',
    paymentMethod: 'paypal',
    subtotal: 24.50,
    discount: 0,
    total: 24.50,
    currency: 'USD',
    items: [
      {
        id: 'ci-2',
        productId: 'steam-wallet-card',
        productTitle: 'Steam Wallet Digital Gift Card',
        platform: 'Steam',
        denominationId: 'steam-25',
        denominationName: '$25 Steam Wallet Card',
        price: 24.50,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1612287233202-094136932454?auto=format&fit=crop&w=600&q=80',
        deliveryType: 'instant_code'
      }
    ],
    voucherCodes: [
      {
        productTitle: 'Steam Wallet $25 Card',
        denominationName: '$25 Steam Wallet Card',
        code: 'STM-9K74-W82M-LQP3',
        pin: '4820',
        redeemed: false,
        platform: 'Steam',
        deliveryType: 'instant_code',
        expiresAt: '2028-12-31'
      }
    ]
  }
];

export const SAMPLE_TICKETS: any[] = [
  {
    id: 'tkt-401',
    ticketNumber: 'TKT-7704',
    subject: 'Free Fire Diamond UID Direct Topup Inquiry',
    category: 'Free Fire Top-Up',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-08-15 10:00',
    updatedAt: '2026-08-15 10:14',
    orderNumber: 'APX-2026-88912',
    messages: [
      {
        id: 'm-1',
        sender: 'user',
        senderName: 'Alex Mercer',
        text: 'Hi, I just submitted an order for Free Fire Diamonds to UID 8492049182. How soon will the diamonds appear in my in-game mailbox?',
        timestamp: '10:00 AM'
      },
      {
        id: 'm-2',
        sender: 'support',
        senderName: 'Apex Gaming Support (Ava)',
        text: 'Hello Alex! Our automated direct Garena bridge instantly processed your transaction TXN-GAR-88492019. The 1,166 diamonds have been dispatched to your mailbox. Simply restart your Free Fire client to view your updated balance! Thank you for choosing ApexVoucher.',
        timestamp: '10:14 AM'
      }
    ]
  }
];
