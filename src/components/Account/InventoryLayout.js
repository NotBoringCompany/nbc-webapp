import {
  Flex,
  Loader,
  ScrollArea,
  SimpleGrid,
  Tabs,
  Text,
  Select,
  Button,
} from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { IconArrowDown, IconArrowUp } from '@tabler/icons';
import NFTCard from '../Staking/NFTCard';
import { useMoralis } from 'react-moralis';
import { inventoryColumnsBreakpoints } from '../Breakpoints/CardColumns';
import highestLuckBoost from '@/utils/highestLuckBoost';
import NewNFTCard from '../Cards/NewNFTCard';
import { COLORS } from '../Globals/colors';
import { MediumButton } from '../Buttons/Universals';

const Sort = ({ sort, onSort, onLoading }) => {
  const data = [
    { value: 'luckTrait', label: 'Luck Rating' },
    { value: 'luckBoostTrait', label: 'Luck Boost' },
    { value: 'tokenID', label: 'ID' },
  ];
  const handleChange = (change = 'by', val) => {
    onLoading(true);
    //by could be sort by luckTrait, luckBoostTrait, etc
    if (change === 'by' && val) {
      onSort({
        ...sort,
        by: val,
      });
    } else {
      onSort({
        ...sort,
        mode: sort.mode === 'DESC' ? 'ASC' : 'DESC',
      });
    }

    //Due to our lazy loaded videos in the Cards, we need this
    //"artifical" loading time.

    setTimeout(() => {
      onLoading(false);
    }, 100);

    //This loading time makes gives the NewNFTCard / NFTCard sufficient time to run `useOnScreen` properly during re-render.
    //Otherwise, `useOnScreen` hook will always return `false` and the video won't show after sorting.
  };

  return (
    <Flex direction='row' align='center'>
      <Text size={16} mr={10}>
        Sort:
      </Text>
      <Select
        w={140}
        data={data}
        value={sort.by}
        onChange={(val) => handleChange('by', val)}
        mr={10}
      />
      <MediumButton onClick={() => handleChange('mode')}>
        {sort.mode === 'DESC' ? <IconArrowDown /> : <IconArrowUp />}
      </MediumButton>
    </Flex>
  );
};

const InventoryLayout = ({ houses, types, endLuckRating, luckBoost }) => {
  const [stakerInventory, setStakerInventory] = useState(null);
  const [stakerInventoryLoading, setStakerInventoryLoading] = useState(true);

  const [sort, setSort] = useState({
    by: 'luckTrait',
    mode: 'DESC',
  });

  const [loadingSorting, setLoadingSorting] = useState(false);
  const { user } = useMoralis();

  const getStakerInventory = useCallback(async () => {
    const rawRes = await fetch(
      `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/${user?.attributes?.ethAddress}/1`
      // `https://nbc-webapp-api-production.up.railway.app/kos/fetch-staker-inventory/0x8FbFE537A211d81F90774EE7002ff784E352024a/1`
    ).catch((err) => console.log(err));
    const res = await rawRes.json();

    setStakerInventory(res?.data?.inventory ?? null);
    setStakerInventoryLoading(false);
  }, [user?.attributes?.ethAddress]);

  useEffect(() => {
    if (user && !stakerInventory) {
      getStakerInventory();
    }
  }, [user, stakerInventory, getStakerInventory]);

  if (stakerInventoryLoading) {
    return <Loader color='#42ca9f' />;
  } else {
    return (
      <Flex direction='column'>
        <Tabs
          sx={(theme) => ({
            'button[data-active]': {
              borderColor: theme.colors.nbcGreen,
            },
            'button[data-active]:hover': {
              borderColor: theme.colors.nbcGreen,
            },
          })}
          defaultValue='kos'
        >
          <Tabs.List grow>
            <Tabs.Tab value='kos'>
              <Text size={22}>Key Of Salvation</Text>
            </Tabs.Tab>
            <Tabs.Tab value='keychain'>
              <Text size={22}>Keychain</Text>
            </Tabs.Tab>
            <Tabs.Tab value='supKeychain'>
              <Text size={22}>Superior Keychain</Text>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value='kos' pt='xs'>
            <ScrollArea h={'calc(100vh-100px)'}>
              <Sort
                sort={sort}
                onSort={setSort}
                onLoading={setLoadingSorting}
              />
              <SimpleGrid
                my={20}
                spacing={'md'}
                breakpoints={inventoryColumnsBreakpoints}
                mah={'100vh'}
              >
                <>
                  {loadingSorting ? (
                    <Loader color={COLORS.green} />
                  ) : (
                    <>
                      {[...stakerInventory.keyData]
                        ?.sort((a, b) =>
                          sort.mode === 'DESC'
                            ? b.metadata[sort.by] - a.metadata[sort.by]
                            : a.metadata[sort.by] - b.metadata[sort.by]
                        )
                        .filter((k) => houses.includes(k.metadata.houseTrait))
                        .filter((k) => types.includes(k.metadata.typeTrait))
                        .filter((k) => k.metadata.luckTrait <= endLuckRating)
                        .filter(
                          (k) =>
                            k.metadata.luckBoostTrait <=
                            highestLuckBoost(luckBoost)
                        )
                        .map((k) => (
                          <NewNFTCard key={k.name} nft={k} />
                        ))}
                    </>
                  )}
                </>
              </SimpleGrid>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value='keychain' pt='xs'>
            <ScrollArea h={'calc(100vh-100px)'}>
              <SimpleGrid
                my={20}
                spacing={'md'}
                breakpoints={inventoryColumnsBreakpoints}
                mah={'calc(100vh - 200px)'}
              >
                {stakerInventory.keychainData
                  ?.sort((a, b) => a.tokenID - b.tokenID)
                  .map((keychain) => (
                    <NFTCard key={keychain.name} nft={keychain} />
                  ))}
              </SimpleGrid>
            </ScrollArea>
          </Tabs.Panel>

          <Tabs.Panel value='supKeychain' pt='xs'>
            <ScrollArea h={'calc(100vh-100px)'}>
              <SimpleGrid
                my={20}
                spacing={'md'}
                breakpoints={inventoryColumnsBreakpoints}
                mah={'calc(100vh - 200px)'}
              >
                {stakerInventory.superiorKeychainData
                  ?.sort((a, b) => a.tokenID - b.tokenID)
                  .map((superiorKeychain) => (
                    <NFTCard
                      key={superiorKeychain.name}
                      nft={superiorKeychain}
                    />
                  ))}
              </SimpleGrid>
            </ScrollArea>
          </Tabs.Panel>
        </Tabs>
      </Flex>
    );
  }
};

export default InventoryLayout;
