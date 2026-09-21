import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Member } from '../../types/gym';
import {
  ScanLine,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  User,
  Zap,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

export const QrScannerView: React.FC = () => {
  const {
    members,
    selectedBranch,
    markAttendance,
    isMemberCheckedInToday,
    checkOutMember
  } = useGym();

  const [scannedMember, setScannedMember] = useState<Member | null>(null);
  const [scanTime, setScanTime] = useState<string>('06:42 AM');
  const [isScanningActive, setIsScanningActive] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  const simulateScan = (member: Member) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setScanTime(timeStr);
    setScannedMember(member);

    // Check duplicate
    if (isMemberCheckedInToday(member.memberId)) {
      setDuplicateWarning(
        `DUPLICATE SCAN: ${member.name} (${member.memberId}) is already marked PRESENT today at ${selectedBranch}.`
      );
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleConfirmCheckIn = () => {
    if (!scannedMember) return;

    const result = markAttendance({
      memberId: scannedMember.memberId,
      memberName: scannedMember.name,
      memberPhoto: scannedMember.photoUrl,
      membershipTier: scannedMember.membershipTier,
      checkInTime: scanTime,
      checkOutTime: null,
      date: '2026-09-21',
      method: 'qr',
      branch: selectedBranch,
      status: 'present'
    });

    if (result.success) {
      setScannedMember(null);
      setDuplicateWarning(null);
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Turnstile QR Check-in Terminal
          </h1>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
            Station #01 &bull; {selectedBranch}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          High-speed optical scanner for member smartphone digital passes & RFID cards
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scanner Viewport (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-6 text-white flex flex-col items-center justify-between min-h-[440px] shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="w-full flex items-center justify-between z-10 text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              OPTICAL SENSOR ACTIVE
            </span>
            <span className="text-slate-400 font-mono">60 FPS CAMERA #1</span>
          </div>

          {/* Center Scan Reticle */}
          <div className="relative my-8 flex flex-col items-center justify-center">
            {/* Corner brackets */}
            <div className="w-64 h-64 border-2 border-emerald-500/40 rounded-3xl relative flex items-center justify-center bg-slate-800/20 backdrop-blur-sm">
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-emerald-400 rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-emerald-400 rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-emerald-400 rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-emerald-400 rounded-br-lg"></div>

              {/* Scanning animated beam */}
              <div className="absolute inset-x-4 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_12px_#34d399]"></div>

              <div className="text-center p-4">
                <QrCode className="w-16 h-16 text-emerald-400/80 mx-auto stroke-1" />
                <p className="text-xs font-semibold text-slate-300 mt-3 tracking-wide">
                  Scan member QR code
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">
                  Hold smartphone 10-15 cm from lens
                </p>
              </div>
            </div>
          </div>

          {/* Quick Simulation Buttons */}
          <div className="w-full pt-4 border-t border-slate-800 z-10">
            <div className="text-[11px] uppercase font-semibold text-slate-400 mb-2">
              Instant Hardware Simulation Presets:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => simulateScan(members[0])}
                className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-medium transition-colors text-center cursor-pointer"
              >
                Scan Arun Kumar (MEM-002481)
              </button>
              <button
                type="button"
                onClick={() => simulateScan(members[1])}
                className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-medium transition-colors text-center cursor-pointer"
              >
                Scan Priya Sharma
              </button>
              <button
                type="button"
                onClick={() => simulateScan(members[4])}
                className="py-2 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-medium transition-colors text-center cursor-pointer"
              >
                Scan Karthik V. (Expiring)
              </button>
            </div>
          </div>
        </div>

        {/* Scan Resolution Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col">
          {scannedMember ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-subtle flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Scan Verified Result
                  </span>
                  <Badge variant="active" size="sm">
                    QR MATCH VERIFIED
                  </Badge>
                </div>

                {/* Duplicate Warning Alert */}
                {duplicateWarning && (
                  <div className="mt-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Duplicate Attendance Detected</p>
                      <p className="text-[11px] text-amber-700 mt-0.5">
                        {duplicateWarning}
                      </p>
                      <button
                        onClick={() => {
                          checkOutMember(scannedMember.memberId);
                          setDuplicateWarning(null);
                          setScannedMember(null);
                        }}
                        className="mt-2 text-xs font-semibold text-rose-700 hover:underline cursor-pointer"
                      >
                        Click here to Check Out instead
                      </button>
                    </div>
                  </div>
                )}

                {/* Member Profile Details */}
                <div className="mt-4 flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <img
                    src={scannedMember.photoUrl}
                    alt={scannedMember.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-300 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {scannedMember.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-500">
                      {scannedMember.memberId}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant="gold" size="sm">
                        {scannedMember.membershipTier} Tier
                      </Badge>
                      <Badge variant="active" size="sm">
                        {scannedMember.membershipStatus.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Verification Metadata */}
                <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                  <div className="p-3 rounded-lg border border-slate-100 bg-white">
                    <span className="text-slate-400 block text-[10px]">
                      Check-in Time
                    </span>
                    <span className="font-bold text-slate-900 text-sm font-mono">
                      {scanTime}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-100 bg-white">
                    <span className="text-slate-400 block text-[10px]">
                      Subscription Status
                    </span>
                    <span className="font-semibold text-emerald-700">
                      {scannedMember.remainingDays} Days Left
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-100 bg-white">
                    <span className="text-slate-400 block text-[10px]">
                      Assigned Trainer
                    </span>
                    <span className="font-medium text-slate-800">
                      {scannedMember.assignedTrainer}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-100 bg-white">
                    <span className="text-slate-400 block text-[10px]">
                      Turnstile Barrier
                    </span>
                    <span className="font-semibold text-emerald-700">
                      Gate 1 Ready
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1"
                  onClick={() => {
                    setScannedMember(null);
                    setDuplicateWarning(null);
                  }}
                >
                  Discard
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1"
                  disabled={!!duplicateWarning}
                  onClick={handleConfirmCheckIn}
                >
                  Confirm Check-in
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-subtle flex-1 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                <ScanLine className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Awaiting Optical QR Scan
              </h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Present the member app QR code to the scanner camera or click one of the quick simulation buttons on the left.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Anti-screenshot Token Verification Active
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
