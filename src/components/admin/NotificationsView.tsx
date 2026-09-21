import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { NotificationItem } from '../../types/gym';
import {
  Bell,
  Plus,
  Send,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Smartphone,
  Mail,
  Shield,
  Tag
} from 'lucide-react';

export const NotificationsView: React.FC = () => {
  const { notifications, addNotification, markNotificationAsRead } = useGym();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Composer Form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState(
    'Dear {member_name}, your Gold Membership expires in {days_left} days on {expiry_date}. Renew today to maintain uninterrupted floor access.'
  );
  const [category, setCategory] = useState<
    'membership_expiry' | 'payment' | 'attendance' | 'system' | 'promotions'
  >('membership_expiry');
  const [audience, setAudience] = useState('Expiring in 7 Days');
  const [selectedChannels, setSelectedChannels] = useState<
    ('SMS' | 'WhatsApp' | 'Push' | 'Email')[]
  >(['WhatsApp', 'Push']);

  const toggleChannel = (ch: 'SMS' | 'WhatsApp' | 'Push' | 'Email') => {
    if (selectedChannels.includes(ch)) {
      setSelectedChannels(selectedChannels.filter((c) => c !== ch));
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    addNotification({
      title,
      message,
      category,
      channels: selectedChannels,
      audience
    });

    setIsComposerOpen(false);
    setTitle('');
  };

  const filtered = notifications.filter(
    (n) => activeCategory === 'all' || n.category === activeCategory
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Notification & Outreach Center
            </h1>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              Omnichannel Gateway Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Automated member lifecycle reminders, WhatsApp renewal links, turnstile SMS alerts & announcements
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setIsComposerOpen(true)}
        >
          Create Notification
        </Button>
      </div>

      {/* Category Filter Tabs */}
      <div className="border-b border-slate-200 flex gap-6 text-xs font-semibold overflow-x-auto">
        {[
          { id: 'all', label: 'All Notifications' },
          { id: 'membership_expiry', label: 'Membership Expiry' },
          { id: 'payment', label: 'Payment' },
          { id: 'attendance', label: 'Attendance' },
          { id: 'system', label: 'System' },
          { id: 'promotions', label: 'Promotions' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`pb-3 transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === tab.id
                ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Cards List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => markNotificationAsRead(item.id)}
            className={`bg-white rounded-xl border p-5 shadow-subtle hover:border-slate-300 transition-all cursor-pointer flex items-start justify-between gap-4 ${
              !item.read ? 'border-l-4 border-l-emerald-600' : 'border-slate-200'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-sm text-slate-900">
                  {item.title}
                </span>

                <span className="uppercase text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {item.category.replace('_', ' ')}
                </span>

                {item.audience && (
                  <span className="text-[11px] text-slate-500 font-medium">
                    Audience: {item.audience}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
                {item.message}
              </p>

              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {item.timestamp}
                </span>

                <span>&bull;</span>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500">Channels:</span>
                  {item.channels.map((ch) => (
                    <span
                      key={ch}
                      className="px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200 text-[10px] font-semibold text-slate-700"
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                <span>&bull;</span>

                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {item.deliveryStatus}
                </span>
              </div>
            </div>

            {!item.read && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0 mt-1"></span>
            )}
          </div>
        ))}
      </div>

      {/* Composer Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-xl w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Compose & Broadcast Notification
              </h3>
              <p className="text-xs text-slate-500">
                Create an automated blast or scheduled member communication
              </p>
            </div>

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notification Subject / Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Action Required: Membership Expiring in 7 Days"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
                  >
                    <option value="membership_expiry">Membership Expiry</option>
                    <option value="payment">Payment Alert</option>
                    <option value="attendance">Attendance Notice</option>
                    <option value="system">Facility / System</option>
                    <option value="promotions">Marketing & Upgrade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Recipient Audience
                  </label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none bg-white text-slate-800"
                  >
                    <option value="Expiring in 7 Days">Expiring in 7 Days (126 members)</option>
                    <option value="Expiring in 30 Days">Expiring in 30 Days (412 members)</option>
                    <option value="All Active Members">All Active Members (2,148 members)</option>
                    <option value="Pending Payment Invoices">Pending Dues (24 members)</option>
                    <option value="Gold & Premium VIPs">Gold & Premium VIPs (1,306 members)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Message Body & Template Variables
                </label>
                <div className="flex gap-1.5 mb-1.5">
                  {['{member_name}', '{expiry_date}', '{days_left}', '{tier}'].map(
                    (v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setMessage((prev) => `${prev} ${v}`)}
                        className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700 hover:bg-slate-200"
                      >
                        +{v}
                      </button>
                    )
                  )}
                </div>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              {/* Delivery Channels */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Delivery Channels
                </label>
                <div className="flex items-center gap-3">
                  {(['WhatsApp', 'Push', 'SMS', 'Email'] as const).map((ch) => (
                    <label
                      key={ch}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-colors ${
                        selectedChannels.includes(ch)
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(ch)}
                        onChange={() => toggleChannel(ch)}
                        className="rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                      />
                      <span>{ch}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="md"
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit">
                  Send Broadcast Now
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
