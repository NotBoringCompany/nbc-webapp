import AccountMainLayout from '@/components/Account/MainLayout';
import DashboardLayout from '@/components/Account/DashboardLayout';

const Dashboard = () => {
  return (
    <AccountMainLayout
      pageName='DASHBOARD'
      pageTitle='Account Dashboard'
      description='View your account information here'
    >
      <DashboardLayout />
    </AccountMainLayout>
  );
};

export default Dashboard;
