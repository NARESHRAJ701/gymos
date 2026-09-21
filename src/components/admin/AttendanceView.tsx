import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { BRANCHES } from '../../data/mockData';
import {
  CalendarCheck,
  QrCode,
  Plus,
  Search,
  Calendar,
  Filter,
  CheckCircle2,
  Clock,
  Download,
  AlertTriangle
} from 'lucide-react';

export const AttendanceView: React.FC = () => {
  const {
    attendance,
    members,
    selectedBranch,
    markAttendance,
    checkOutMember,
    setAdminScreen
  } = useGym();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2026-09-21');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [manualMemberId, setManualMemberId] = useState(members[0]?.memberId || '');

  const filtered = attendance.filter((r) => {
    const matchSearch =
      r.memberName.toLowerCase().includes(search.toLowerCase()) ||
      r.memberId.toLowerCase().includes(search.toLowerCase());
    const matchMethod = methodFilter === 'all' || r.method === methodFilter;
    const matchStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchSearch && matchMethod && matchStatus;
  });

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    const mem = members.find((m) => m.memberId === manualMemberId);
    if (!mem) return;

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    markAttendance({
      memberId: mem.memberId,
      memberName: mem.name,
      memberPhoto: mem.photoUrl,
      membershipTier: mem.membershipTier,
      checkInTime: timeStr,
      checkOutTime: null,
      date: selectedDate,
      method: 'manual',
      branch: selectedBranch,
      status: 'present'
    });

    setIsManualModalOpen(false);
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Attendance
            </h1>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Today&apos;s Check-ins: 684
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Turnstile logs, receptionist registrations, and active gym floor headcount
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsManualModalOpen(true)}
          >
            Mark Attendance
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<QrCode className="w-4 h-4" />}
            onClick={() => setAdminScreen('qr-scanner')}
          >
            Scan QR Code
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search member name or ID..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Date Selector */}
          <div className="flex items-center gap-2 px-3 py-1.5 border border-slate-300 rounded-lg bg-white text-xs text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="focus:outline-none bg-transparent"
            />
          </div>

          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Methods</option>
            <option value="qr">QR Code Scanner</option>
            <option value="reception">Reception Counter</option>
            <option value="manual">Manual Entry</option>
            <option value="biometric">Biometric Fingerprint</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="present">Active On Floor</option>
            <option value="checked_out">Checked Out</option>
          </select>
        </div>
      </div>

      {/* Attendance Big Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Check-in Time</th>
                <th className="py-3 px-4">Check-out Time</th>
                <th className="py-3 px-4">Verification Method</th>
                <th className="py-3 px-4">Branch</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Floor Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={record.memberPhoto}
                          alt={record.memberName}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">
                            {record.memberName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {record.membershipTier} Tier
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 font-mono font-medium text-slate-700">
                      {record.memberId}
                    </td>

                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {record.checkInTime}
                    </td>

                    <td className="py-3 px-4 text-slate-500">
                      {record.checkOutTime || (
                        <span className="text-emerald-600 font-medium">
                          Active on floor
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <span className="uppercase text-[10px] font-semibold tracking-wide bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                        {record.method}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-600">{record.branch}</td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          record.status === 'present' ? 'present' : 'checked_out'
                        }
                        size="sm"
                      >
                        {record.status === 'present' ? 'Present' : 'Checked Out'}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-right">
                      {record.status === 'present' ? (
                        <button
                          onClick={() => checkOutMember(record.memberId)}
                          className="text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
                        >
                          Check Out
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400">Archived</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-600 text-sm">
                      No attendance records for this filter
                    </p>
                    <p className="text-xs mt-1">
                      Try selecting another date or clear your search term.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manual Check-in Modal */}
      {isManualModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Manual Attendance Check-in
            </h3>
            <p className="text-xs text-slate-500">
              Select an enrolled member to manually record check-in at reception
            </p>

            <form onSubmit={handleManualCheckIn} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Member
                </label>
                <select
                  value={manualMemberId}
                  onChange={(e) => setManualMemberId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white"
                >
                  {members.map((m) => (
                    <option key={m.id} value={m.memberId}>
                      {m.name} ({m.memberId}) - {m.membershipTier} Tier
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Record Check-in
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
