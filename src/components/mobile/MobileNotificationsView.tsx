import React from 'react';
import { useGym } from '../../context/GymContext';
import {
  Bell,
  Clock,
  CheckCircle2,
  CalendarCheck,
  CreditCard,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const MobileNotificationsView: React.FC = () => {
  const { setMobileScreen } = useGym();

  const notifications = [
    {
      id: 'm-notif-1',
      title: 'Membership Expiring in 23 Days',
      description: 'Your Gold Membership expires on 24 Oct 2026. Tap to renew and keep your 4-day workout streak.',
      time: 'Today, 08:30 AM',
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200'
    },
    {
      id: 'm-notif-2',
      title: 'Payment Received',
      description: 'Payment of ₹1,500 via UPI recorded successfully. Receipt #INV-2026-8941 is available to download.',
      time: 'Today, 07:15 AM',
      icon: CreditCard,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
    },
    {
      id: 'm-notif-3',
      title: 'Attendance Recorded',
      description: 'Check-in recorded at Chennai Central Gym turnstile at 06:42 AM via Optical QR.',
      time: 'Today, 06:42 AM',
      icon: CalendarCheck,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-200'
    },
    {
      id: 'm-notif-4',
      title: 'Membership Renewed',
      description: 'Your Gold Tier access has been extended for 30 days. Enjoy full floor and steam amenities.',
      time: 'Yesterday',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-200'
    },
    {
      id: 'm-notif-5',
      title: 'Facility Schedule: Diwali Holiday',
      description: 'Gym floor hours adjusted for festive schedule on Nov 1 (07:00 AM - 01:00 PM).',
      time: '3 days ago',
      icon: Calendar,
      iconBg: 'bg-slate-100 text-slate-600 border border-slate-200'
    }
  ];

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Notifications
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Important updates regarding your membership, billing & check-ins
          </p>
        </div>
      </div>

      {/* Notification Cards */}
      <div className="space-y-3">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle flex items-start gap-3.5 hover:border-slate-300 transition-all"
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {item.time}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
