import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { StatsCard } from '../common/StatsCard';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { AddMemberModal } from '../modals/AddMemberModal';
import { RecordPaymentModal } from '../modals/RecordPaymentModal';
import { RenewMembershipModal } from '../modals/RenewMembershipModal';
import { Member } from '../../types/gym';
import {
  Users,
  UserCheck,
  Clock,
  CalendarCheck,
  UserPlus,
  CreditCard,
  QrCode,
  ArrowRight,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    members,
    attendance,
    setAdminScreen,
    setSelectedMemberId,
    checkOutMember
  } = useGym();

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [renewingMember, setRenewingMember] = useState<Member | null>(null);

  const [attendancePeriod, setAttendancePeriod] = useState<
    'Today' | '7 Days' | '30 Days' | '3 Months' | 'Custom'
  >('7 Days');

  const [attendanceFilterMethod, setAttendanceFilterMethod] = useState<string>('all');
  const [attendanceSearch, setAttendanceSearch] = useState('');

  // Expiring memberships: members with <= 30 days
  const expiringMembers = members
    .filter((m) => m.remainingDays <= 30)
    .sort((a, b) => a.remainingDays - b.remainingDays);

  // Filtered today attendance
  const filteredAttendance = attendance.filter((r) => {
    const matchesMethod =
      attendanceFilterMethod === 'all' || r.method === attendanceFilterMethod;
    const matchesSearch =
      r.memberName.toLowerCase().includes(attendanceSearch.toLowerCase()) ||
      r.memberId.toLowerCase().includes(attendanceSearch.toLowerCase());
    return matchesMethod && matchesSearch;
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Header & Quick Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, Admin
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Here&apos;s what&apos;s happening across your gym today &bull; Chennai Central Branch
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            icon={<QrCode className="w-4 h-4 text-emerald-700" />}
            onClick={() => setAdminScreen('qr-scanner')}
          >
            Mark Attendance
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<CreditCard className="w-4 h-4 text-slate-700" />}
            onClick={() => setIsPaymentOpen(true)}
          >
            Record Payment
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsAddMemberOpen(true)}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* 4 Large Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard
          title="Total Members"
          value="2,486"
          icon={<Users className="w-4 h-4 text-slate-700" />}
          trend={{ value: "+12.4%", isPositive: true, period: "last month" }}
          sparklineData={[2100, 2180, 2240, 2310, 2390, 2430, 2486]}
          onClick={() => setAdminScreen('members')}
        />

        <StatsCard
          title="Active Members"
          value="2,148"
          icon={<UserCheck className="w-4 h-4 text-emerald-600" />}
          trend={{ value: "+8.4%", isPositive: true, period: "last month" }}
          sparklineData={[1950, 1980, 2020, 2060, 2110, 2130, 2148]}
          onClick={() => setAdminScreen('members')}
        />

        <StatsCard
          title="Expiring Soon"
          value="126"
          icon={<Clock className="w-4 h-4 text-amber-600" />}
          trend={{ value: "-3.2%", isPositive: false, period: "last month" }}
          sparklineData={[145, 140, 138, 132, 129, 128, 126]}
          onClick={() => setAdminScreen('members')}
        />

        <StatsCard
          title="Today's Attendance"
          value="684"
          icon={<CalendarCheck className="w-4 h-4 text-blue-600" />}
          trend={{ value: "+15.1%", isPositive: true, period: "yesterday" }}
          sparklineData={[520, 560, 590, 610, 640, 660, 684]}
          onClick={() => setAdminScreen('attendance')}
        />
      </div>

      {/* Main Analytics Grid: Attendance Area Chart & Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attendance Analytics Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Attendance Overview
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check-ins vs check-outs distribution across operational hours
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-medium">
                {(['Today', '7 Days', '30 Days', '3 Months', 'Custom'] as const).map(
                  (period) => (
                    <button
                      key={period}
                      onClick={() => setAttendancePeriod(period)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        attendancePeriod === period
                          ? 'bg-white text-slate-900 shadow-sm font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {period}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Metric Strip */}
            <div className="grid grid-cols-3 gap-4 my-5 py-3 px-4 bg-slate-50/70 rounded-lg border border-slate-100 text-xs">
              <div>
                <span className="text-slate-500">Total Check-ins</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">684</p>
                <span className="text-[11px] text-emerald-600 font-medium">
                  +12% peak morning rush
                </span>
              </div>
              <div>
                <span className="text-slate-500">Check-outs Recorded</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">492</p>
                <span className="text-[11px] text-slate-500">
                  192 active on gym floor
                </span>
              </div>
              <div>
                <span className="text-slate-500">Average Duration</span>
                <p className="text-lg font-bold text-slate-900 mt-0.5">72 mins</p>
                <span className="text-[11px] text-slate-500">Optimal throughput</span>
              </div>
            </div>

            {/* Professional SVG Area / Line Chart */}
            <div className="h-56 w-full pt-2">
              <svg viewBox="0 0 700 200" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="checkInGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#047857" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="checkOutGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[40, 80, 120, 160].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="700"
                    y2={y}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                ))}

                {/* Check-in Area & Line */}
                <path
                  d="M 0,160 Q 60,110 116,90 T 233,40 T 350,110 T 466,60 T 583,30 T 700,80 L 700,180 L 0,180 Z"
                  fill="url(#checkInGrad)"
                />
                <path
                  d="M 0,160 Q 60,110 116,90 T 233,40 T 350,110 T 466,60 T 583,30 T 700,80"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Check-out Line */}
                <path
                  d="M 0,180 Q 60,150 116,130 T 233,80 T 350,140 T 466,100 T 583,60 T 700,110"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />

                {/* Data Points */}
                {[
                  { cx: 116, cy: 90, label: '06:00' },
                  { cx: 233, cy: 40, label: '09:00' },
                  { cx: 350, cy: 110, label: '12:00' },
                  { cx: 466, cy: 60, label: '15:00' },
                  { cx: 583, cy: 30, label: '18:00' },
                  { cx: 700, cy: 80, label: '21:00' }
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="4" fill="#FFFFFF" stroke="#047857" strokeWidth="2.5" />
                    <text x={pt.cx} y="195" textAnchor="middle" fill="#64748B" fontSize="10" fontFamily="sans-serif">
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-100 text-slate-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-emerald-600 rounded"></span>
                Check-ins (Peak at 6:30 PM)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-1 bg-blue-500 rounded border-dashed"></span>
                Check-outs
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Peak Capacity: 84% at 18:30</span>
          </div>
        </div>

        {/* Secondary Analytics: Revenue Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Revenue Overview</h3>
                <p className="text-xs text-slate-500 mt-0.5">Billing & fee collections</p>
              </div>
              <button
                onClick={() => setAdminScreen('payments')}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                Details
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 3 Metrics */}
            <div className="space-y-3 my-4">
              <div className="p-3 rounded-lg bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-emerald-800 font-medium uppercase tracking-wider">
                    Today&apos;s Revenue
                  </span>
                  <div className="text-xl font-bold text-slate-900 mt-0.5">
                    ₹48,500
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  +18.2%
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                    Monthly Revenue
                  </span>
                  <div className="text-xl font-bold text-slate-900 mt-0.5">
                    ₹12.8L
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-500">Target: ₹14.0L</span>
              </div>

              <div className="p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-amber-800 font-medium uppercase tracking-wider">
                    Pending Payments
                  </span>
                  <div className="text-xl font-bold text-amber-900 mt-0.5">
                    ₹1.42L
                  </div>
                </div>
                <span className="text-xs font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  24 Invoices
                </span>
              </div>
            </div>

            {/* Simple Bar Chart: Weekly Revenue Trend */}
            <div className="pt-2">
              <div className="text-xs font-semibold text-slate-700 mb-2">
                Last 6 Days Inflow (₹ in Thousands)
              </div>
              <div className="flex items-end justify-between h-20 pt-2 px-2">
                {[
                  { day: 'Mon', val: 38 },
                  { day: 'Tue', val: 42 },
                  { day: 'Wed', val: 51 },
                  { day: 'Thu', val: 36 },
                  { day: 'Fri', val: 49 },
                  { day: 'Today', val: 48.5 }
                ].map((bar, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1.5 flex-1">
                    <div
                      style={{ height: `${(bar.val / 60) * 100}%` }}
                      className={`w-5 rounded-t transition-all ${
                        bar.day === 'Today'
                          ? 'bg-emerald-600'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                    <span className="text-[10px] text-slate-500">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Payment Gateway Uptime: 99.98%</span>
            <span className="text-emerald-700 font-medium">Auto-recon Active</span>
          </div>
        </div>
      </div>

      {/* Secondary Row: Membership Distribution Donut & Expiring Memberships */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Distribution Donut Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Membership Distribution
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Breakdown across active subscription tiers
                </p>
              </div>
              <button
                onClick={() => setAdminScreen('memberships')}
                className="text-xs text-emerald-700 font-semibold hover:underline"
              >
                Plans
              </button>
            </div>

            {/* Donut Chart SVG */}
            <div className="flex items-center justify-center my-6 relative">
              <svg width="180" height="180" viewBox="0 0 100 100" className="-rotate-90">
                {/* Background Ring */}
                <circle cx="50" cy="50" r="38" fill="none" stroke="#F1F5F9" strokeWidth="14" />
                
                {/* Gold Tier: 33% (dasharray ~ 79) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#047857"
                  strokeWidth="14"
                  strokeDasharray="79 239"
                  strokeDashoffset="0"
                />
                
                {/* Standard: 31% (dasharray ~ 74) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="14"
                  strokeDasharray="74 239"
                  strokeDashoffset="-79"
                />

                {/* Premium: 20% (dasharray ~ 48) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#7C3AED"
                  strokeWidth="14"
                  strokeDasharray="48 239"
                  strokeDashoffset="-153"
                />

                {/* Basic: 16% (dasharray ~ 38) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="14"
                  strokeDasharray="38 239"
                  strokeDashoffset="-201"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-bold text-slate-900">2,486</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                  Total
                </span>
              </div>
            </div>

            {/* Donut Legend */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#047857]"></span>
                  Gold Tier (Annual / Qtr)
                </span>
                <span className="font-semibold text-slate-900">814 (33%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2563EB]"></span>
                  Standard Tier
                </span>
                <span className="font-semibold text-slate-900">768 (31%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#7C3AED]"></span>
                  Premium VIP
                </span>
                <span className="font-semibold text-slate-900">492 (20%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#94A3B8]"></span>
                  Basic Floor
                </span>
                <span className="font-semibold text-slate-900">412 (16%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Expiring Memberships Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Expiring Memberships ({expiringMembers.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Members requiring renewal outreach within the next 30 days
                </p>
              </div>
              <button
                onClick={() => setAdminScreen('members')}
                className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                View all members
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Member</th>
                    <th className="py-2.5 px-3">Plan</th>
                    <th className="py-2.5 px-3">Expiry Date</th>
                    <th className="py-2.5 px-3">Days Remaining</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expiringMembers.slice(0, 4).map((m) => (
                    <tr key={m.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3">
                        <div
                          className="flex items-center gap-2.5 cursor-pointer"
                          onClick={() => {
                            setSelectedMemberId(m.id);
                            setAdminScreen('member-profile');
                          }}
                        >
                          <img
                            src={m.photoUrl}
                            alt={m.name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-slate-900 hover:text-emerald-700 transition-colors">
                              {m.name}
                            </p>
                            <p className="text-[10px] text-slate-400">{m.memberId}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700">
                          {m.membershipTier}
                        </span>
                      </td>

                      <td className="py-3 px-3 text-slate-600 font-mono text-[11px]">
                        {m.expiryDate}
                      </td>

                      <td className="py-3 px-3 font-semibold text-slate-800">
                        <span
                          className={
                            m.remainingDays <= 5
                              ? 'text-rose-600'
                              : m.remainingDays <= 15
                              ? 'text-amber-600'
                              : 'text-slate-700'
                          }
                        >
                          {m.remainingDays} days
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <Badge
                          variant={
                            m.remainingDays <= 15 ? 'expiring' : 'active'
                          }
                          size="sm"
                        >
                          {m.remainingDays <= 15 ? 'Expiring Soon' : 'Active'}
                        </Badge>
                      </td>

                      <td className="py-3 px-3 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRenewingMember(m)}
                        >
                          Renew
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Automated renewal alerts sent 7 and 3 days prior to expiration.</span>
            <span className="text-emerald-700 font-semibold">Retention Rate: 87.4%</span>
          </div>
        </div>
      </div>

      {/* Today's Attendance Table */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Today&apos;s Floor Attendance ({attendance.length} Records)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live turnstile check-ins and receptionist registrations for 21 Sep 2026
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter today's logs..."
                value={attendanceSearch}
                onChange={(e) => setAttendanceSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Method Filter */}
            <select
              value={attendanceFilterMethod}
              onChange={(e) => setAttendanceFilterMethod(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
            >
              <option value="all">All Methods</option>
              <option value="qr">QR Code</option>
              <option value="reception">Reception Desk</option>
              <option value="manual">Manual Entry</option>
              <option value="biometric">Biometric</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              icon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => setAdminScreen('qr-scanner')}
            >
              Scan Check-in
            </Button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Member</th>
                <th className="py-2.5 px-3">Member ID</th>
                <th className="py-2.5 px-3">Check-in</th>
                <th className="py-2.5 px-3">Check-out</th>
                <th className="py-2.5 px-3">Method</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Floor Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAttendance.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={rec.memberPhoto}
                        alt={rec.memberName}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{rec.memberName}</p>
                        <p className="text-[10px] text-slate-400">{rec.membershipTier} Tier</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-slate-600 text-[11px]">
                    {rec.memberId}
                  </td>

                  <td className="py-3 px-3 font-medium text-slate-800">
                    {rec.checkInTime}
                  </td>

                  <td className="py-3 px-3 text-slate-500">
                    {rec.checkOutTime || (
                      <span className="text-emerald-600 font-medium">On floor</span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 uppercase font-semibold text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {rec.method}
                    </span>
                  </td>

                  <td className="py-3 px-3">
                    <Badge
                      variant={rec.status === 'present' ? 'present' : 'checked_out'}
                      size="sm"
                    >
                      {rec.status === 'present' ? 'Present' : 'Checked Out'}
                    </Badge>
                  </td>

                  <td className="py-3 px-3 text-right">
                    {rec.status === 'present' ? (
                      <button
                        onClick={() => checkOutMember(rec.memberId)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
                      >
                        Check Out
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
      />

      <RecordPaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
      />

      <RenewMembershipModal
        isOpen={!!renewingMember}
        onClose={() => setRenewingMember(null)}
        member={renewingMember}
      />
    </div>
  );
};
