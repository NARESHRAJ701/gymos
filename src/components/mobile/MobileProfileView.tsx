import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  User,
  Phone,
  Mail,
  Calendar,
  Shield,
  Bell,
  Lock,
  LogOut,
  Fingerprint,
  Moon,
  ChevronRight,
  HeartPulse
} from 'lucide-react';

export const MobileProfileView: React.FC = () => {
  const { members, setIsMobileLoggedIn, setMobileScreen } = useGym();
  const arun = members[0];

  const [pushNotifs, setPushNotifs] = useState(true);
  const [biometrics, setBiometrics] = useState(true);

  const handleLogout = () => {
    setIsMobileLoggedIn(false);
    setMobileScreen('login');
  };

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Profile Header */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-subtle">
        <img
          src={arun.photoUrl}
          alt={arun.name}
          className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm"
        />
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {arun.name}
          </h2>
          <p className="text-xs font-mono text-slate-500">{arun.memberId}</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              {arun.membershipTier} Tier
            </span>
            <span className="text-[10px] text-slate-400">Since Sep 2024</span>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Personal Information
        </h3>
        <div className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              Phone Number
            </span>
            <span className="font-mono text-slate-800 font-medium">
              {arun.phone}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              Email Address
            </span>
            <span className="text-slate-800 font-medium">{arun.email}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-50">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5" />
              Date of Birth
            </span>
            <span className="text-slate-800 font-medium">{arun.dob}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Emergency Contact
            </span>
            <span className="text-slate-800 font-medium">
              {arun.emergencyContact.name} ({arun.emergencyContact.relation})
            </span>
          </div>
        </div>
      </div>

      {/* Fitness & Body Stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Health & Conditioning
          </h3>
          <HeartPulse className="w-4 h-4 text-rose-500" />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-1 text-xs">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400">Weight</span>
            <p className="font-bold text-slate-900">
              {arun.healthMetrics.weightKg} kg
            </p>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400">Height</span>
            <p className="font-bold text-slate-900">
              {arun.healthMetrics.heightCm} cm
            </p>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] text-slate-400">BMI</span>
            <p className="font-bold text-emerald-700">
              {arun.healthMetrics.bmi}
            </p>
          </div>
        </div>
      </div>

      {/* App Preferences & Settings */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          App Settings
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700">
              <Bell className="w-4 h-4 text-slate-400" />
              <span>Push Notifications</span>
            </div>
            <input
              type="checkbox"
              checked={pushNotifs}
              onChange={() => setPushNotifs(!pushNotifs)}
              className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-700">
              <Fingerprint className="w-4 h-4 text-slate-400" />
              <span>Biometric Passcode</span>
            </div>
            <input
              type="checkbox"
              checked={biometrics}
              onChange={() => setBiometrics(!biometrics)}
              className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 w-4 h-4 cursor-pointer"
            />
          </div>

          <button
            onClick={() => alert('Change password email sent.')}
            className="w-full flex items-center justify-between py-1 text-slate-700 hover:text-slate-900 text-left cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-slate-400" />
              <span>Change Security PIN</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Logout Action */}
      <button
        onClick={handleLogout}
        className="w-full py-3 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Log Out of GymOS Member App</span>
      </button>
    </div>
  );
};
