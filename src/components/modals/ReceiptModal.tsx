import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PaymentRecord } from '../../types/gym';
import { Printer, Download, CheckCircle2, Shield } from 'lucide-react';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: PaymentRecord | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  payment
}) => {
  if (!payment) return null;

  const basePrice = payment.amount / 1.18;
  const gstAmount = payment.amount - basePrice;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Tax Invoice & Receipt"
      subtitle={`Invoice #${payment.invoiceNumber}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Printable Paper Card */}
        <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm space-y-4 text-xs font-mono">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-emerald-700 text-white flex items-center justify-center font-bold text-[10px]">
                  GO
                </div>
                <span className="font-bold text-sm tracking-tight text-slate-900 font-sans">
                  GymOS Fitness Systems Ltd.
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-sans">
                Chennai Central Branch &bull; GSTIN: 33AAACG0182K1Z8
              </p>
              <p className="text-[11px] text-slate-500 font-sans">
                Anna Salai, Mount Road, Chennai, TN 600002
              </p>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-sans">
                <CheckCircle2 className="w-3 h-3" />
                Paid
              </span>
              <p className="text-slate-500 text-[10px] mt-1 font-mono">
                {payment.date} {payment.time}
              </p>
            </div>
          </div>

          {/* Bill To Info */}
          <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-100 font-sans">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                Billed To
              </span>
              <p className="font-semibold text-slate-900 mt-0.5">{payment.memberName}</p>
              <p className="text-slate-500 text-xs">Member ID: {payment.memberId}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider">
                Transaction Details
              </span>
              <p className="font-mono text-slate-800 text-xs mt-0.5">{payment.transactionId}</p>
              <p className="text-slate-500 text-xs">Method: {payment.paymentMethod}</p>
            </div>
          </div>

          {/* Line Items Table */}
          <table className="w-full font-sans text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-left">
                <th className="py-2">Description</th>
                <th className="py-2 text-center">Period</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5">
                  <div className="font-medium text-slate-900">
                    {payment.membershipTier} Tier Subscription
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Floor Access + Locker + Coaching Allocation
                  </div>
                </td>
                <td className="py-2.5 text-center">30 Days</td>
                <td className="py-2.5 text-right font-mono">
                  ₹{basePrice.toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-1 text-slate-500 text-[11px]" colSpan={2}>
                  CGST (9%)
                </td>
                <td className="py-1 text-right font-mono text-slate-600">
                  ₹{(gstAmount / 2).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td className="py-1 text-slate-500 text-[11px]" colSpan={2}>
                  SGST (9%)
                </td>
                <td className="py-1 text-right font-mono text-slate-600">
                  ₹{(gstAmount / 2).toFixed(2)}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-300 font-bold text-slate-900">
                <td className="pt-2 text-sm" colSpan={2}>
                  Total Paid
                </td>
                <td className="pt-2 text-right text-sm font-mono text-emerald-700">
                  ₹{payment.amount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>

          {/* Footer note */}
          <div className="pt-2 text-[10px] text-slate-400 text-center font-sans border-t border-slate-100">
            This is a computer-generated tax invoice. Authorized by GymOS Cloud Systems.
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={() => alert(`Downloading PDF Invoice #${payment.invoiceNumber}...`)}
          >
            Download PDF
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              icon={<Printer className="w-4 h-4" />}
              onClick={() => window.print()}
            >
              Print Receipt
            </Button>
            <Button variant="primary" size="md" onClick={onClose}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
