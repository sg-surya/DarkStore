export type Platform = 
  | 'Free Fire' 
  | 'Garena' 
  | 'Steam' 
  | 'Google Play' 
  | 'PlayStation' 
  | 'Xbox' 
  | 'Roblox' 
  | 'Razer Gold' 
  | 'Valorant' 
  | 'PUBG Mobile';

export type ProductCategory = 'game_currency' | 'gift_card' | 'membership' | 'bundle' | 'subscription';

export type Region = 'Global' | 'US' | 'EU' | 'BR' | 'SEA' | 'IND' | 'MENA' | 'LATAM';

export interface Denomination {
  id: string;
  name: string;
  value: number;
  price: number;
  originalPrice?: number;
  bonus?: string;
  inStock: boolean;
  popular?: boolean;
  stockCount: number;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  platform: Platform;
  category: ProductCategory;
  tag?: 'Hot' | 'Trending' | 'Best Value' | 'Exclusive' | 'Sale' | 'Official';
  region: Region;
  image: string;
  bannerImage?: string;
  description: string;
  features: string[];
  deliveryType: 'instant_code' | 'direct_uid_topup';
  estimatedDeliveryTime: string;
  rating: number;
  reviewCount: number;
  verifiedBadge: boolean;
  authenticityInfo: string;
  refundPolicy: string;
  howToRedeem: string[];
  denominations: Denomination[];
  isFreeFireFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  productTitle: string;
  platform: Platform;
  denominationId: string;
  denominationName: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  deliveryType: 'instant_code' | 'direct_uid_topup';
  directUid?: string;
  serverRegion?: string;
  bonus?: string;
}

export interface VoucherCodeItem {
  productTitle: string;
  denominationName: string;
  code: string;
  pin?: string;
  directUid?: string;
  redeemed: boolean;
  platform: Platform;
  deliveryType: 'instant_code' | 'direct_uid_topup';
  expiresAt?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: 'Completed' | 'Processing' | 'Delivered' | 'Refunded';
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
  customerEmail: string;
  customerName?: string;
  paymentMethod: 'card' | 'paypal' | 'apple_pay' | 'crypto' | 'upi';
  voucherCodes: VoucherCodeItem[];
  directUid?: string;
  serverRegion?: string;
  refundReason?: string;
}

export interface TicketMessage {
  id: string;
  sender: 'user' | 'support';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  subject: string;
  category: 'Order Delivery' | 'Redemption Issue' | 'Payment & Billing' | 'Free Fire Top-Up' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'Pending' | 'Resolved';
  createdAt: string;
  updatedAt: string;
  orderNumber?: string;
  messages: TicketMessage[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  discountFixed?: number;
  minSpend?: number;
  validUntil: string;
  usageLimit: number;
  timesUsed: number;
  active: boolean;
}

export interface UserAccount {
  name: string;
  email: string;
  avatar: string;
  memberTier: 'Bronze' | 'Silver' | 'Gold' | 'Cyber Elite';
  loyaltyDiamonds: number;
  savedPlayerIds: { game: string; uid: string; ign: string; region: string }[];
  twoFactorEnabled: boolean;
}

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // relative to USD
}
