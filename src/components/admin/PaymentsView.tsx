import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { RecordPaymentModal } from '../modals/RecordPaymentModal';
import { ReceiptModal } from '../modals/ReceiptModal';
import { PaymentRecord, PaymentMethod, PaymentStatus } from '../../types/gym';
import {
  CreditCard,
  Plus,
  Download,
  Search,
  Filter,
  ArrowUpRight,
  FileText,
  IndianRupee,
  Receipt,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';

export const PaymentsView: React.FC = () => {
  const { payments } = useGym();

  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  const filtered = payments.filter((p) => {
    const matchSearch =
      p.memberName.toLowerCase().includes(search.toLowerCase()) ||
      p.memberId.toLowerCase().includes(search.toLowerCase()) ||
      p.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      p.invoiceNumber.toLowerCase().includes(search.toLowerCase());

    const matchMethod = methodFilter === 'all' || p.paymentMethod === methodFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;

    return matchSearch && matchMethod && matchStatus;
  });

  const handleExportCSV = () => {
    const header = 'TransactionID,InvoiceNumber,MemberID,MemberName,Tier,Amount,Method,Date,Time,Status\n';
    const rows = filtered
      .map(
        (p) =>
          `${p.transactionId},${p.invoiceNumber},${p.memberId},"${p.memberName}",${p.membershipTier},${p.amount},${p.paymentMethod},${p.date},${p.time},${p.status}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GymOS_Payments_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Payments & Invoices
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time point-of-sale collections, automated recurring mandates, and GST reconciliation
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExportCSV}
          >
            Export Ledger
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsRecordModalOpen(true)}
          >
            Record Payment
          </Button>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today&apos;s Revenue
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            ₹48,500
          </div>
          <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +18.2% vs yesterday
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Monthly Revenue
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            ₹12.8L
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Target: ₹14.0L (91.4% achieved)
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Pending Payments
            </span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-900 mt-2">
            ₹1.42L
          </div>
          <div className="text-xs text-amber-700 font-medium mt-1">
            24 invoices awaiting settlement
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Transactions
            </span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            1,248
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Success Rate: 99.4%
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transaction ID, invoice, member..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Payment Methods</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Online">Online Gateway</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-700"
          >
            <option value="all">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
            <option value="Refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Membership Tier</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                    {p.transactionId}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-500">
                    {p.invoiceNumber}
                  </td>

                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-900">{p.memberName}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{p.memberId}</p>
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {p.membershipTier} Tier
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    ₹{p.amount.toLocaleString()}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="uppercase text-[10px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {p.paymentMethod}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <div>{p.date}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{p.time}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={p.status.toLowerCase() as any} size="sm">
                      {p.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(p)}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Tax Invoice
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <RecordPaymentModal
        isOpen={isRecordModalOpen}
        onClose={() => setIsRecordModalOpen(false)}
      />

      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        payment={selectedReceipt}
      />
    </div>
  );
};
