export type SubscriptionStatus = 'active' | 'expired' | 'trial' | 'none';
export type UserRole = 'student' | 'teacher' | 'school_admin' | 'super_admin';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'high-5';
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  amountPaid: number;
  currency: 'INR';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

export interface StudentProfile extends UserProfile {
  role: 'student';
  class: 8 | 9 | 10 | 11 | 12;
  board: 'CBSE' | 'ICSE' | 'Karnataka' | 'Tamil Nadu' | 'Kerala' | 'Andhra Pradesh';
  school?: string;
  subscription?: Subscription;
}

export interface SchoolProfile {
  id: string;
  name: string;
  board: string;
  address: string;
  contactEmail: string;
  subscriptionCount: number;
  expiryDate: string;
}

export interface AuthSession {
  user: UserProfile;
  subscription?: Subscription;
  accessToken: string;
}
