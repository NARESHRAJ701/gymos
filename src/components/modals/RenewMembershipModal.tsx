import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Member } from '../../types/gym';
import { CheckCircle2, Shield, Calendar } from 'lucide-react';

interface RenewMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export const RenewMembershipModal: React.FC<RenewMembershipModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  const { renewMember, recordPayment } = useGym();
  const [durationMonths, setDurationMonths] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash'>('UPI');

  if (!member) return null;

  const priceMap = {
    Basic: 1500,
    Standard: 2800,
    Gold: 4500,
    Premium: 7500
  };

  const totalAmount = priceMap[member.membershipTier] * durationMonths;

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    renewMember(member.id, durationMonths);
    recordPayment({
      memberId: member.memberId,
      memberName: member.name,
      membershipTier: member.membershipTier,
      amount: totalAmount,
      paymentMethod,
      status: 'Completed',
      notes: `Direct renewal for ${durationMonths} month(s).`
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Renew Membership"
      subtitle={`Extend membership validity for ${member.name}`}
      maxWidth="md"
    >
      <form onSubmit={handleRenew} className="space-y-4">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-12 h-12 rounded-full object-cover border border-slate-300"
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-900">{member.name}</h4>
            <p className="text-xs text-slate-500">
              {member.memberId} &bull; {member.membershipTier} Tier
            </p>
            <p className="text-[11px] text-amber-600 font-medium mt-0.5">
              Current Expiry: {member.expiryDate} ({member.remainingDays} days remaining)
            </p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Renewal Duration
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 12].map((months) => (
              <button
                key={months}
                type="button"
                onClick={() => setDurationMonths(months)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  durationMonths === months
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold ring-1 ring-emerald-600'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {months === 1 ? '1 Month' : months === 3 ? '3 Months' : '1 Year'}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Payment Mode
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['UPI', 'Card', 'Cash'] as const).map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => setPaymentMethod(method)}
                className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-all ${
                  paymentMethod === method
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-lg p-3 text-xs flex items-center justify-between">
          <span className="text-slate-600">Total Renewal Fee:</span>
          <span className="text-base font-bold text-emerald-700">
            ₹{totalAmount.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Confirm Renewal & Settle
          </Button>
        </div>
      </form>
    </Modal>
  );
};
