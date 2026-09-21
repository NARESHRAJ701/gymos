import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MembershipTier } from '../../types/gym';
import { BRANCHES } from '../../data/mockData';
import { User, Phone, Mail, Calendar, Shield, Dumbbell } from 'lucide-react';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const { addMember, selectedBranch, trainers } = useGym();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '1995-06-15',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    tier: 'Gold' as MembershipTier,
    branch: selectedBranch,
    trainer: trainers[0]?.name || 'Vikram Singh',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelation: 'Spouse',
    notes: '',
    weightKg: 72,
    heightCm: 175,
    goal: 'Hypertrophy & Conditioning'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addMember({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@member.gymos`,
      dob: formData.dob,
      gender: formData.gender,
      emergencyContact: {
        name: formData.emergencyName || 'Family Contact',
        phone: formData.emergencyPhone || formData.phone,
        relation: formData.emergencyRelation
      },
      photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      membershipTier: formData.tier,
      membershipStatus: 'active',
      startDate: '21 Sep 2026',
      expiryDate: '21 Oct 2026',
      remainingDays: 30,
      branch: formData.branch,
      assignedTrainer: formData.trainer,
      notes: formData.notes,
      healthMetrics: {
        weightKg: Number(formData.weightKg),
        heightCm: Number(formData.heightCm),
        bmi: 23.5,
        goal: formData.goal
      }
    });

    onClose();
    // reset
    setFormData({
      name: '',
      phone: '',
      email: '',
      dob: '1995-06-15',
      gender: 'Male',
      tier: 'Gold',
      branch: selectedBranch,
      trainer: trainers[0]?.name || 'Vikram Singh',
      emergencyName: '',
      emergencyPhone: '',
      emergencyRelation: 'Spouse',
      notes: '',
      weightKg: 72,
      heightCm: 175,
      goal: 'Hypertrophy & Conditioning'
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Enroll New Member"
      subtitle="Register a new gym member and issue an instant membership badge"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="e.g. Ramesh Varma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                placeholder="+91 98400 12345"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="member@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date of Birth
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Membership Tier
            </label>
            <div className="relative">
              <Shield className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={formData.tier}
                onChange={(e) =>
                  setFormData({ ...formData, tier: e.target.value as MembershipTier })
                }
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                <option value="Basic">Basic (₹1,500/mo)</option>
                <option value="Standard">Standard (₹2,800/mo)</option>
                <option value="Gold">Gold (₹4,500/mo)</option>
                <option value="Premium">Premium (₹7,500/mo)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Assigned Trainer
            </label>
            <div className="relative">
              <Dumbbell className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={formData.trainer}
                onChange={(e) => setFormData({ ...formData, trainer: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
              >
                {trainers.map((t) => (
                  <option key={t.id} value={t.name}>
                    {t.name} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-slate-100 pt-3">
          <h4 className="text-xs font-semibold text-slate-800 mb-2">
            Emergency Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Contact Person Name"
              value={formData.emergencyName}
              onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <input
              type="tel"
              placeholder="Emergency Phone"
              value={formData.emergencyPhone}
              onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <select
              value={formData.emergencyRelation}
              onChange={(e) => setFormData({ ...formData, emergencyRelation: e.target.value })}
              className="px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white"
            >
              <option value="Spouse">Spouse</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Friend">Friend</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Staff & Medical Notes
          </label>
          <textarea
            rows={2}
            placeholder="Special physical considerations, goals, or notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Complete Enrollment
          </Button>
        </div>
      </form>
    </Modal>
  );
};
