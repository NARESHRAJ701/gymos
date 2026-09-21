import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Member, MembershipTier, MembershipStatus } from '../../types/gym';

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

export const EditMemberModal: React.FC<EditMemberModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  const { updateMember, trainers } = useGym();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    membershipTier: 'Gold' as MembershipTier,
    membershipStatus: 'active' as MembershipStatus,
    assignedTrainer: '',
    notes: ''
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        phone: member.phone,
        email: member.email,
        membershipTier: member.membershipTier,
        membershipStatus: member.membershipStatus,
        assignedTrainer: member.assignedTrainer,
        notes: member.notes
      });
    }
  }, [member]);

  if (!member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMember(member.id, formData);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Edit Member: ${member.name}`}
      subtitle={`Member ID: ${member.memberId}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Membership Tier
            </label>
            <select
              value={formData.membershipTier}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  membershipTier: e.target.value as MembershipTier
                })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="Basic">Basic</option>
              <option value="Standard">Standard</option>
              <option value="Gold">Gold</option>
              <option value="Premium">Premium</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Membership Status
            </label>
            <select
              value={formData.membershipStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  membershipStatus: e.target.value as MembershipStatus
                })
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="active">Active</option>
              <option value="expiring">Expiring Soon</option>
              <option value="suspended">Suspended</option>
              <option value="expired">Expired</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Assigned Trainer
          </label>
          <select
            value={formData.assignedTrainer}
            onChange={(e) =>
              setFormData({ ...formData, assignedTrainer: e.target.value })
            }
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
          >
            {trainers.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Notes
          </label>
          <textarea
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};
