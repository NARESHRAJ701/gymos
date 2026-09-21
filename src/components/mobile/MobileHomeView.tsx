import React from 'react';
import { useGym } from '../../context/GymContext';
import { Badge } from '../common/Badge';
import {
  Bell,
  QrCode,
  CalendarCheck,
  Shield,
  CreditCard,
  Dumbbell,
  Flame,
  Clock,
  ChevronRight,
  CheckCircle2,
  LogOut
} from 'lucide-react';

export const MobileHomeView: React.FC = () => {
  const {
    members,
    setMobileScreen,
    checkOutMember,
    isMemberCheckedInToday
  } = useGym();

  const arun = members[0]; // Arun Kumar
  const isCheckedIn = isMemberCheckedInToday(arun.memberId);

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={arun.photoUrl}
            alt={arun.name}
            onClick={() => setMobileScreen('profile')}
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 shadow-sm cursor-pointer"
          />
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Good morning, Arun
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              Chennai Central &bull; MEM-002481
            </p>
          </div>
        </div>

        <button
          onClick={() => setMobileScreen('notifications')}
          className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-xs relative transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-emerald-600 absolute top-2 right-2 ring-1 ring-white"></span>
        </button>
      </div>

      {/* Membership Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-600 flex items-center justify-center font-bold text-[10px]">
              GO
            </div>
            <span className="font-bold tracking-tight text-xs text-emerald-400">
              GYMOS DIGITAL PASS
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase tracking-wider">
            Active
          </span>
        </div>

        <div className="mt-4">
          <h3 className="text-xl font-bold text-white tracking-tight">
            {arun.membershipTier} Membership
          </h3>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Valid until: {arun.expiryDate}
          </p>
        </div>

        {/* Clean Progress Indicator */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-400">Remaining</span>
            <span className="text-emerald-400 font-bold">
              {arun.remainingDays} days remaining
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${(arun.remainingDays / 30) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Primary Action: QR ACCESS */}
      <button
        onClick={() => setMobileScreen('qr-code')}
        className="w-full py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs flex items-center justify-center gap-2.5 shadow-sm transition-all active:scale-[0.98] cursor-pointer"
      >
        <QrCode className="w-4 h-4" />
        <span>Show QR Code for Check-in</span>
      </button>

      {/* Today's Attendance Status Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-subtle flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center ${
              isCheckedIn
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Today&apos;s Attendance
            </span>
            <p className="text-xs font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
              {isCheckedIn ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                  Checked In: 06:42 AM
                </>
              ) : (
                'Not Checked In Yet'
              )}
            </p>
          </div>
        </div>

        {isCheckedIn ? (
          <button
            onClick={() => checkOutMember(arun.memberId)}
            className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
          >
            Check Out
          </button>
        ) : (
          <button
            onClick={() => setMobileScreen('qr-code')}
            className="px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold"
          >
            Check In
          </button>
        )}
      </div>

      {/* Quick Actions Grid */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Quick Actions
        </h4>
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={() => setMobileScreen('attendance')}
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center gap-1.5 shadow-subtle transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-700">
              Attendance
            </span>
          </button>

          <button
            onClick={() => setMobileScreen('membership')}
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center gap-1.5 shadow-subtle transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-700">
              Membership
            </span>
          </button>

          <button
            onClick={() => setMobileScreen('payments')}
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center gap-1.5 shadow-subtle transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-700">Payment</span>
          </button>

          <button
            onClick={() => alert('Assigned Workout split: Posterior chain, squats & deadlifts.')}
            className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center gap-1.5 shadow-subtle transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-700">Workout</span>
          </button>
        </div>
      </div>

      {/* Monthly Activity Stats */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Monthly Activity
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Gym Visits
            </span>
            <p className="text-lg font-bold text-slate-900 mt-0.5">18</p>
            <span className="text-[10px] text-emerald-600 font-medium">
              This Month
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Workouts
            </span>
            <p className="text-lg font-bold text-slate-900 mt-0.5">12</p>
            <span className="text-[10px] text-slate-500 font-medium">Logged</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Total Time
            </span>
            <p className="text-lg font-bold text-slate-900 mt-0.5">5h 20m</p>
            <span className="text-[10px] text-slate-500 font-medium">Floor Time</span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-subtle">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Streak
            </span>
            <p className="text-lg font-bold text-emerald-700 mt-0.5 flex items-center gap-1">
              <Flame className="w-4 h-4 fill-current text-emerald-600" />
              4 Days
            </p>
            <span className="text-[10px] text-emerald-600 font-medium">
              Keep it up!
            </span>
          </div>
        </div>
      </div>

      {/* Attendance History Snippet */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Attendance History
          </h4>
          <button
            onClick={() => setMobileScreen('attendance')}
            className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-0.5"
          >
            View All
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 shadow-subtle">
          <div className="p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <div>
                <p className="font-semibold text-slate-900">Today</p>
                <p className="text-[10px] text-slate-500">Chennai Central Gym</p>
              </div>
            </div>
            <span className="font-mono text-slate-700 font-medium">
              Checked in 06:42 AM
            </span>
          </div>

          <div className="p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <div>
                <p className="font-semibold text-slate-900">Yesterday</p>
                <p className="text-[10px] text-slate-500">Chennai Central Gym</p>
              </div>
            </div>
            <span className="font-mono text-slate-700 font-medium">
              Checked in 06:31 AM
            </span>
          </div>

          <div className="p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              <div>
                <p className="font-semibold text-slate-900">18 Sep</p>
                <p className="text-[10px] text-slate-500">Chennai Central Gym</p>
              </div>
            </div>
            <span className="font-mono text-slate-700 font-medium">
              Checked in 07:05 AM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
