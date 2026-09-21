import {
  Member,
  AttendanceRecord,
  MembershipPlan,
  PaymentRecord,
  Trainer,
  NotificationItem,
  RolePermissions,
  AuditLogItem
} from '../types/gym';

export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'mem-1',
    memberId: 'MEM-002481',
    name: 'Arun Kumar',
    phone: '+91 98401 23456',
    email: 'arun.kumar@enterprise.com',
    dob: '14 Mar 1994',
    gender: 'Male',
    emergencyContact: {
      name: 'Kavitha K.',
      phone: '+91 98401 98765',
      relation: 'Spouse'
    },
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    membershipStatus: 'active',
    startDate: '24 Sep 2024',
    expiryDate: '24 Oct 2026',
    remainingDays: 23,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Vikram Singh',
    totalVisits: 18,
    workoutsCompleted: 12,
    streakDays: 4,
    totalSpent: 18500,
    notes: 'Focus on anterior pelvic tilt correction and deadlift form. No dietary restrictions.',
    healthMetrics: {
      weightKg: 76.5,
      heightCm: 178,
      bmi: 24.1,
      goal: 'Hypertrophy & Conditioning'
    }
  },
  {
    id: 'mem-2',
    memberId: 'MEM-002482',
    name: 'Priya Sharma',
    phone: '+91 98402 34567',
    email: 'priya.sharma@techcorp.in',
    dob: '28 Jun 1996',
    gender: 'Female',
    emergencyContact: {
      name: 'Rahul Sharma',
      phone: '+91 98402 98765',
      relation: 'Brother'
    },
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Premium',
    membershipStatus: 'expiring',
    startDate: '18 Oct 2025',
    expiryDate: '18 Oct 2026',
    remainingDays: 17,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Ananya Roy',
    totalVisits: 22,
    workoutsCompleted: 16,
    streakDays: 7,
    totalSpent: 32000,
    notes: 'Prefers morning sessions. Target: Marathon prep and core stability.',
    healthMetrics: {
      weightKg: 58.2,
      heightCm: 164,
      bmi: 21.6,
      goal: 'Marathon Endurance'
    }
  },
  {
    id: 'mem-3',
    memberId: 'MEM-002483',
    name: 'Rajesh Patel',
    phone: '+91 98403 45678',
    email: 'rajesh.patel@global.com',
    dob: '10 Jan 1988',
    gender: 'Male',
    emergencyContact: {
      name: 'Meena Patel',
      phone: '+91 98403 98765',
      relation: 'Spouse'
    },
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Standard',
    membershipStatus: 'expiring',
    startDate: '12 Oct 2025',
    expiryDate: '12 Oct 2026',
    remainingDays: 11,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Rajesh Pillai',
    totalVisits: 14,
    workoutsCompleted: 10,
    streakDays: 2,
    totalSpent: 12400,
    notes: 'Mild lumbar tension; avoids heavy back squats.',
    healthMetrics: {
      weightKg: 82.0,
      heightCm: 175,
      bmi: 26.8,
      goal: 'Fat Loss & Strength'
    }
  },
  {
    id: 'mem-4',
    memberId: 'MEM-002484',
    name: 'Deepa Nair',
    phone: '+91 98404 56789',
    email: 'deepa.nair@advisory.org',
    dob: '05 Aug 1992',
    gender: 'Female',
    emergencyContact: {
      name: 'Suresh Nair',
      phone: '+91 98404 98765',
      relation: 'Father'
    },
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    membershipStatus: 'expiring',
    startDate: '05 Oct 2025',
    expiryDate: '05 Oct 2026',
    remainingDays: 4,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Sneha Reddy',
    totalVisits: 19,
    workoutsCompleted: 15,
    streakDays: 5,
    totalSpent: 22000,
    notes: 'Renewal offer sent via WhatsApp. Follow-up pending on 03 Oct.',
    healthMetrics: {
      weightKg: 63.4,
      heightCm: 168,
      bmi: 22.5,
      goal: 'Mobility & Lean Muscle'
    }
  },
  {
    id: 'mem-5',
    memberId: 'MEM-002485',
    name: 'Karthik Venkat',
    phone: '+91 98405 67890',
    email: 'karthik.v@startup.co',
    dob: '19 Nov 1999',
    gender: 'Male',
    emergencyContact: {
      name: 'Latha V.',
      phone: '+91 98405 98765',
      relation: 'Mother'
    },
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Basic',
    membershipStatus: 'expiring',
    startDate: '02 Oct 2025',
    expiryDate: '02 Oct 2026',
    remainingDays: 1,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Vikram Singh',
    totalVisits: 9,
    workoutsCompleted: 8,
    streakDays: 1,
    totalSpent: 4500,
    notes: 'College student plan. Expressed interest in upgrading to Standard with steam room access.',
    healthMetrics: {
      weightKg: 69.0,
      heightCm: 172,
      bmi: 23.3,
      goal: 'General Fitness'
    }
  },
  {
    id: 'mem-6',
    memberId: 'MEM-002486',
    name: 'Sneha Chawla',
    phone: '+91 98406 78901',
    email: 'sneha.c@design.studio',
    dob: '02 May 1995',
    gender: 'Female',
    emergencyContact: {
      name: 'Aditya Chawla',
      phone: '+91 98406 98765',
      relation: 'Spouse'
    },
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    membershipStatus: 'active',
    startDate: '15 Jan 2026',
    expiryDate: '15 Jan 2027',
    remainingDays: 116,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Sneha Reddy',
    totalVisits: 31,
    workoutsCompleted: 24,
    streakDays: 6,
    totalSpent: 18000,
    notes: 'Regular 7:30 PM attendee. High adherence.',
    healthMetrics: {
      weightKg: 55.0,
      heightCm: 161,
      bmi: 21.2,
      goal: 'Tone & Flexibility'
    }
  },
  {
    id: 'mem-7',
    memberId: 'MEM-002487',
    name: 'Vikramaditya Rao',
    phone: '+91 98407 89012',
    email: 'vikram.rao@financial.in',
    dob: '22 Dec 1985',
    gender: 'Male',
    emergencyContact: {
      name: 'Sunita Rao',
      phone: '+91 98407 98765',
      relation: 'Spouse'
    },
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Premium',
    membershipStatus: 'active',
    startDate: '01 Jun 2026',
    expiryDate: '01 Jun 2027',
    remainingDays: 253,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Vikram Singh',
    totalVisits: 45,
    workoutsCompleted: 38,
    streakDays: 12,
    totalSpent: 42000,
    notes: 'VIP locker #12 assigned. Powerlifting focus.',
    healthMetrics: {
      weightKg: 88.5,
      heightCm: 182,
      bmi: 26.7,
      goal: 'Strength & Powerlifting'
    }
  },
  {
    id: 'mem-8',
    memberId: 'MEM-002488',
    name: 'Ananya Krishnan',
    phone: '+91 98408 90123',
    email: 'ananya.k@biotech.ac.in',
    dob: '18 Feb 1998',
    gender: 'Female',
    emergencyContact: {
      name: 'R. Krishnan',
      phone: '+91 98408 98765',
      relation: 'Father'
    },
    photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Standard',
    membershipStatus: 'suspended',
    startDate: '10 Feb 2026',
    expiryDate: '10 Nov 2026',
    remainingDays: 50,
    branch: 'Chennai Central Gym',
    assignedTrainer: 'Ananya Roy',
    totalVisits: 11,
    workoutsCompleted: 9,
    streakDays: 0,
    totalSpent: 9800,
    notes: 'Medical freeze applied for 30 days due to ankle sprain.',
    healthMetrics: {
      weightKg: 61.0,
      heightCm: 166,
      bmi: 22.1,
      goal: 'Rehabilitation & Conditioning'
    }
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    memberId: 'MEM-002481',
    memberName: 'Arun Kumar',
    memberPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    checkInTime: '06:42 AM',
    checkOutTime: null,
    date: '2026-09-21',
    method: 'qr',
    branch: 'Chennai Central Gym',
    status: 'present'
  },
  {
    id: 'att-2',
    memberId: 'MEM-002482',
    memberName: 'Priya Sharma',
    memberPhoto: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Premium',
    checkInTime: '07:15 AM',
    checkOutTime: '08:45 AM',
    date: '2026-09-21',
    method: 'qr',
    branch: 'Chennai Central Gym',
    status: 'checked_out'
  },
  {
    id: 'att-3',
    memberId: 'MEM-002483',
    memberName: 'Rajesh Patel',
    memberPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Standard',
    checkInTime: '07:30 AM',
    checkOutTime: '09:00 AM',
    date: '2026-09-21',
    method: 'reception',
    branch: 'Chennai Central Gym',
    status: 'checked_out'
  },
  {
    id: 'att-4',
    memberId: 'MEM-002486',
    memberName: 'Sneha Chawla',
    memberPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    checkInTime: '08:05 AM',
    checkOutTime: null,
    date: '2026-09-21',
    method: 'biometric',
    branch: 'Chennai Central Gym',
    status: 'present'
  },
  {
    id: 'att-5',
    memberId: 'MEM-002487',
    memberName: 'Vikramaditya Rao',
    memberPhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Premium',
    checkInTime: '08:30 AM',
    checkOutTime: null,
    date: '2026-09-21',
    method: 'qr',
    branch: 'Chennai Central Gym',
    status: 'present'
  },
  {
    id: 'att-6',
    memberId: 'MEM-002484',
    memberName: 'Deepa Nair',
    memberPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    membershipTier: 'Gold',
    checkInTime: '09:10 AM',
    checkOutTime: '10:25 AM',
    date: '2026-09-21',
    method: 'manual',
    branch: 'Chennai Central Gym',
    status: 'checked_out'
  }
];

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'plan-basic',
    name: 'Basic',
    price: 1500,
    billingPeriod: 'Monthly',
    durationDays: 30,
    description: 'Essential access for self-guided workout routines during standard floor hours.',
    features: [
      'Full Gym Floor & Free Weights Access',
      'General Changing Room & Locker Access',
      'Standard Floor Hours (6:00 AM - 10:00 PM)',
      'GymOS Member App Access'
    ],
    activeMembers: 412,
    monthlyRevenue: 618000,
    status: 'active'
  },
  {
    id: 'plan-standard',
    name: 'Standard',
    price: 2800,
    billingPeriod: 'Monthly',
    durationDays: 30,
    description: 'Comprehensive access with cardio zone, assessment, and steam room.',
    features: [
      'All Basic Tier Inclusions',
      'Dedicated Cardio Theater Zone',
      'Bi-weekly Body Composition Analysis',
      'Steam & Sauna Access (2 visits / month)',
      'Free Locker Rental during workout'
    ],
    activeMembers: 768,
    monthlyRevenue: 2150400,
    status: 'active'
  },
  {
    id: 'plan-gold',
    name: 'Gold',
    price: 4500,
    billingPeriod: 'Monthly',
    durationDays: 30,
    description: 'Our most popular tier with dedicated coaching, unlimited wet area, and nutrition guidelines.',
    features: [
      'All Standard Tier Inclusions',
      'Unlimited Steam & Sauna Access',
      '4 1-on-1 Personal Training Sessions / month',
      'Custom Nutrition & Macronutrient Blueprint',
      'Dedicated Permanent Locker with Nameplate',
      'Priority Class & Equipment Reservations'
    ],
    activeMembers: 814,
    monthlyRevenue: 3663000,
    status: 'active'
  },
  {
    id: 'plan-premium',
    name: 'Premium',
    price: 7500,
    billingPeriod: 'Monthly',
    durationDays: 30,
    description: 'Executive all-inclusive wellness experience with unlimited trainer access and guest passes.',
    features: [
      'All Gold Tier Inclusions',
      'Unlimited 1-on-1 Senior Trainer Guidance',
      'Multi-branch All-Access Passport',
      '4 Complimentary Monthly Guest Day Passes',
      'Free Laundry for Gym Apparel & Towel Service',
      'Biometric VIP Gate Access'
    ],
    activeMembers: 492,
    monthlyRevenue: 3690000,
    status: 'active'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay-1',
    transactionId: 'TXN-2026-9812',
    invoiceNumber: 'INV-2026-8941',
    memberId: 'MEM-002481',
    memberName: 'Arun Kumar',
    membershipTier: 'Gold',
    amount: 1500,
    paymentMethod: 'UPI',
    date: '02 Oct 2026',
    time: '11:42 AM',
    status: 'Completed',
    notes: 'Monthly renewal payment via Google Pay UPI reference 3290481029.'
  },
  {
    id: 'pay-2',
    transactionId: 'TXN-2026-9813',
    invoiceNumber: 'INV-2026-8942',
    memberId: 'MEM-002482',
    memberName: 'Priya Sharma',
    membershipTier: 'Premium',
    amount: 7500,
    paymentMethod: 'Card',
    date: '20 Sep 2026',
    time: '04:15 PM',
    status: 'Completed',
    notes: 'HDFC Corporate Visa Card payment.'
  },
  {
    id: 'pay-3',
    transactionId: 'TXN-2026-9814',
    invoiceNumber: 'INV-2026-8943',
    memberId: 'MEM-002483',
    memberName: 'Rajesh Patel',
    membershipTier: 'Standard',
    amount: 2800,
    paymentMethod: 'UPI',
    date: '18 Sep 2026',
    time: '10:05 AM',
    status: 'Completed',
    notes: 'PhonePe UPI reference 9182371920.'
  },
  {
    id: 'pay-4',
    transactionId: 'TXN-2026-9815',
    invoiceNumber: 'INV-2026-8944',
    memberId: 'MEM-002485',
    memberName: 'Karthik Venkat',
    membershipTier: 'Basic',
    amount: 1500,
    paymentMethod: 'Cash',
    date: '15 Sep 2026',
    time: '06:30 PM',
    status: 'Completed',
    notes: 'Counter reception receipt #REC-4829.'
  },
  {
    id: 'pay-5',
    transactionId: 'TXN-2026-9816',
    invoiceNumber: 'INV-2026-8945',
    memberId: 'MEM-002484',
    memberName: 'Deepa Nair',
    membershipTier: 'Gold',
    amount: 4500,
    paymentMethod: 'Online',
    date: '21 Sep 2026',
    time: '09:20 AM',
    status: 'Pending',
    notes: 'Gateway payment initiated; awaiting bank reconciliation.'
  },
  {
    id: 'pay-6',
    transactionId: 'TXN-2026-9817',
    invoiceNumber: 'INV-2026-8946',
    memberId: 'MEM-002487',
    memberName: 'Vikramaditya Rao',
    membershipTier: 'Premium',
    amount: 21500,
    paymentMethod: 'Bank Transfer',
    date: '12 Sep 2026',
    time: '02:40 PM',
    status: 'Completed',
    notes: 'Quarterly advance payment via NEFT ref AXISN00921820.'
  }
];

export const INITIAL_TRAINERS: Trainer[] = [
  {
    id: 'trn-1',
    name: 'Vikram Singh',
    photoUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
    specialization: 'Strength & Conditioning',
    activeMembers: 28,
    monthlySessions: 114,
    rating: 4.9,
    status: 'Active',
    phone: '+91 98410 11223',
    email: 'vikram.singh@gymos.internal',
    branch: 'Chennai Central Gym',
    schedule: 'Mon - Sat (06:00 AM - 02:00 PM)'
  },
  {
    id: 'trn-2',
    name: 'Ananya Roy',
    photoUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    specialization: 'Functional & HIIT',
    activeMembers: 24,
    monthlySessions: 98,
    rating: 4.8,
    status: 'Active',
    phone: '+91 98410 22334',
    email: 'ananya.roy@gymos.internal',
    branch: 'Chennai Central Gym',
    schedule: 'Mon - Sat (07:00 AM - 03:00 PM)'
  },
  {
    id: 'trn-3',
    name: 'Rajesh Pillai',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    specialization: 'Powerlifting & Hypertrophy',
    activeMembers: 31,
    monthlySessions: 122,
    rating: 4.95,
    status: 'Active',
    phone: '+91 98410 33445',
    email: 'rajesh.pillai@gymos.internal',
    branch: 'Chennai Central Gym',
    schedule: 'Mon - Sat (02:00 PM - 10:00 PM)'
  },
  {
    id: 'trn-4',
    name: 'Sneha Reddy',
    photoUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=150&auto=format&fit=crop&q=80',
    specialization: 'Yoga & Mobility Coaching',
    activeMembers: 19,
    monthlySessions: 76,
    rating: 4.85,
    status: 'Active',
    phone: '+91 98410 44556',
    email: 'sneha.reddy@gymos.internal',
    branch: 'Chennai Central Gym',
    schedule: 'Mon - Fri (06:30 AM - 12:30 PM)'
  },
  {
    id: 'trn-5',
    name: 'Sameer Khan',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    specialization: 'Cross-Training & Boxing',
    activeMembers: 22,
    monthlySessions: 84,
    rating: 4.75,
    status: 'On Leave',
    phone: '+91 98410 55667',
    email: 'sameer.khan@gymos.internal',
    branch: 'Chennai Central Gym',
    schedule: 'Returning on 25 Sep'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Membership Expiring Soon',
    message: 'Gold Membership for Arun Kumar (MEM-002481) expires in 23 days on 24 Oct 2026.',
    category: 'membership_expiry',
    timestamp: 'Today, 08:30 AM',
    read: false,
    channels: ['WhatsApp', 'Push'],
    audience: 'Expiring in 30 Days',
    deliveryStatus: 'Delivered'
  },
  {
    id: 'notif-2',
    title: 'Payment Received',
    message: 'Payment of ₹1,500 recorded for Arun Kumar via UPI. Invoice #INV-2026-8941 generated.',
    category: 'payment',
    timestamp: 'Today, 07:15 AM',
    read: false,
    channels: ['SMS', 'Email'],
    audience: 'Member Only',
    deliveryStatus: 'Sent'
  },
  {
    id: 'notif-3',
    title: 'Daily Check-in Record',
    message: 'Attendance marked: Arun Kumar checked in at Chennai Central Gym at 06:42 AM via QR Scan.',
    category: 'attendance',
    timestamp: 'Today, 06:42 AM',
    read: true,
    channels: ['Push'],
    audience: 'Member Only',
    deliveryStatus: 'Delivered'
  },
  {
    id: 'notif-4',
    title: 'Facility Maintenance Notice',
    message: 'Annual sauna preventative maintenance scheduled for Sunday, 27 Sep from 2:00 PM to 6:00 PM.',
    category: 'system',
    timestamp: 'Yesterday',
    read: true,
    channels: ['Push', 'Email', 'WhatsApp'],
    audience: 'All Active Members',
    deliveryStatus: 'Delivered'
  },
  {
    id: 'notif-5',
    title: 'Annual Plan Upgrade Incentive',
    message: 'Complimentary 60-day extension on renewal of Annual Gold or Premium memberships.',
    category: 'promotions',
    timestamp: '3 days ago',
    read: true,
    channels: ['WhatsApp', 'Email'],
    audience: 'Quarterly & Monthly Members',
    deliveryStatus: 'Sent'
  }
];

export const INITIAL_ROLES: RolePermissions[] = [
  {
    role: 'Super Admin',
    description: 'Complete unrestricted control across all gym branches, billing systems, and audit logs.',
    usersCount: 3,
    permissions: {
      members: { view: true, create: true, edit: true, delete: true },
      attendance: { view: true, create: true, edit: true },
      payments: { view: true, create: true, refund: true },
      reports: { view: true, export: true },
      settings: { view: true, edit: true }
    }
  },
  {
    role: 'Branch Admin',
    description: 'Full management within assigned branch location, member enrollment, and trainer assignments.',
    usersCount: 8,
    permissions: {
      members: { view: true, create: true, edit: true, delete: false },
      attendance: { view: true, create: true, edit: true },
      payments: { view: true, create: true, refund: false },
      reports: { view: true, export: true },
      settings: { view: true, edit: false }
    }
  },
  {
    role: 'Manager',
    description: 'Operations manager overseeing floor staffing, customer escalations, and shift attendance.',
    usersCount: 12,
    permissions: {
      members: { view: true, create: true, edit: true, delete: false },
      attendance: { view: true, create: true, edit: true },
      payments: { view: true, create: false, refund: false },
      reports: { view: true, export: false },
      settings: { view: false, edit: false }
    }
  },
  {
    role: 'Receptionist',
    description: 'Front desk operations, visitor greeting, manual check-in assistance, and spot cash/UPI recording.',
    usersCount: 18,
    permissions: {
      members: { view: true, create: true, edit: false, delete: false },
      attendance: { view: true, create: true, edit: false },
      payments: { view: true, create: true, refund: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false }
    }
  },
  {
    role: 'Trainer',
    description: 'Fitness coaches managing their specific assigned trainee schedules and workout notes.',
    usersCount: 34,
    permissions: {
      members: { view: true, create: false, edit: false, delete: false },
      attendance: { view: true, create: false, edit: false },
      payments: { view: false, create: false, refund: false },
      reports: { view: false, export: false },
      settings: { view: false, edit: false }
    }
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'aud-1',
    timestamp: '21 Sep 2026, 06:42 AM',
    actor: 'QR Terminal #01',
    action: 'MEMBER_CHECKIN',
    category: 'Attendance',
    details: 'Arun Kumar (MEM-002481) checked in via QR scanner.',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'aud-2',
    timestamp: '21 Sep 2026, 07:15 AM',
    actor: 'Receptionist (K. Ramesh)',
    action: 'PAYMENT_RECORDED',
    category: 'Billing',
    details: 'Recorded UPI payment ₹1,500 for Arun Kumar (MEM-002481). Invoice #INV-2026-8941.',
    ipAddress: '192.168.1.102'
  },
  {
    id: 'aud-3',
    timestamp: '20 Sep 2026, 04:30 PM',
    actor: 'Branch Admin (S. Mehra)',
    action: 'MEMBERSHIP_STATUS_UPDATE',
    category: 'Membership',
    details: 'Applied 30-day medical freeze to Ananya Krishnan (MEM-002488).',
    ipAddress: '192.168.1.101'
  },
  {
    id: 'aud-4',
    timestamp: '19 Sep 2026, 02:15 PM',
    actor: 'Super Admin',
    action: 'ROLE_PERMISSION_CHANGE',
    category: 'Security',
    details: 'Updated export report permissions for Manager role.',
    ipAddress: '10.0.0.15'
  }
];

export const BRANCHES = [
  'Chennai Central Gym',
  'Bangalore Indiranagar',
  'Hyderabad Jubilee Hills',
  'Mumbai BKC'
];
