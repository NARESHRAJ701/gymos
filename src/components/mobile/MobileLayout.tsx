import React from 'react';
import { useGym } from '../../context/GymContext';
import { AndroidDeviceShell } from './AndroidDeviceShell';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileLoginView } from './MobileLoginView';
import { MobileHomeView } from './MobileHomeView';
import { MobileQrCodeView } from './MobileQrCodeView';
import { MobileAttendanceView } from './MobileAttendanceView';
import { MobileMembershipView } from './MobileMembershipView';
import { MobilePaymentsView } from './MobilePaymentsView';
import { MobileNotificationsView } from './MobileNotificationsView';
import { MobileProfileView } from './MobileProfileView';

export const MobileLayout: React.FC = () => {
  const { mobileScreen, isMobileLoggedIn } = useGym();

  const renderMobileContent = () => {
    if (!isMobileLoggedIn || mobileScreen === 'login') {
      return <MobileLoginView />;
    }

    switch (mobileScreen) {
      case 'home':
        return <MobileHomeView />;
      case 'qr-code':
        return <MobileQrCodeView />;
      case 'attendance':
        return <MobileAttendanceView />;
      case 'membership':
        return <MobileMembershipView />;
      case 'payments':
        return <MobilePaymentsView />;
      case 'notifications':
        return <MobileNotificationsView />;
      case 'profile':
        return <MobileProfileView />;
      default:
        return <MobileHomeView />;
    }
  };

  const showBottomNav =
    isMobileLoggedIn && mobileScreen !== 'login' && mobileScreen !== 'qr-code';

  return (
    <AndroidDeviceShell>
      <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#F8FAFC]">
        <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
          {renderMobileContent()}
        </div>
        {showBottomNav && <MobileBottomNav />}
      </div>
    </AndroidDeviceShell>
  );
};
