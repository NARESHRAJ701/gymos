import React from 'react';

export type BadgeVariant =
  | 'active'
  | 'expiring'
  | 'expired'
  | 'suspended'
  | 'completed'
  | 'pending'
  | 'failed'
  | 'refunded'
  | 'present'
  | 'checked_out'
  | 'gold'
  | 'premium'
  | 'standard'
  | 'basic'
  | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-xs font-medium';

  const variantClasses: Record<BadgeVariant, string> = {
    active: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    present: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    completed: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60',
    expiring: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    pending: 'bg-amber-50 text-amber-700 border border-amber-200/60',
    expired: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    failed: 'bg-rose-50 text-rose-700 border border-rose-200/60',
    suspended: 'bg-slate-100 text-slate-700 border border-slate-200',
    checked_out: 'bg-slate-100 text-slate-700 border border-slate-200',
    refunded: 'bg-slate-100 text-slate-600 border border-slate-200',
    gold: 'bg-amber-50 text-amber-800 border border-amber-200',
    premium: 'bg-purple-50 text-purple-700 border border-purple-200',
    standard: 'bg-blue-50 text-blue-700 border border-blue-200',
    basic: 'bg-slate-100 text-slate-700 border border-slate-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md ${sizeClasses} ${variantClasses[variant]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
};
