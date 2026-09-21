import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Trainer } from '../../types/gym';
import {
  Dumbbell,
  Star,
  Users,
  Calendar,
  Phone,
  Mail,
  X,
  CheckCircle2,
  Clock,
  Award
} from 'lucide-react';

export const TrainersView: React.FC = () => {
  const { trainers, members } = useGym();
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);

  // Get assigned members for the selected trainer
  const assignedMembers = selectedTrainer
    ? members.filter((m) => m.assignedTrainer === selectedTrainer.name)
    : [];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Trainers & Coaches
            </h1>
            <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-slate-200">
              {trainers.length} Certified Coaches
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Personal training roster, client allocations, monthly session completion, and ratings
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Dumbbell className="w-4 h-4" />}
          onClick={() => alert('Add Trainer modal opened.')}
        >
          Add Trainer
        </Button>
      </div>

      {/* Trainer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div
            key={trainer.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Profile Top */}
              <div className="flex items-center gap-4">
                <img
                  src={trainer.photoUrl}
                  alt={trainer.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 text-sm truncate">
                      {trainer.name}
                    </h3>
                    <Badge
                      variant={trainer.status === 'Active' ? 'active' : 'suspended'}
                      size="sm"
                    >
                      {trainer.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5">
                    {trainer.specialization}
                  </p>
                  <div className="flex items-center gap-1 text-amber-500 mt-1 text-xs">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-bold text-slate-900">{trainer.rating}</span>
                    <span className="text-slate-400 text-[10px]">/ 5.0 rating</span>
                  </div>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 gap-3 my-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Assigned Clients
                  </span>
                  <span className="text-base font-bold text-slate-900 mt-0.5 block">
                    {trainer.activeMembers} Members
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Completed Sessions
                  </span>
                  <span className="text-base font-bold text-emerald-700 mt-0.5 block">
                    {trainer.monthlySessions} / mo
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs text-slate-600 font-mono">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{trainer.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-sans text-[11px] text-slate-500 truncate">
                    {trainer.schedule}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">
                {trainer.branch}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTrainer(trainer)}
              >
                View Roster & Schedule
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Side Drawer for Trainer Profile */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Trainer Profile: {selectedTrainer.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedTrainer.specialization} &bull; {selectedTrainer.branch}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedTrainer(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Info Header */}
              <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <img
                  src={selectedTrainer.photoUrl}
                  alt={selectedTrainer.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-slate-900">{selectedTrainer.name}</h3>
                  <p className="text-xs text-slate-500">{selectedTrainer.email}</p>
                  <p className="text-xs font-mono text-slate-700 mt-1">
                    {selectedTrainer.phone}
                  </p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 text-[10px] block">Client Load</span>
                    <span className="text-lg font-bold text-slate-900">
                      {selectedTrainer.activeMembers}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 text-[10px] block">Monthly Sessions</span>
                    <span className="text-lg font-bold text-emerald-700">
                      {selectedTrainer.monthlySessions}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-400 text-[10px] block">Member Rating</span>
                    <span className="text-lg font-bold text-amber-500">
                      {selectedTrainer.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shift Schedule */}
              <div className="mt-6 space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Floor Duty Hours
                </h4>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{selectedTrainer.schedule}</span>
                </div>
              </div>

              {/* Assigned Members List */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Assigned Trainees ({assignedMembers.length})
                </h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {assignedMembers.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={m.photoUrl}
                          alt={m.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            {m.memberId} &bull; {m.membershipTier}
                          </p>
                        </div>
                      </div>

                      <Badge variant="active" size="sm">
                        {m.streakDays}d streak
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              size="md"
              className="w-full mt-4"
              onClick={() => setSelectedTrainer(null)}
            >
              Close Roster
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
