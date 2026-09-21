import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { UserRole } from '../../types/gym';
import {
  ShieldCheck,
  Users,
  Check,
  Save,
  CheckCircle2,
  Info,
  Lock
} from 'lucide-react';

export const RolesPermissionsView: React.FC = () => {
  const { roles, updateRolePermission, adminRole, setAdminRole } = useGym();
  const [selectedRole, setSelectedRole] = useState<UserRole>('Branch Admin');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const activeRoleConfig = roles.find((r) => r.role === selectedRole) || roles[0];

  const handleToggle = (
    category: 'members' | 'attendance' | 'payments' | 'reports' | 'settings',
    action: string,
    currentVal: boolean
  ) => {
    updateRolePermission(selectedRole, category, action, !currentVal);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Roles & Granular Permissions
            </h1>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              RBAC v2.4 Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Define hierarchical access control across members, turnstiles, billing, and operational reports
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {saveSuccess && (
            <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Permissions Saved
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSave}
          >
            Save Permission Matrix
          </Button>
        </div>
      </div>

      {/* Role Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {roles.map((r) => {
          const isSelected = selectedRole === r.role;
          const isCurrentSessionRole = adminRole === r.role;

          return (
            <div
              key={r.role}
              onClick={() => setSelectedRole(r.role)}
              className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-900">{r.role}</span>
                {isCurrentSessionRole && (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {r.usersCount} Staff Assigned
              </p>
            </div>
          );
        })}
      </div>

      {/* Role Details & Description Box */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-900">
              Role Scope: {activeRoleConfig.role}
            </p>
            <p className="text-slate-600 mt-0.5">{activeRoleConfig.description}</p>
          </div>
        </div>

        <button
          onClick={() => setAdminRole(activeRoleConfig.role)}
          className="text-xs font-semibold text-emerald-700 hover:underline shrink-0 cursor-pointer"
        >
          Simulate this Role &rarr;
        </button>
      </div>

      {/* Granular Permission Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Permission Matrix for {selectedRole}
          </h3>
          <span className="text-xs text-slate-400">
            Toggles automatically persist to role definition
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">System Module</th>
                <th className="py-3 px-4 text-center">View</th>
                <th className="py-3 px-4 text-center">Create</th>
                <th className="py-3 px-4 text-center">Edit / Modify</th>
                <th className="py-3 px-4 text-center">Delete / Refund / Export</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Members */}
              <tr className="hover:bg-slate-50/70">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">Members Module</p>
                  <p className="text-[11px] text-slate-400">
                    Member directories, profile viewing, medical logs
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.members.view}
                    onChange={() =>
                      handleToggle(
                        'members',
                        'view',
                        activeRoleConfig.permissions.members.view
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.members.create}
                    onChange={() =>
                      handleToggle(
                        'members',
                        'create',
                        activeRoleConfig.permissions.members.create
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.members.edit}
                    onChange={() =>
                      handleToggle(
                        'members',
                        'edit',
                        activeRoleConfig.permissions.members.edit
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.members.delete}
                    onChange={() =>
                      handleToggle(
                        'members',
                        'delete',
                        activeRoleConfig.permissions.members.delete
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
              </tr>

              {/* Attendance */}
              <tr className="hover:bg-slate-50/70">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">Attendance & Turnstiles</p>
                  <p className="text-[11px] text-slate-400">
                    Check-in scanners, turnstile logs, override triggers
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.attendance.view}
                    onChange={() =>
                      handleToggle(
                        'attendance',
                        'view',
                        activeRoleConfig.permissions.attendance.view
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.attendance.create}
                    onChange={() =>
                      handleToggle(
                        'attendance',
                        'create',
                        activeRoleConfig.permissions.attendance.create
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.attendance.edit}
                    onChange={() =>
                      handleToggle(
                        'attendance',
                        'edit',
                        activeRoleConfig.permissions.attendance.edit
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center text-slate-300 font-mono">
                  -
                </td>
              </tr>

              {/* Payments */}
              <tr className="hover:bg-slate-50/70">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">Payments & Billing</p>
                  <p className="text-[11px] text-slate-400">
                    Recording fees, invoices, refunds, tax receipts
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.payments.view}
                    onChange={() =>
                      handleToggle(
                        'payments',
                        'view',
                        activeRoleConfig.permissions.payments.view
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.payments.create}
                    onChange={() =>
                      handleToggle(
                        'payments',
                        'create',
                        activeRoleConfig.permissions.payments.create
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center text-slate-300 font-mono">
                  -
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.payments.refund}
                    onChange={() =>
                      handleToggle(
                        'payments',
                        'refund',
                        activeRoleConfig.permissions.payments.refund
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
              </tr>

              {/* Reports */}
              <tr className="hover:bg-slate-50/70">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">Reports & Analytics</p>
                  <p className="text-[11px] text-slate-400">
                    Revenue statements, retention analysis, trainer metrics
                  </p>
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.reports.view}
                    onChange={() =>
                      handleToggle(
                        'reports',
                        'view',
                        activeRoleConfig.permissions.reports.view
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
                <td className="py-4 px-4 text-center text-slate-300 font-mono">
                  -
                </td>
                <td className="py-4 px-4 text-center text-slate-300 font-mono">
                  -
                </td>
                <td className="py-4 px-4 text-center">
                  <input
                    type="checkbox"
                    checked={activeRoleConfig.permissions.reports.export}
                    onChange={() =>
                      handleToggle(
                        'reports',
                        'export',
                        activeRoleConfig.permissions.reports.export
                      )
                    }
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
