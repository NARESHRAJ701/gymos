import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { MembershipTier } from '../../types/gym';
import { Plus, Trash2 } from 'lucide-react';

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePlanModal: React.FC<CreatePlanModalProps> = ({
  isOpen,
  onClose
}) => {
  const { addPlan } = useGym();

  const [name, setName] = useState<MembershipTier>('Gold');
  const [price, setPrice] = useState<number>(4999);
  const [billingPeriod, setBillingPeriod] = useState<
    'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Annual'
  >('Monthly');
  const [durationDays, setDurationDays] = useState<number>(30);
  const [description, setDescription] = useState<string>(
    'Comprehensive access with trainer consultation and amenities.'
  );
  const [featureInput, setFeatureInput] = useState<string>('');
  const [features, setFeatures] = useState<string[]>([
    'Full Gym Floor Access',
    'Personal Locker Allocation',
    'Steam & Sauna Access'
  ]);

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()]);
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPlan({
      name,
      price: Number(price),
      billingPeriod,
      durationDays: Number(durationDays),
      description,
      features,
      status: 'active'
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Membership Plan"
      subtitle="Define a new tier with pricing, duration, and member perks"
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tier Category
            </label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value as MembershipTier)}
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
              Price (₹) *
            </label>
            <input
              type="number"
              required
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Billing Period
            </label>
            <select
              value={billingPeriod}
              onChange={(e) =>
                setBillingPeriod(
                  e.target.value as 'Monthly' | 'Quarterly' | 'Half-Yearly' | 'Annual'
                )
              }
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 bg-white"
            >
              <option value="Monthly">Monthly (30 Days)</option>
              <option value="Quarterly">Quarterly (90 Days)</option>
              <option value="Half-Yearly">Half-Yearly (180 Days)</option>
              <option value="Annual">Annual (365 Days)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Duration (Days)
            </label>
            <input
              type="number"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Features & Inclusions
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="e.g. Free Nutrition Assessment"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
              className="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
              onClick={handleAddFeature}
            >
              Add
            </Button>
          </div>

          <div className="space-y-1 max-h-32 overflow-y-auto">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800"
              >
                <span>{feat}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <Button variant="outline" size="md" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" type="submit">
            Save & Publish Plan
          </Button>
        </div>
      </form>
    </Modal>
  );
};
