import InventoryLayout from '@/components/Account/InventoryLayout';
import AccountMainLayout from '@/components/Account/MainLayout';

const Inventory = () => {
  return (
    <AccountMainLayout pageTitle='Inventory' pageName='INVENTORY' showFilters={true}>
      <InventoryLayout />
    </AccountMainLayout>
  );
};

export default Inventory;
