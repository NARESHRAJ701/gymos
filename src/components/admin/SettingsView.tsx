import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { BRANCHES } from '../../data/mockData';
import {
  Building2,
  MapPin,
  Users,
  ShieldCheck,
  Layers,
  CalendarCheck,
  CreditCard,
  Bell,
  Lock,
  FileCode2,
  Save,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { auditLogs, setAdminScreen } = useGym();

  const [activeSection, setActiveSection] = useState<
    | 'profile'
    | 'branches'
    | 'staff'
    | 'membership'
    | 'attendance'
    | 'payment'
    | 'security'
    | 'audit'
  >('profile');

  // Form states
  const [gymName, setGymName] = useState('GymOS Fitness Systems Private Limited');
  const [taxId, setTaxId] = useState('33AAACG0182K1Z8');
  const [contactEmail, setContactEmail] = useState('support@gymos.internal');
  const [contactPhone, setContactPhone] = useState('+91 44 4892 0192');
  const [operatingHours, setOperatingHours] = useState('06:00 AM - 10:30 PM');

  // Attendance settings
  const [cooldownMinutes, setCooldownMinutes] = useState(15);
  const [autoCheckOutHours, setAutoCheckOutHours] = useState(3);

  // Payment settings
  const [taxRate, setTaxRate] = useState(18);
  const [currencySymbol, setCurrencySymbol] = useState('₹ (INR)');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System & Organization Settings
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global operational parameters, legal tax entities, hardware rules & immutable audit logs
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Configuration Saved Successfully
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Settings Navigation (3 cols) */}
        <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-2 shadow-subtle space-y-1">
          {[
            { id: 'profile', label: 'Gym Profile', icon: Building2 },
            { id: 'branches', label: 'Branches & Facilities', icon: MapPin },
            { id: 'membership', label: 'Membership Policies', icon: Layers },
            { id: 'attendance', label: 'Attendance & Hardware', icon: CalendarCheck },
            { id: 'payment', label: 'Billing & Taxes (GST)', icon: CreditCard },
            { id: 'security', label: 'Security & 2FA', icon: Lock },
            { id: 'audit', label: 'Immutable Audit Logs', icon: FileCode2 }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white font-semibold shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setAdminScreen('roles')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-emerald-700 hover:bg-emerald-50 text-left transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>Roles & Permissions Matrix &rarr;</span>
            </button>
          </div>
        </div>

        {/* Settings Content Body (9 cols) */}
        <div className="md:col-span-9 bg-white rounded-xl border border-slate-200 p-6 shadow-subtle">
          {activeSection === 'profile' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Gym Organization Profile
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Registered Legal Entity Name
                </label>
                <input
                  type="text"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GSTIN / Business Tax Identification
                  </label>
                  <input
                    type="text"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Facility Operating Hours
                  </label>
                  <input
                    type="text"
                    value={operatingHours}
                    onChange={(e) => setOperatingHours(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Central Support Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone Line
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Profile Settings
                </Button>
              </div>
            </form>
          )}

          {activeSection === 'branches' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Branch Locations & Access Gateways ({BRANCHES.length})
                </h3>
                <Button variant="outline" size="sm">
                  Add New Branch
                </Button>
              </div>

              <div className="space-y-3">
                {BRANCHES.map((b, idx) => (
                  <div
                    key={b}
                    className="p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{b}</h4>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Turnstiles: 2 &bull; Cameras: 8 &bull; Biometric Readers: 4
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active Node
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'attendance' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Attendance & Hardware Scanning Policies
              </h3>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Double-Scan Prevention Cooldown Window (Minutes)
                </label>
                <input
                  type="number"
                  value={cooldownMinutes}
                  onChange={(e) => setCooldownMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Prevents multiple check-in attempts within this window to guard against turnstile fraud.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Automatic Check-Out Timeout (Hours)
                </label>
                <input
                  type="number"
                  value={autoCheckOutHours}
                  onChange={(e) => setAutoCheckOutHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  If member does not scan out at turnstile, automatically marks checkout after this period.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Attendance Rules
                </Button>
              </div>
            </form>
          )}

          {activeSection === 'payment' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Billing & Goods and Services Tax (GST)
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    GST Tax Slab Rate (%)
                  </label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Standard gym memberships in India attract 18% GST (9% CGST + 9% SGST).
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Currency Formatting
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currencySymbol}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <Button variant="primary" size="md" type="submit" icon={<Save className="w-4 h-4" />}>
                  Save Billing Configurations
                </Button>
              </div>
            </form>
          )}

          {activeSection === 'security' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
                Enterprise Security & Access Controls
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Two-Factor Authentication (2FA) for Admins
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Mandatory TOTP authenticator app verification on login
                    </p>
                  </div>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    Enforced
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                  <div>
                    <p className="font-semibold text-slate-900">
                      Terminal Inactivity Auto-Lock
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Locks session after 15 minutes of inactivity
                    </p>
                  </div>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    15 Mins
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'audit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Immutable System Audit Trail
                  </h3>
                  <p className="text-xs text-slate-500">
                    SOC-2 and ISO 27001 compliant chronological record of administrative actions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Export Log
                </Button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {auditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-slate-800">{log.action}</span>
                      <span className="text-slate-400">{log.timestamp}</span>
                    </div>
                    <p className="text-slate-700">{log.details}</p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                      <span>Actor: {log.actor}</span>
                      <span>&bull;</span>
                      <span>Category: {log.category}</span>
                      <span>&bull;</span>
                      <span className="font-mono">IP: {log.ipAddress}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
