import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { CreatePlanModal } from '../modals/CreatePlanModal';
import { MembershipPlan } from '../../types/gym';
import {
  Layers,
  Plus,
  CheckCircle2,
  Users,
  IndianRupee,
  MoreVertical,
  Copy,
  PowerOff,
  Edit2,
  Shield
} from 'lucide-react';

export const MembershipsView: React.FC = () => {
  const { plans, togglePlanStatus, addPlan } = useGym();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleDuplicate = (plan: MembershipPlan) => {
    addPlan({
      name: plan.name,
      price: plan.price,
      billingPeriod: plan.billingPeriod,
      durationDays: plan.durationDays,
      description: `Copy of ${plan.description}`,
      features: [...plan.features],
      status: 'draft'
    });
  };

  const totalMembersAcrossPlans = plans.reduce((acc, p) => acc + p.activeMembers, 0);
  const totalMonthlyRevenue = plans.reduce((acc, p) => acc + p.monthlyRevenue, 0);

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Membership Plans
            </h1>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200">
              {plans.length} Active Tiers
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure subscription packages, duration, pricing models, and floor privileges
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Create New Plan
        </Button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Total Enrolled Members
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {totalMembersAcrossPlans.toLocaleString()}
          </p>
          <span className="text-xs text-emerald-600 font-medium mt-1 block">
            Across 4 standardized tiers
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Monthly Run-rate Revenue
          </span>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ₹{(totalMonthlyRevenue / 100000).toFixed(2)} Lakhs
          </p>
          <span className="text-xs text-slate-500 mt-1 block">
            Average revenue per user: ₹4,070
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Top Performing Tier
          </span>
          <p className="text-2xl font-bold text-emerald-700 mt-1">Gold Tier</p>
          <span className="text-xs text-slate-500 mt-1 block">
            814 active members (33% of base)
          </span>
        </div>
      </div>

      {/* 4 Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isGold = plan.name === 'Gold';

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-subtle relative transition-all ${
                isGold
                  ? 'border-emerald-600 ring-1 ring-emerald-600 shadow-card'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {isGold && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Header */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">
                    {plan.name} Tier
                  </h3>
                  <Badge
                    variant={plan.status === 'active' ? 'active' : 'suspended'}
                    size="sm"
                  >
                    {plan.status.toUpperCase()}
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 mt-1 line-clamp-2 min-h-[32px]">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="mt-4 pb-4 border-b border-slate-100 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-slate-900">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    /{plan.billingPeriod.toLowerCase()}
                  </span>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-2 my-4 py-2.5 px-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Members
                    </span>
                    <span className="font-bold text-slate-900">
                      {plan.activeMembers}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                      Revenue
                    </span>
                    <span className="font-bold text-emerald-700">
                      ₹{(plan.monthlyRevenue / 100000).toFixed(1)}L
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mt-4">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider block">
                    Tier Inclusions:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleDuplicate(plan)}
                  className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                  title="Duplicate Plan"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => togglePlanStatus(plan.id)}
                  className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                    plan.status === 'active'
                      ? 'text-slate-600 hover:text-rose-600 border-slate-200 hover:border-rose-200'
                      : 'text-emerald-700 hover:text-emerald-800 border-emerald-200 bg-emerald-50'
                  }`}
                >
                  {plan.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    alert(`Plan editor opened for ${plan.name} Tier configuration.`)
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Plan Modal */}
      <CreatePlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};
