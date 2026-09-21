import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Member,
  AttendanceRecord,
  MembershipPlan,
  PaymentRecord,
  Trainer,
  NotificationItem,
  RolePermissions,
  AuditLogItem,
  UserRole
} from '../types/gym';
import {
  INITIAL_MEMBERS,
  INITIAL_ATTENDANCE,
  INITIAL_PLANS,
  INITIAL_PAYMENTS,
  INITIAL_TRAINERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ROLES,
  INITIAL_AUDIT_LOGS,
  BRANCHES
} from '../data/mockData';

export type ViewMode = 'web' | 'mobile' | 'split';

export type AdminScreen =
  | 'login'
  | 'dashboard'
  | 'members'
  | 'member-profile'
  | 'attendance'
  | 'qr-scanner'
  | 'memberships'
  | 'payments'
  | 'trainers'
  | 'reports'
  | 'notifications'
  | 'settings'
  | 'roles';

export type MobileScreen =
  | 'login'
  | 'home'
  | 'qr-code'
  | 'attendance'
  | 'membership'
  | 'payments'
  | 'notifications'
  | 'profile';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface GymContextType {
  // View mode & navigation
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  adminScreen: AdminScreen;
  setAdminScreen: (screen: AdminScreen) => void;
  mobileScreen: MobileScreen;
  setMobileScreen: (screen: MobileScreen) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;

  // Branch & auth
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  adminRole: UserRole;
  setAdminRole: (role: UserRole) => void;
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (status: boolean) => void;
  isMobileLoggedIn: boolean;
  setIsMobileLoggedIn: (status: boolean) => void;

  // Domain data
  members: Member[];
  selectedMemberId: string;
  setSelectedMemberId: (id: string) => void;
  selectedMember: Member;
  addMember: (newMember: Omit<Member, 'id' | 'memberId' | 'totalVisits' | 'workoutsCompleted' | 'streakDays' | 'totalSpent'>) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  suspendMember: (id: string) => void;
  renewMember: (id: string, months: number) => void;

  attendance: AttendanceRecord[];
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => { success: boolean; message: string };
  checkOutMember: (memberId: string) => void;
  isMemberCheckedInToday: (memberId: string) => boolean;

  plans: MembershipPlan[];
  addPlan: (newPlan: Omit<MembershipPlan, 'id' | 'activeMembers' | 'monthlyRevenue'>) => void;
  togglePlanStatus: (id: string) => void;

  payments: PaymentRecord[];
  recordPayment: (payment: Omit<PaymentRecord, 'id' | 'transactionId' | 'invoiceNumber' | 'date' | 'time'>) => PaymentRecord;

  trainers: Trainer[];
  notifications: NotificationItem[];
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read' | 'deliveryStatus'>) => void;
  markNotificationAsRead: (id: string) => void;

  roles: RolePermissions[];
  updateRolePermission: (role: UserRole, category: 'members' | 'attendance' | 'payments' | 'reports' | 'settings', action: string, value: boolean) => void;

  auditLogs: AuditLogItem[];

  // Toast feedback
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const GymContext = createContext<GymContextType | undefined>(undefined);

export const GymProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('web');
  const [adminScreen, setAdminScreen] = useState<AdminScreen>('dashboard');
  const [mobileScreen, setMobileScreen] = useState<MobileScreen>('home');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  const [selectedBranch, setSelectedBranch] = useState<string>('Chennai Central Gym');
  const [adminRole, setAdminRole] = useState<UserRole>('Super Admin');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(true);
  const [isMobileLoggedIn, setIsMobileLoggedIn] = useState<boolean>(true);

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [selectedMemberId, setSelectedMemberId] = useState<string>('mem-1'); // Arun Kumar by default

  const [attendance, setAttendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
  const [plans, setPlans] = useState<MembershipPlan[]>(INITIAL_PLANS);
  const [payments, setPayments] = useState<PaymentRecord[]>(INITIAL_PAYMENTS);
  const [trainers, setTrainers] = useState<Trainer[]>(INITIAL_TRAINERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [roles, setRoles] = useState<RolePermissions[]>(INITIAL_ROLES);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedMember = members.find((m) => m.id === selectedMemberId) || members[0];

  const addMember = (data: Omit<Member, 'id' | 'memberId' | 'totalVisits' | 'workoutsCompleted' | 'streakDays' | 'totalSpent'>) => {
    const newSeq = members.length + 2481;
    const newMemberId = `MEM-00${newSeq}`;
    const newMember: Member = {
      ...data,
      id: `mem-${Date.now()}`,
      memberId: newMemberId,
      totalVisits: 0,
      workoutsCompleted: 0,
      streakDays: 0,
      totalSpent: 0
    };
    setMembers((prev) => [newMember, ...prev]);

    // Audit log
    setAuditLogs((prev) => [
      {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: 'Admin User',
        action: 'MEMBER_CREATED',
        category: 'Member',
        details: `Created new member ${newMember.name} (${newMember.memberId})`,
        ipAddress: '192.168.1.100'
      },
      ...prev
    ]);

    addToast({
      type: 'success',
      title: 'Member Added Successfully',
      message: `${newMember.name} has been enrolled in ${newMember.membershipTier} tier.`
    });
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
    addToast({
      type: 'success',
      title: 'Member Updated',
      message: 'Profile information saved successfully.'
    });
  };

  const deleteMember = (id: string) => {
    const memberToDelete = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    addToast({
      type: 'info',
      title: 'Member Deleted',
      message: `${memberToDelete?.name || 'Member'} record has been deleted.`
    });
  };

  const suspendMember = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newStatus = m.membershipStatus === 'suspended' ? 'active' : 'suspended';
          return { ...m, membershipStatus: newStatus };
        }
        return m;
      })
    );
    addToast({
      type: 'warning',
      title: 'Status Updated',
      message: 'Membership status has been toggled.'
    });
  };

  const renewMember = (id: string, months: number = 1) => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const daysToAdd = months * 30;
          return {
            ...m,
            remainingDays: m.remainingDays + daysToAdd,
            membershipStatus: 'active',
            expiryDate: '24 Nov 2026'
          };
        }
        return m;
      })
    );
    addToast({
      type: 'success',
      title: 'Membership Renewed',
      message: `Membership extended for ${months} month(s).`
    });
  };

  const isMemberCheckedInToday = (memberId: string): boolean => {
    const today = '2026-09-21';
    return attendance.some(
      (r) => r.memberId === memberId && r.date === today && r.status === 'present'
    );
  };

  const markAttendance = (recordData: Omit<AttendanceRecord, 'id'>) => {
    // Duplicate check
    const isAlreadyCheckedIn = attendance.some(
      (r) => r.memberId === recordData.memberId && r.date === recordData.date && r.status === 'present'
    );

    if (isAlreadyCheckedIn) {
      addToast({
        type: 'error',
        title: 'Duplicate Check-in Alert',
        message: `${recordData.memberName} is already checked in on this date.`
      });
      return { success: false, message: 'Member is already checked in.' };
    }

    const newRecord: AttendanceRecord = {
      ...recordData,
      id: `att-${Date.now()}`
    };

    setAttendance((prev) => [newRecord, ...prev]);

    // Also update the member's visits and streak
    setMembers((prev) =>
      prev.map((m) =>
        m.memberId === recordData.memberId
          ? {
              ...m,
              totalVisits: m.totalVisits + 1,
              streakDays: m.streakDays + 1
            }
          : m
      )
    );

    addToast({
      type: 'success',
      title: 'Attendance Recorded',
      message: `${recordData.memberName} checked in at ${recordData.checkInTime}.`
    });

    return { success: true, message: 'Check-in recorded successfully.' };
  };

  const checkOutMember = (memberId: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAttendance((prev) =>
      prev.map((r) => {
        if (r.memberId === memberId && r.status === 'present') {
          return {
            ...r,
            checkOutTime: timeStr,
            status: 'checked_out'
          };
        }
        return r;
      })
    );

    addToast({
      type: 'info',
      title: 'Check-Out Recorded',
      message: `Member successfully checked out at ${timeStr}.`
    });
  };

  const addPlan = (newPlan: Omit<MembershipPlan, 'id' | 'activeMembers' | 'monthlyRevenue'>) => {
    const plan: MembershipPlan = {
      ...newPlan,
      id: `plan-${Date.now()}`,
      activeMembers: 0,
      monthlyRevenue: 0
    };
    setPlans((prev) => [...prev, plan]);
    addToast({
      type: 'success',
      title: 'Plan Created',
      message: `${plan.name} tier has been added.`
    });
  };

  const togglePlanStatus = (id: string) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = p.status === 'active' ? 'draft' : 'active';
          return { ...p, status: next };
        }
        return p;
      })
    );
  };

  const recordPayment = (
    data: Omit<PaymentRecord, 'id' | 'transactionId' | 'invoiceNumber' | 'date' | 'time'>
  ): PaymentRecord => {
    const now = new Date();
    const txnSeq = Math.floor(1000 + Math.random() * 9000);
    const newRecord: PaymentRecord = {
      ...data,
      id: `pay-${Date.now()}`,
      transactionId: `TXN-2026-${txnSeq}`,
      invoiceNumber: `INV-2026-${txnSeq + 100}`,
      date: '21 Sep 2026',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setPayments((prev) => [newRecord, ...prev]);

    // Update member total spent
    setMembers((prev) =>
      prev.map((m) =>
        m.memberId === data.memberId
          ? { ...m, totalSpent: m.totalSpent + data.amount }
          : m
      )
    );

    addToast({
      type: 'success',
      title: 'Payment Recorded',
      message: `₹${data.amount.toLocaleString()} received via ${data.paymentMethod}. Invoice #${newRecord.invoiceNumber} generated.`
    });

    return newRecord;
  };

  const addNotification = (
    item: Omit<NotificationItem, 'id' | 'timestamp' | 'read' | 'deliveryStatus'>
  ) => {
    const notif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      deliveryStatus: 'Sent'
    };
    setNotifications((prev) => [notif, ...prev]);
    addToast({
      type: 'success',
      title: 'Notification Broadcasted',
      message: `Sent to ${item.audience || 'recipients'}.`
    });
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const updateRolePermission = (
    role: UserRole,
    category: 'members' | 'attendance' | 'payments' | 'reports' | 'settings',
    action: string,
    value: boolean
  ) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.role === role) {
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [category]: {
                ...r.permissions[category],
                [action]: value
              }
            }
          };
        }
        return r;
      })
    );
  };

  return (
    <GymContext.Provider
      value={{
        viewMode,
        setViewMode,
        adminScreen,
        setAdminScreen,
        mobileScreen,
        setMobileScreen,
        sidebarCollapsed,
        setSidebarCollapsed,
        selectedBranch,
        setSelectedBranch,
        adminRole,
        setAdminRole,
        isAdminLoggedIn,
        setIsAdminLoggedIn,
        isMobileLoggedIn,
        setIsMobileLoggedIn,
        members,
        selectedMemberId,
        setSelectedMemberId,
        selectedMember,
        addMember,
        updateMember,
        deleteMember,
        suspendMember,
        renewMember,
        attendance,
        markAttendance,
        checkOutMember,
        isMemberCheckedInToday,
        plans,
        addPlan,
        togglePlanStatus,
        payments,
        recordPayment,
        trainers,
        notifications,
        addNotification,
        markNotificationAsRead,
        roles,
        updateRolePermission,
        auditLogs,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = (): GymContextType => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
