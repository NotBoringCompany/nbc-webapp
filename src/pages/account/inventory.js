import InventoryLayout from '@/components/Account/InventoryLayout';
import AccountMainLayout from '@/components/Account/MainLayout';
import { NFT_KEY_SORT_BY, SORT_MODE } from '@/constants/sort';
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
  const [sort, setSort] = useState({
    by: NFT_KEY_SORT_BY.LUCK_TRAIT,
    mode: SORT_MODE.DESC,
    loading: false,
  });

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
        sort={sort}
        onSort={setSort}
        houses={houses}
        types={types}
        endLuckRating={endLuckRating}
        luckBoost={luckBoost}
      />
    </AccountMainLayout>
  );
};

export default Inventory;
