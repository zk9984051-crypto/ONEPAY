export type NavTab = 'home' | 'savings' | 'buy' | 'sell' | 'my';

export interface DailyTask {
  id: string;
  title: string;
  titleUrdu: string;
  rewardPKR: number;
  description: string;
  isCompleted: boolean;
  isClaimed: boolean;
  type: 'checkin' | 'rate_check' | 'simulate_order' | 'share_invite';
}

export interface UserProfile {
  name: string;
  uid: string;
  balance: number; // in PKR
  commission: number; // in PKR
  inTransaction: number; // in PKR
  orderAvailable: number; // in PKR
  invitationCode: string;
  vipLevel: string;
}

export type PaymentMethod = 'easypaisa' | 'jazzcash' | 'usdt' | 'cod';

export interface CollectionChannel {
  id: string;
  type: 'easypaisa' | 'jazzcash';
  accountTitle: string;
  accountNumber: string;
  isActive: boolean;
  dailyLimit: number;
  qrCodeUrl?: string;
}

export interface P2POrder {
  id: string;
  orderNumber: string;
  type: 'buy' | 'sell';
  amountPKR: number;
  commissionPKR: number;
  method: 'easypaisa' | 'jazzcash';
  counterpartyName: string;
  counterpartyAccount: string;
  counterpartyTitle: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  trxId?: string;
  yieldType?: 'low' | 'medium' | 'high';
}

export interface WalletTransaction {
  id: string;
  type: 'recharge' | 'withdrawal' | 'buy_order' | 'sell_order' | 'commission_reward';
  amountPKR: number;
  method: 'easypaisa' | 'jazzcash' | 'usdt';
  accountNumber: string;
  accountTitle: string;
  trxId: string;
  status: 'Completed' | 'Processing' | 'Failed';
  timestamp: string;
  note?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  uid: string;
  level: 1 | 2 | 3;
  totalVolume: number;
  commissionEarned: number;
  joinedDate: string;
  status: 'Active' | 'Inactive';
}

/* Marketplace legacy types for compatibility */
export type Category = 'all' | 'mobiles' | 'laptops' | 'vehicles' | 'fashion' | 'electronics' | 'home';

export type ProductCondition =
  | 'Brand New (سیل پیک)'
  | 'Like New / Open Box (10/10)'
  | 'Used - Excellent (9/10)'
  | 'Used - Fair Condition';

export interface Product {
  id: string;
  title: string;
  titleUrdu?: string;
  description: string;
  price: number;
  category: Category;
  condition: ProductCondition;
  city: string;
  locationArea: string;
  image: string;
  images?: string[];
  seller: {
    id: string;
    name: string;
    phone: string;
    whatsapp: string;
    verified: boolean;
    rating: number;
    salesCount: number;
    jazzCashNumber?: string;
    easyPaisaNumber?: string;
  };
  featured?: boolean;
  createdAt: string;
  views: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface EasyPaisaPaymentDetail {
  method: 'easypaisa';
  mobileNumber: string;
  accountTitle: string;
  transactionId: string;
  authMethod: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface JazzCashPaymentDetail {
  method: 'jazzcash';
  mobileNumber: string;
  cnicLast6?: string;
  accountTitle: string;
  transactionId: string;
  authMethod: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
}

export interface CodPaymentDetail {
  method: 'cod';
  advanceVerificationPhone: string;
  status: 'pending_on_delivery';
  timestamp: string;
}

export type PaymentDetail = EasyPaisaPaymentDetail | JazzCashPaymentDetail | CodPaymentDetail;

export interface ShippingAddress {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  nearLandmark?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentDetail: PaymentDetail;
  orderDate: string;
  status: string;
  trackingNumber: string;
}

export interface SellerWallet {
  balance: number;
  pendingClearance: number;
  totalEarned: number;
  linkedEasyPaisa?: string;
  linkedJazzCash?: string;
  transactions: {
    id: string;
    type: 'sale_credit' | 'payout_withdrawal';
    amount: number;
    method: 'easypaisa' | 'jazzcash';
    description: string;
    timestamp: string;
    referenceId: string;
    status: 'Completed' | 'Processing';
  }[];
}
