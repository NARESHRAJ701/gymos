import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { BRANCHES } from '../../data/mockData';
import {
  BarChart3,
  Download,
  FileSpreadsheet,
  FileText,
  Calendar,
  Filter,
  CheckCircle2,
  TrendingUp,
  Users,
  CreditCard,
  Printer
} from 'lucide-react';

export const ReportsView: React.FC = () => {
  const { selectedBranch, trainers } = useGym();

  const [category, setCategory] = useState<
    | 'Attendance Report'
    | 'Revenue Report'
    | 'Membership Report'
    | 'Member Growth'
    | 'Payment Report'
    | 'Trainer Performance'
  >('Attendance Report');

  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [branch, setBranch] = useState(selectedBranch);
  const [tier, setTier] = useState('All Tiers');
  const [trainer, setTrainer] = useState('All Trainers');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string>('Today at 10:45 AM');

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setLastGeneratedAt('Just now');
    }, 500);
  };

  const handleExportCSV = () => {
    const csvContent = `GymOS Enterprise Report: ${category}\nBranch: ${branch}\nDate Range: ${dateRange}\nGenerated At: ${new Date().toISOString()}\n\nMetric,Value,Target,Variance\nTotal Metric,1420,1300,+9.2%\nGross Output,48500,45000,+7.7%\n`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GymOS_${category.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Enterprise Reporting Engine
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Aggregated operational analytics, statutory audit statements, and floor performance exports
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            icon={<FileSpreadsheet className="w-4 h-4" />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>

          <Button
            variant="outline"
            size="md"
            icon={<FileText className="w-4 h-4" />}
            onClick={() => window.print()}
          >
            Export PDF
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<BarChart3 className="w-4 h-4" />}
            isLoading={isGenerating}
            onClick={handleGenerate}
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filter Matrix Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Report Parameters & Scope
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Report Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
            >
              <option value="Attendance Report">Attendance Report</option>
              <option value="Revenue Report">Revenue Report</option>
              <option value="Membership Report">Membership Report</option>
              <option value="Member Growth">Member Growth</option>
              <option value="Payment Report">Payment Report</option>
              <option value="Trainer Performance">Trainer Performance</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
            >
              <option value="Today">Today (21 Sep 2026)</option>
              <option value="Last 7 Days">Last 7 Days</option>
              <option value="Last 30 Days">Last 30 Days</option>
              <option value="This Quarter">This Quarter (Q3 2026)</option>
              <option value="Year to Date">Year to Date (FY 2026-27)</option>
            </select>
          </div>

          {/* Branch */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Gym Branch
            </label>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
            >
              <option value="All Branches">All Regional Branches</option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Membership Tier */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Membership Tier
            </label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
            >
              <option value="All Tiers">All Tiers</option>
              <option value="Basic">Basic Plan</option>
              <option value="Standard">Standard Plan</option>
              <option value="Gold">Gold Plan</option>
              <option value="Premium">Premium Plan</option>
            </select>
          </div>

          {/* Trainer */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Trainer Roster
            </label>
            <select
              value={trainer}
              onChange={(e) => setTrainer(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
            >
              <option value="All Trainers">All Trainers</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Generated Report Preview Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-6">
        {/* Report Preview Meta Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              <h2 className="text-base font-bold text-slate-900">{category}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Scope: {branch} &bull; Period: {dateRange} &bull; Generated: {lastGeneratedAt}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">
              Audit ID: RPT-2026-0921-82
            </span>
          </div>
        </div>

        {/* Aggregated Statistical Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Cumulative Volume
            </span>
            <p className="text-xl font-bold text-slate-900 mt-1">14,820</p>
            <span className="text-[11px] text-emerald-700 font-semibold">
              +14.2% vs prev. period
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Average Daily Run
            </span>
            <p className="text-xl font-bold text-slate-900 mt-1">494 / day</p>
            <span className="text-[11px] text-slate-500">Peak hour 18:30</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Compliance Rate
            </span>
            <p className="text-xl font-bold text-emerald-700 mt-1">98.6%</p>
            <span className="text-[11px] text-slate-500">QR Turnstile verified</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Total Variance
            </span>
            <p className="text-xl font-bold text-slate-900 mt-1">+8.4%</p>
            <span className="text-[11px] text-emerald-700 font-semibold">
              Exceeded budget plan
            </span>
          </div>
        </div>

        {/* Tabular Statement */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                <th className="py-2.5 px-3">Timeline Interval</th>
                <th className="py-2.5 px-3">Primary Metric</th>
                <th className="py-2.5 px-3">Check-ins</th>
                <th className="py-2.5 px-3">Turnover (₹)</th>
                <th className="py-2.5 px-3">Active Roster</th>
                <th className="py-2.5 px-3 text-right">Variance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { period: 'Week 1 (01 - 07 Sep)', vol: '3,410', in: '3,200', rev: '₹3,15,000', roster: '2,410', var: '+6.2%' },
                { period: 'Week 2 (08 - 14 Sep)', vol: '3,680', in: '3,490', rev: '₹3,40,000', roster: '2,442', var: '+8.1%' },
                { period: 'Week 3 (15 - 21 Sep)', vol: '3,840', in: '3,690', rev: '₹3,85,000', roster: '2,486', var: '+10.4%' },
                { period: 'Current Shift Projection', vol: '3,890', in: '3,750', rev: '₹2,40,000', roster: '2,510', var: '+12.1%' }
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    {row.period}
                  </td>
                  <td className="py-3 px-3 font-mono">{row.vol}</td>
                  <td className="py-3 px-3 font-mono text-slate-700">{row.in}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">{row.rev}</td>
                  <td className="py-3 px-3 text-slate-600">{row.roster}</td>
                  <td className="py-3 px-3 text-right font-semibold text-emerald-700">
                    {row.var}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
