import AccountMainLayout from '@/components/Account/MainLayout';
import SettingsLayout from '@/components/Account/SettingsLayout';

const Accountdashboard = () => {
  return (
    <AccountMainLayout
      pageName='SETTINGS'
      pageTitle='Account Settings'
      description='See your account details here'
      withAuth
    >
      <SettingsLayout />
    </AccountMainLayout>
  );
};

export default Accountdashboard;
