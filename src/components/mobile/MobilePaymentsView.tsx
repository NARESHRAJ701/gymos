import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ReceiptModal } from '../modals/ReceiptModal';
import { PaymentRecord } from '../../types/gym';
import {
  CreditCard,
  CheckCircle2,
  Download,
  IndianRupee,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export const MobilePaymentsView: React.FC = () => {
  const { payments, members } = useGym();
  const arun = members[0];

  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  // Filter payments for Arun
  const memberPayments = payments.filter((p) => p.memberId === arun.memberId);
  const latestPayment = memberPayments[0] || {
    amount: 1500,
    membershipTier: 'Gold',
    date: '02 Oct 2026',
    status: 'Completed',
    invoiceNumber: 'INV-2026-8941'
  };

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Billing & Payments
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Receipts, transaction logs, and digital invoices
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Total Lifetime Paid
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1">
            ₹{arun.totalSpent.toLocaleString()}
          </p>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">
            Zero pending dues
          </span>
        </div>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Next Renewal Due
          </span>
          <p className="text-xl font-bold text-slate-900 mt-1 font-mono">
            24 Oct
          </p>
          <span className="text-[10px] text-amber-600 font-semibold mt-0.5 block">
            {arun.remainingDays} days left
          </span>
        </div>
      </div>

      {/* Latest Payment Highlight Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Latest Payment
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            {latestPayment.status}
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              ₹{latestPayment.amount.toLocaleString()}
            </h3>
            <p className="text-xs text-slate-500">
              {latestPayment.membershipTier} Membership &bull; {latestPayment.date}
            </p>
          </div>
          <button
            onClick={() => setSelectedReceipt(memberPayments[0])}
            className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            Receipt
          </button>
        </div>
      </div>

      {/* Payment History List */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
          Transaction History
        </h4>
        <div className="space-y-2.5">
          {memberPayments.map((p) => (
            <div
              key={p.id}
              className="p-3.5 bg-white rounded-xl border border-slate-200 shadow-subtle flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <p className="font-bold text-slate-900">
                  {p.membershipTier} Tier Subscription
                </p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {p.date} &bull; {p.paymentMethod}
                </p>
                <p className="text-[10px] text-slate-400 font-mono">
                  {p.invoiceNumber}
                </p>
              </div>

              <div className="text-right space-y-1">
                <span className="font-bold text-slate-900 text-sm block">
                  ₹{p.amount.toLocaleString()}
                </span>
                <button
                  onClick={() => setSelectedReceipt(p)}
                  className="text-[11px] text-emerald-700 font-semibold hover:underline flex items-center gap-1 justify-end cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Printable Receipt Modal */}
      <ReceiptModal
        isOpen={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        payment={selectedReceipt}
      />
    </div>
  );
};
