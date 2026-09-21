import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { EditMemberModal } from '../modals/EditMemberModal';
import { RenewMembershipModal } from '../modals/RenewMembershipModal';
import { RecordPaymentModal } from '../modals/RecordPaymentModal';
import { ReceiptModal } from '../modals/ReceiptModal';
import { PaymentRecord } from '../../types/gym';
import {
  ArrowLeft,
  Edit2,
  RotateCcw,
  CreditCard,
  PauseCircle,
  Phone,
  Mail,
  Calendar,
  User,
  HeartPulse,
  Activity,
  CheckCircle2,
  FileText,
  Clock,
  Dumbbell,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export const MemberProfileView: React.FC = () => {
  const {
    selectedMember,
    setAdminScreen,
    suspendMember,
    attendance,
    payments
  } = useGym();

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Membership' | 'Attendance' | 'Payments' | 'Workout' | 'Notes'
  >('Overview');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [viewingPayment, setViewingPayment] = useState<PaymentRecord | null>(null);

  if (!selectedMember) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Member not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setAdminScreen('members')}
        >
          Back to Directory
        </Button>
      </div>
    );
  }

  // Attendance for this member
  const memberAttendance = attendance.filter(
    (a) => a.memberId === selectedMember.memberId
  );

  // Payments for this member
  const memberPayments = payments.filter(
    (p) => p.memberId === selectedMember.memberId
  );

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Top back navigation & action strip */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setAdminScreen('members')}
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Member Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<PauseCircle className="w-4 h-4" />}
            onClick={() => suspendMember(selectedMember.id)}
          >
            {selectedMember.membershipStatus === 'suspended'
              ? 'Unsuspend'
              : 'Suspend'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<CreditCard className="w-4 h-4" />}
            onClick={() => setIsPaymentModalOpen(true)}
          >
            Record Payment
          </Button>

          <Button
            variant="outline"
            size="sm"
            icon={<RotateCcw className="w-4 h-4 text-emerald-700" />}
            onClick={() => setIsRenewModalOpen(true)}
          >
            Renew Membership
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Edit2 className="w-4 h-4" />}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Member
          </Button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img
            src={selectedMember.photoUrl}
            alt={selectedMember.name}
            className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-sm shrink-0"
          />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {selectedMember.name}
              </h1>
              <Badge variant={selectedMember.membershipStatus as any} size="sm">
                {selectedMember.membershipStatus.toUpperCase()}
              </Badge>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
              <span>{selectedMember.memberId}</span>
              <span>&bull;</span>
              <span>{selectedMember.branch}</span>
              <span>&bull;</span>
              <span>Assigned Trainer: {selectedMember.assignedTrainer}</span>
            </div>
          </div>
        </div>

        {/* Quick KPI pills */}
        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Total Visits
            </span>
            <p className="text-lg font-bold text-slate-900">
              {selectedMember.totalVisits}
            </p>
          </div>
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Streak
            </span>
            <p className="text-lg font-bold text-emerald-700">
              {selectedMember.streakDays} Days
            </p>
          </div>
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-semibold text-slate-400">
              Total Spent
            </span>
            <p className="text-lg font-bold text-slate-900">
              ₹{selectedMember.totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-semibold">
        {(
          [
            'Overview',
            'Membership',
            'Attendance',
            'Payments',
            'Workout',
            'Notes'
          ] as const
        ).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 transition-colors cursor-pointer relative ${
              activeTab === tab
                ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Personal Information */}
          <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Phone Number</span>
                <span className="font-mono font-medium text-slate-800">
                  {selectedMember.phone}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Email Address</span>
                <span className="font-medium text-slate-800">
                  {selectedMember.email}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Date of Birth</span>
                <span className="font-medium text-slate-800">
                  {selectedMember.dob}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Gender</span>
                <span className="font-medium text-slate-800">
                  {selectedMember.gender}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Join Date</span>
                <span className="font-medium text-slate-800">
                  {selectedMember.startDate}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Gym Branch</span>
                <span className="font-medium text-slate-800">
                  {selectedMember.branch}
                </span>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 mb-3">
                Emergency Contact Details
              </h4>
              <div className="grid grid-cols-3 gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Contact Person</span>
                  <span className="font-semibold text-slate-800">
                    {selectedMember.emergencyContact.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Relationship</span>
                  <span className="text-slate-700">
                    {selectedMember.emergencyContact.relation}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Phone</span>
                  <span className="font-mono text-slate-800">
                    {selectedMember.emergencyContact.phone}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Health & Body Metrics */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
              Fitness Assessment
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500">Body Weight</span>
                <span className="font-bold text-slate-900">
                  {selectedMember.healthMetrics.weightKg} kg
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500">Height</span>
                <span className="font-bold text-slate-900">
                  {selectedMember.healthMetrics.heightCm} cm
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500">Body Mass Index (BMI)</span>
                <span className="font-bold text-emerald-700">
                  {selectedMember.healthMetrics.bmi} (Normal)
                </span>
              </div>
              <div className="pt-2">
                <span className="text-slate-500 block text-[11px] mb-1">
                  Primary Fitness Goal
                </span>
                <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded font-semibold text-xs">
                  {selectedMember.healthMetrics.goal}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Membership' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Highlighted Membership Card */}
          <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-7 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs">
                    GO
                  </div>
                  <span className="font-bold tracking-tight text-sm text-emerald-400">
                    GYMOS DIGITAL PASS
                  </span>
                </div>
                <Badge variant="gold" size="md">
                  {selectedMember.membershipTier} PASS
                </Badge>
              </div>

              <div className="mt-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider">
                  Tier Plan
                </p>
                <h2 className="text-2xl font-bold text-white tracking-tight mt-0.5">
                  {selectedMember.membershipTier} Membership
                </h2>
              </div>

              {/* Validity Progress Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-300">
                    Start: {selectedMember.startDate}
                  </span>
                  <span className="text-emerald-400 font-bold">
                    Expires: {selectedMember.expiryDate}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{
                      width: `${Math.max(
                        5,
                        Math.min(100, (selectedMember.remainingDays / 30) * 100)
                      )}%`
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  {selectedMember.remainingDays} days remaining on subscription cycle
                </p>
              </div>
            </div>

            {/* Actions Inside Card */}
            <div className="mt-6 pt-5 border-t border-slate-700/80 flex items-center justify-between relative z-10 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsRenewModalOpen(true)}
                >
                  Renew Membership
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-slate-800 text-white border-slate-600 hover:bg-slate-700"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Change Plan
                </Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => suspendMember(selectedMember.id)}
              >
                Suspend Membership
              </Button>
            </div>
          </div>

          {/* Tier Inclusions Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Included Tier Privileges
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-700 pt-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Unlimited Gym Floor Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Dedicated Locker #42 Assigned</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Trainer Coaching: {selectedMember.assignedTrainer}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Steam & Sauna Unlimited Access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nutrition Blueprint Review</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {activeTab === 'Attendance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Attendance Log for {selectedMember.name}
              </h3>
              <p className="text-xs text-slate-500">
                Total Check-ins: {selectedMember.totalVisits} &bull; Current Streak: {selectedMember.streakDays} Days
              </p>
            </div>
          </div>

          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <th className="py-2">Date</th>
                <th className="py-2">Check-in</th>
                <th className="py-2">Check-out</th>
                <th className="py-2">Method</th>
                <th className="py-2">Branch</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memberAttendance.length > 0 ? (
                memberAttendance.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-mono">{a.date}</td>
                    <td className="py-2.5 font-semibold text-slate-800">
                      {a.checkInTime}
                    </td>
                    <td className="py-2.5 text-slate-500">
                      {a.checkOutTime || 'Present on floor'}
                    </td>
                    <td className="py-2.5">
                      <span className="uppercase text-[10px] font-semibold bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        {a.method}
                      </span>
                    </td>
                    <td className="py-2.5 text-slate-600">{a.branch}</td>
                    <td className="py-2.5">
                      <Badge
                        variant={a.status === 'present' ? 'present' : 'checked_out'}
                        size="sm"
                      >
                        {a.status === 'present' ? 'Active Floor' : 'Checked Out'}
                      </Badge>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No attendance records for today yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Payments' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Payment History & Invoices
              </h3>
              <p className="text-xs text-slate-500">
                All subscriptions, renewal invoices, and POS transactions
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<CreditCard className="w-3.5 h-3.5" />}
              onClick={() => setIsPaymentModalOpen(true)}
            >
              Record Payment
            </Button>
          </div>

          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-100">
                <th className="py-2">Transaction ID</th>
                <th className="py-2">Invoice #</th>
                <th className="py-2">Plan</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Method</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
                <th className="py-2 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {memberPayments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-2.5 font-mono text-slate-700">
                    {p.transactionId}
                  </td>
                  <td className="py-2.5 font-mono text-slate-500">
                    {p.invoiceNumber}
                  </td>
                  <td className="py-2.5 font-medium text-slate-800">
                    {p.membershipTier} Tier
                  </td>
                  <td className="py-2.5 font-bold text-slate-900">
                    ₹{p.amount.toLocaleString()}
                  </td>
                  <td className="py-2.5 text-slate-600">{p.paymentMethod}</td>
                  <td className="py-2.5 text-slate-500">{p.date}</td>
                  <td className="py-2.5">
                    <Badge variant={p.status.toLowerCase() as any} size="sm">
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right">
                    <button
                      onClick={() => setViewingPayment(p)}
                      className="text-emerald-700 hover:underline font-semibold cursor-pointer"
                    >
                      View Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Workout' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Assigned Workout Split & Trainer Directives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Mon / Thu Split
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Posterior Chain & Upper Push
              </h4>
              <p className="text-xs text-slate-600">
                Romanian Deadlifts (4x8), Barbell Incline Press (4x10), Cable Lateral Raises.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Tue / Fri Split
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Quad Dominance & Pull
              </h4>
              <p className="text-xs text-slate-600">
                Front Squats, Neutral Grip Lat Pulldown, Bulgarian Split Squats.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-500">
                Wed / Sat Split
              </span>
              <h4 className="font-bold text-slate-900 text-sm">
                Core & Functional Conditioning
              </h4>
              <p className="text-xs text-slate-600">
                Kettlebell Swings, Farmer Walks, 20-min HIIT Row Intervals.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Notes' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Internal Staff & Medical Notes
          </h3>
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs text-amber-900 leading-relaxed">
            {selectedMember.notes || 'No active medical flags or restrictions recorded.'}
          </div>
        </div>
      )}

      {/* Modals */}
      <EditMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        member={selectedMember}
      />

      <RenewMembershipModal
        isOpen={isRenewModalOpen}
        onClose={() => setIsRenewModalOpen(false)}
        member={selectedMember}
      />

      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        defaultMemberId={selectedMember.id}
      />

      <ReceiptModal
        isOpen={!!viewingPayment}
        onClose={() => setViewingPayment(null)}
        payment={viewingPayment}
      />
    </div>
  );
};
