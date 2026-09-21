import React from 'react';
import { useGym } from '../../context/GymContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { LoginView } from '../admin/LoginView';
import { DashboardView } from '../admin/DashboardView';
import { MembersView } from '../admin/MembersView';
import { MemberProfileView } from '../admin/MemberProfileView';
import { AttendanceView } from '../admin/AttendanceView';
import { QrScannerView } from '../admin/QrScannerView';
import { MembershipsView } from '../admin/MembershipsView';
import { PaymentsView } from '../admin/PaymentsView';
import { TrainersView } from '../admin/TrainersView';
import { ReportsView } from '../admin/ReportsView';
import { NotificationsView } from '../admin/NotificationsView';
import { SettingsView } from '../admin/SettingsView';
import { RolesPermissionsView } from '../admin/RolesPermissionsView';

export const AdminLayout: React.FC = () => {
  const { adminScreen, isAdminLoggedIn } = useGym();

  if (!isAdminLoggedIn || adminScreen === 'login') {
    return <LoginView />;
  }

  const renderScreen = () => {
    switch (adminScreen) {
      case 'dashboard':
        return <DashboardView />;
      case 'members':
        return <MembersView />;
      case 'member-profile':
        return <MemberProfileView />;
      case 'attendance':
        return <AttendanceView />;
      case 'qr-scanner':
        return <QrScannerView />;
      case 'memberships':
        return <MembershipsView />;
      case 'payments':
        return <PaymentsView />;
      case 'trainers':
        return <TrainersView />;
      case 'reports':
        return <ReportsView />;
      case 'notifications':
        return <NotificationsView />;
      case 'settings':
        return <SettingsView />;
      case 'roles':
        return <RolesPermissionsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-41px)] flex bg-[#F8FAFC]">
      {/* Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 pb-16 overflow-y-auto">{renderScreen()}</main>
      </div>
    </div>
  );
};
