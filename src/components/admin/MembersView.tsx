import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge, BadgeVariant } from '../common/Badge';
import { AddMemberModal } from '../modals/AddMemberModal';
import { EditMemberModal } from '../modals/EditMemberModal';
import { RenewMembershipModal } from '../modals/RenewMembershipModal';
import { Member, MembershipTier, MembershipStatus } from '../../types/gym';
import { BRANCHES } from '../../data/mockData';
import {
  UserPlus,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit2,
  PauseCircle,
  RotateCcw,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const MembersView: React.FC = () => {
  const {
    members,
    setSelectedMemberId,
    setAdminScreen,
    deleteMember,
    suspendMember
  } = useGym();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTier, setFilterTier] = useState<string>('all');
  const [filterBranch, setFilterBranch] = useState<string>('all');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [renewingMember, setRenewingMember] = useState<Member | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Filter logic
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' || m.membershipStatus === filterStatus;
    const matchesTier = filterTier === 'all' || m.membershipTier === filterTier;
    const matchesBranch = filterBranch === 'all' || m.branch === filterBranch;

    return matchesSearch && matchesStatus && matchesTier && matchesBranch;
  });

  const handleExportCSV = () => {
    const headers = 'MemberID,Name,Phone,Email,Tier,Status,ExpiryDate,Trainer\n';
    const rows = filteredMembers
      .map(
        (m) =>
          `${m.memberId},"${m.name}",${m.phone},${m.email},${m.membershipTier},${m.membershipStatus},${m.expiryDate},"${m.assignedTrainer}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GymOS_Members_Export_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Members
            </h1>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200">
              2,486 members
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directory of active, enrolled, and past gym members across branches
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            icon={<Upload className="w-4 h-4" />}
            onClick={() => alert('Member CSV Import dialog opened. Upload standard CSV schema.')}
          >
            Import
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExportCSV}
          >
            Export
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, phone, member ID..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="expiring">Expiring Soon</option>
            <option value="suspended">Suspended</option>
            <option value="expired">Expired</option>
          </select>

          {/* Membership Tier */}
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Tiers</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Gold">Gold</option>
            <option value="Premium">Premium</option>
          </select>

          {/* Branch */}
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Branches</option>
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {(searchQuery || filterStatus !== 'all' || filterTier !== 'all' || filterBranch !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterStatus('all');
                setFilterTier('all');
                setFilterBranch('all');
              }}
              className="text-xs text-rose-600 hover:underline px-2 py-1 font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Members Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Profile & Name</th>
                <th className="py-3 px-4">Member ID</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Membership</th>
                <th className="py-3 px-4">Start Date</th>
                <th className="py-3 px-4">Expiry Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMembers.length > 0 ? (
                filteredMembers.map((m) => {
                  return (
                    <tr
                      key={m.id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <div
                          className="flex items-center gap-3 cursor-pointer"
                          onClick={() => {
                            setSelectedMemberId(m.id);
                            setAdminScreen('member-profile');
                          }}
                        >
                          <img
                            src={m.photoUrl}
                            alt={m.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                              {m.name}
                            </p>
                            <p className="text-[11px] text-slate-400">{m.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                        {m.memberId}
                      </td>

                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {m.phone}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800">
                          {m.membershipTier} Tier
                        </span>
                        <p className="text-[10px] text-slate-400">
                          Trainer: {m.assignedTrainer}
                        </p>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {m.startDate}
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {m.expiryDate}
                        <span className="block text-[10px] text-slate-400">
                          ({m.remainingDays}d left)
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant={m.membershipStatus as BadgeVariant} size="sm">
                          {m.membershipStatus === 'active'
                            ? 'Active'
                            : m.membershipStatus === 'expiring'
                            ? 'Expiring Soon'
                            : m.membershipStatus === 'suspended'
                            ? 'Suspended'
                            : 'Expired'}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4 text-right relative">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedMemberId(m.id);
                              setAdminScreen('member-profile');
                            }}
                            className="p-1.5 rounded text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setEditingMember(m)}
                            className="p-1.5 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            title="Edit Member"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => setRenewingMember(m)}
                            className="p-1.5 rounded text-slate-500 hover:text-emerald-700 hover:bg-slate-100 transition-colors"
                            title="Renew Membership"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => suspendMember(m.id)}
                            className="p-1.5 rounded text-slate-500 hover:text-amber-700 hover:bg-slate-100 transition-colors"
                            title={
                              m.membershipStatus === 'suspended'
                                ? 'Unsuspend'
                                : 'Suspend Member'
                            }
                          >
                            <PauseCircle className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete ${m.name}?`)) {
                                deleteMember(m.id);
                              }
                            }}
                            className="p-1.5 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-slate-600 text-sm">
                      No members found
                    </p>
                    <p className="text-xs mt-1">
                      Try adjusting your search query or clear applied filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing <span className="font-semibold text-slate-900">1</span> to{' '}
            <span className="font-semibold text-slate-900">{filteredMembers.length}</span> of{' '}
            <span className="font-semibold text-slate-900">2,486</span> entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              disabled
              className="p-1.5 rounded border border-slate-200 bg-white text-slate-400 cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="px-2.5 py-1 rounded border border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold">
              1
            </button>
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              2
            </button>
            <button className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              3
            </button>
            <button className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditMemberModal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        member={editingMember}
      />

      <RenewMembershipModal
        isOpen={!!renewingMember}
        onClose={() => setRenewingMember(null)}
        member={renewingMember}
      />
    </div>
  );
};
