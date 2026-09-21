export type MembershipTier = 'Basic' | 'Standard' | 'Gold' | 'Premium';

export type MembershipStatus = 'active' | 'expiring' | 'expired' | 'suspended';

export type AttendanceMethod = 'qr' | 'manual' | 'reception' | 'biometric';

export type AttendanceStatus = 'present' | 'checked_out' | 'incomplete';

export type PaymentMethod = 'Cash' | 'UPI' | 'Card' | 'Bank Transfer' | 'Online';

export type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';

export type UserRole = 'Super Admin' | 'Branch Admin' | 'Manager' | 'Receptionist' | 'Trainer';

export interface Member {
  id: string;
  memberId: string; // e.g. "MEM-002481"
  name: string;
  phone: string;
  email: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
  photoUrl: string;
  membershipTier: MembershipTier;
  membershipStatus: MembershipStatus;
  startDate: string;
  expiryDate: string;
  remainingDays: number;
  branch: string;
  assignedTrainer: string;
  totalVisits: number;
  workoutsCompleted: number;
  streakDays: number;
  totalSpent: number;
  notes: string;
  healthMetrics: {
    weightKg: number;
    heightCm: number;
    bmi: number;
    goal: string;
  };
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  memberPhoto: string;
  membershipTier: MembershipTier;
  checkInTime: string;
  checkOutTime: string | null;
  date: string;
  method: AttendanceMethod;
  branch: string;
  status: AttendanceStatus;
}

export interface MembershipPlan {
  id: string;
  name: MembershipTier;
  price: number;
  billingPeriod: 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Annual';
  durationDays: number;
  features: string[];
  activeMembers: number;
  monthlyRevenue: number;
  status: 'active' | 'draft' | 'archived';
  description: string;
}

export interface PaymentRecord {
  id: string;
  transactionId: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  membershipTier: MembershipTier;
  amount: number;
  paymentMethod: PaymentMethod;
  date: string;
  time: string;
  status: PaymentStatus;
  notes?: string;
}

export interface Trainer {
  id: string;
  name: string;
  photoUrl: string;
  specialization: string;
  activeMembers: number;
  monthlySessions: number;
  rating: number;
  status: 'Active' | 'On Leave' | 'Inactive';
  phone: string;
  email: string;
  branch: string;
  schedule: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'membership_expiry' | 'payment' | 'attendance' | 'system' | 'promotions';
  timestamp: string;
  read: boolean;
  channels: ('SMS' | 'WhatsApp' | 'Push' | 'Email')[];
  audience?: string;
  deliveryStatus: 'Sent' | 'Delivered' | 'Scheduled' | 'Failed';
}

export interface RolePermissions {
  role: UserRole;
  description: string;
  usersCount: number;
  permissions: {
    members: { view: boolean; create: boolean; edit: boolean; delete: boolean };
    attendance: { view: boolean; create: boolean; edit: boolean };
    payments: { view: boolean; create: boolean; refund: boolean };
    reports: { view: boolean; export: boolean };
    settings: { view: boolean; edit: boolean };
  };
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: string;
  details: string;
  ipAddress: string;
}
