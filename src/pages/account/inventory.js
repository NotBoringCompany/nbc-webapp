import InventoryLayout from '@/components/Account/InventoryLayout';
import AccountMainLayout from '@/components/Account/MainLayout';
import { useState } from 'react';

const Inventory = () => {
  const [houses, setHouses] = useState(['Tradition', 'Glory', 'Chaos']);
  const [types, setTypes] = useState([
    'Brawler',
    'Crystal',
    'Earth',
    'Electric',
    'Fire',
    'Frost',
    'Magic',
    'Nature',
    'Ordinary',
    'Psychic',
    'Reptile',
    'Spirit',
    'Toxic',
    'Water',
    'Wind',
  ]);
  const [luckRating, setLuckRating] = useState(100);
  const [endLuckRating, setEndLuckRating] = useState(100);
  const [luckBoost, setLuckBoost] = useState(['1', '1.05', '1.2']);

  return (
    <AccountMainLayout
      pageTitle='Inventory'
      pageName='INVENTORY'
      showFilters={true}
      setHouses={setHouses}
      setTypes={setTypes}
      luckRating={luckRating}
      setLuckRating={setLuckRating}
      setEndLuckRating={setEndLuckRating}
      luckBoost={luckBoost}
      setLuckBoost={setLuckBoost}
    >
      <InventoryLayout
        houses={houses}
        types={types}
        endLuckRating={endLuckRating}
        luckBoost={luckBoost}
      />
    </AccountMainLayout>
  );
};

export default Inventory;
