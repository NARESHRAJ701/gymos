import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { PaymentMethod, PaymentStatus, MembershipTier } from '../../types/gym';
import { CreditCard, IndianRupee, FileText } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMemberId?: string;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({
  isOpen,
  onClose,
  defaultMemberId
}) => {
  const { members, recordPayment } = useGym();

  const initialMember = members.find((m) => m.id === defaultMemberId) || members[0];

  const [memberId, setMemberId] = useState(initialMember?.memberId || 'MEM-002481');
  const [tier, setTier] = useState<MembershipTier>(initialMember?.membershipTier || 'Gold');
  const [amount, setAmount] = useState<number>(4500);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [status, setStatus] = useState<PaymentStatus>('Completed');
  const [notes, setNotes] = useState('Counter renewal transaction.');

  const selectedMemberObj = members.find((m) => m.memberId === memberId) || members[0];

  const handleMemberChange = (idStr: string) => {
    setMemberId(idStr);
    const m = members.find((x) => x.memberId === idStr);
    if (m) {
      setTier(m.membershipTier);
      const tierPrices: Record<MembershipTier, number> = {
        Basic: 1500,
        Standard: 2800,
        Gold: 4500,
        Premium: 7500
      };
      setAmount(tierPrices[m.membershipTier]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordPayment({
      memberId,
      memberName: selectedMemberObj.name,
      membershipTier: tier,
      amount: Number(amount),
      paymentMethod,
      status,
      notes
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment & Issue Invoice"
      subtitle="Register a membership fee, renewal, or spot transaction"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Select Member *
          </label>
          <select
            value={memberId}
            onChange={(e) => handleMemberChange(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
          >
            {members.map((m) => (
              <option key={m.id} value={m.memberId}>
                {m.name} ({m.memberId}) - {m.membershipTier} Tier
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Membership Plan
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as MembershipTier)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="Basic">Basic Plan</option>
              <option value="Standard">Standard Plan</option>
              <option value="Gold">Gold Plan</option>
              <option value="Premium">Premium Plan</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Amount (₹) *
            </label>
            <div className="relative">
              <span className="text-slate-400 text-xs absolute left-3 top-1/2 -translate-y-1/2 font-semibold">
                ₹
              </span>
              <input
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 font-semibold"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Method *
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="Cash">Cash at Counter</option>
              <option value="Bank Transfer">Bank Transfer (NEFT / IMPS)</option>
              <option value="Online">Online Gateway</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PaymentStatus)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* GST & Tax Summary Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs space-y-1">
          <div className="flex justify-between text-slate-600">
            <span>Base Subscription Fee:</span>
            <span>₹{(amount * 0.82).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>CGST (9%) + SGST (9%):</span>
            <span>₹{(amount * 0.18).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-slate-900 border-t border-slate-200 pt-1">
            <span>Total Payable:</span>
            <span>₹{amount.toLocaleString()}</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Reference / Transaction Notes
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. UPI Ref #40291039120"
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Confirm & Print Receipt
          </Button>
        </div>
      </form>
    </Modal>
  );
};
