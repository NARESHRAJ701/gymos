import React from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Shield,
  CheckCircle2,
  Calendar,
  RotateCcw,
  Sparkles,
  ChevronRight,
  CreditCard
} from 'lucide-react';

export const MobileMembershipView: React.FC = () => {
  const { members, setMobileScreen, renewMember } = useGym();
  const arun = members[0];

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          My Membership
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Active plan benefits, privileges and subscription management
        </p>
      </div>

      {/* Large Digital Membership Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white rounded-3xl p-6 shadow-card relative overflow-hidden space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center font-bold text-xs">
              GO
            </div>
            <span className="font-bold tracking-tight text-xs text-emerald-400 uppercase">
              GymOS Member Card
            </span>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 uppercase">
            Active
          </span>
        </div>

        <div>
          <span className="text-xs text-slate-400 uppercase tracking-wider block">
            Subscribed Tier
          </span>
          <h3 className="text-2xl font-bold text-white tracking-tight mt-0.5">
            {arun.membershipTier} Membership
          </h3>
          <p className="text-xs text-slate-300 mt-1 font-mono">
            ID: {arun.memberId}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-700/70 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Valid Until</span>
            <span className="font-bold text-emerald-400 font-mono">
              {arun.expiryDate}
            </span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 block text-[10px]">Remaining</span>
            <span className="font-bold text-white font-mono">
              {arun.remainingDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Membership Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="primary"
          size="md"
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={() => {
            renewMember(arun.id, 1);
            alert('Membership extended by 1 month! Invoice generated in Payments tab.');
          }}
        >
          Renew (1 Month)
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={() => alert('Plan switch dialog: Select Basic, Standard, or Premium.')}
        >
          Change Plan
        </Button>
      </div>

      {/* Included Plan Privileges */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-subtle space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Included Tier Privileges
        </h4>
        <ul className="space-y-2.5 text-xs text-slate-700">
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Unlimited Gym Floor & Cardio Access</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Dedicated Permanent Locker #42</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Personal Trainer Coaching: Vikram Singh</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Steam & Sauna Unlimited Access</span>
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>2 Free Monthly Guest Passes</span>
          </li>
        </ul>
      </div>

      {/* Upgrade Callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between shadow-subtle">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-emerald-400">
            Upgrade to Premium VIP
          </span>
          <p className="text-xs text-slate-300">
            Get unlimited trainer hours & multi-city access
          </p>
        </div>
        <button
          onClick={() => alert('Premium upgrade request submitted to Chennai Central manager.')}
          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};
