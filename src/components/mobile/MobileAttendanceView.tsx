import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Badge } from '../common/Badge';
import { CalendarCheck, ChevronLeft, ChevronRight, Clock, MapPin } from 'lucide-react';

export const MobileAttendanceView: React.FC = () => {
  const { members, attendance } = useGym();
  const arun = members[0];

  // Calendar day states for September 2026
  // Days 1..30
  // Present days: 1, 2, 4, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21 (18 days total)
  // Holiday: 13, 27
  // Rest / Absent: others
  const presentDays = [1, 2, 4, 5, 7, 8, 9, 11, 12, 14, 15, 16, 18, 19, 21];
  const holidayDays = [13, 27];

  const [selectedDay, setSelectedDay] = useState(21);

  return (
    <div className="p-5 space-y-5 flex-1">
      {/* Header */}
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Attendance Log
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          September 2026 &bull; Chennai Central Gym
        </p>
      </div>

      {/* Monthly KPI Summary */}
      <div className="grid grid-cols-3 gap-2 p-3.5 bg-white rounded-2xl border border-slate-200 shadow-subtle text-center">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Total Visits
          </span>
          <p className="text-lg font-bold text-slate-900 mt-0.5">18</p>
          <span className="text-[10px] text-emerald-700 font-semibold">
            +4 vs Aug
          </span>
        </div>

        <div className="border-x border-slate-100">
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Workouts
          </span>
          <p className="text-lg font-bold text-slate-900 mt-0.5">12</p>
          <span className="text-[10px] text-slate-500">Completed</span>
        </div>

        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400">
            Adherence
          </span>
          <p className="text-lg font-bold text-emerald-700 mt-0.5">75%</p>
          <span className="text-[10px] text-slate-500">Above Avg</span>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-subtle space-y-3">
        {/* Month switcher */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">September 2026</span>
          <div className="flex items-center gap-1">
            <button className="p-1 text-slate-400 hover:text-slate-700">
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 text-slate-400 hover:text-slate-700">
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400 uppercase">
          <span>Su</span>
          <span>Mo</span>
          <span>Tu</span>
          <span>We</span>
          <span>Th</span>
          <span>Fr</span>
          <span>Sa</span>
        </div>

        {/* Calendar Day Cells (Starts on Tuesday in Sep 2026) */}
        <div className="grid grid-cols-7 gap-1 text-xs">
          {/* Offset for Sunday, Monday */}
          <div></div>
          <div></div>

          {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
            const isPresent = presentDays.includes(day);
            const isHoliday = holidayDays.includes(day);
            const isToday = day === 21;
            const isSelected = day === selectedDay;

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-9 flex flex-col items-center justify-center rounded-lg relative transition-all cursor-pointer ${
                  isSelected
                    ? 'border border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className={`text-[11px] ${isToday ? 'font-bold underline' : ''}`}>
                  {day}
                </span>

                {/* Status Dot */}
                {isPresent && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5"></span>
                )}
                {isHoliday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-0.5"></span>
                )}
                {!isPresent && !isHoliday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-0.5"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* State Legend */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px]">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            Present
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            Rest / Absent
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Holiday
          </span>
        </div>
      </div>

      {/* Selected Day Check-in Details */}
      <div>
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
          Daily Log: {selectedDay} Sep 2026
        </h4>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-subtle space-y-2 text-xs">
          {presentDays.includes(selectedDay) ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Present &bull; Optical QR Check-in
                </span>
                <span className="text-emerald-700 font-bold">Verified</span>
              </div>
              <div className="flex justify-between text-slate-500 text-[11px] font-mono">
                <span>In: {selectedDay === 21 ? '06:42 AM' : '06:30 AM'}</span>
                <span>Out: {selectedDay === 21 ? 'In Progress' : '08:15 AM'}</span>
              </div>
              <p className="text-[11px] text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Chennai Central Gym &bull; Anna Salai
              </p>
            </div>
          ) : holidayDays.includes(selectedDay) ? (
            <p className="text-slate-500 text-center py-2">
              Facility Closed &bull; Scheduled Holiday
            </p>
          ) : (
            <p className="text-slate-400 text-center py-2">
              No check-in recorded &bull; Rest Day
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
